// All required packages are imported here
import fs from 'fs';

// The following custom function fetches an S3 object from which 
// the JSON data is extracted and returned
async function getS3ObjectData(bucket, key) {
    // The following promise converts a Stream object to a String
    const streamStringify = (stream) => new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    
    // The bucket and key (bucket object name) parameters are initialized
    const params = {
        "Bucket": bucket,
        "Key": key,
    }

    // The command is initialized to get the S3 object with the corresponding
    // parameters initialized above
    const command = new GetObjectCommand(params);

    try {
        // The response variable which stores the response from the command
        // executed by the S3 client
        let response = await client.send(command);

        // The Body variable which stores the response body
        const { Body } = response; 

        // The result variable stores the string returned by the streamStringify method
        // which converts the Body stream to a Stream
        const result = JSON.parse(await streamStringify(Body));

        // The JSON result is returned
        return result;
        
    // If an error is encountered, it is logged and a null object is returned
    } catch (error) {
        console.error(error);
        return null;
    }
}

// The following custom function updates and overwrites the S3 object  
// with the updated JSON data
async function updateS3Object(bucket, key, inputObj) {
    // The body variable stores the stringified version of the
    // updated JSON data
    const body = JSON.stringify(inputObj, null, 4);

    // The bucket, key (bucket object name), and body (updated JSON data) parameters
    // are initialized
    const params = {
        "Bucket": bucket,
        "Key": key,
        "Body": body,
        "ContentType": 'application/json',
    }

    // The command is initialized to get the S3 object with the corresponding
    // parameters initialized above
    const command = new PutObjectCommand(params);

    try {
        // The response variable which stores the response from the command
        // executed by the S3 client
        const response = await client.send(command);

        // The S3 client response is returned by the function
        return response;

    // If an error is encountered, it is logged and a null object is returned
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const handler = async (event, context, callback) => {
    // Replace <YOUR_BUCKET_NAME_HERE> with the name of the bucket you created
    const bucket = "<YOUR_BUCKET_NAME_HERE>";
    
    // The key variables store the name of the S3 object JSON file in which we
    // store the cloud lab data
    const key = "cloudlabs.json";
    
    // The following variable stores the cloud lab ID if it exists
    // in the event arguments
    const cloudLabId = event.arguments ? event.arguments.id : null;

    // The following variable stores the event field value
    const requestField = event.field;

    // The following object maps cloud lab IDs to the corresponding cloud lab object
    let cloudlabs = await getS3ObjectData(bucket, key);

    // The following conditions get executed when the lambda function
    // is invoked
    switch(requestField) {
        // The case when the request query is to get a specific cloud lab
        case 'getCloudLab':
            // Throwing an error if cloudLabId does not already exist
            if (!Object.keys(cloudlabs).includes(cloudLabId))
                throw new Error(`The cloud lab ID ${cloudLabId} does not exist`);

            callback(null, cloudlabs[cloudLabId]);
            break;

        // The case when the request query is to get all cloud labs
        case 'allCloudLabs':
            const values = [];
            for(let d in cloudlabs){
                values.push(cloudlabs[d]);
            }
            callback(null, values);
            break;

        // The case when the request query is to add a new cloud lab
        case 'addCloudLab':
            // The cloudlabs object variable is updated with the new cloud lab data point
            cloudlabs[event.arguments.id] = {'id': event.arguments.id, 'cloudLabTitle': event.arguments.cloudLabTitle, 'imgUrl': event.arguments.imgUrl, 'cloudLabUrl': event.arguments.cloudLabUrl, 'cloudLabAuthor': event.arguments.cloudLabAuthor };

            // The JSON file in the S3 bucket gets overwritten with the updated JSON
            // data after the updateS3Object function is invoked
            await updateS3Object(bucket, key, cloudlabs);

            callback(null, cloudlabs[cloudLabId]);
            break;

        // The case when the request query is to edit an existing cloud lab
        case 'editCloudLab':
            // Throwing an error if cloudLabId does not already exist
            if (!Object.keys(cloudlabs).includes(cloudLabId))
                throw new Error(`The cloud lab ID ${cloudLabId} does not exist`);

            // The cloudlabs object variable is updated with the new updated cloud lab data point
            cloudlabs[event.arguments.id] = {'id': event.arguments.id, 'cloudLabTitle': event.arguments.cloudLabTitle, 'imgUrl': event.arguments.imgUrl, 'cloudLabUrl': event.arguments.cloudLabUrl, 'cloudLabAuthor': event.arguments.cloudLabAuthor };

            // The JSON file in the S3 bucket gets overwritten with the updated JSON
            // data after the updateS3Object function is invoked
            await updateS3Object(bucket, key, cloudlabs);

            callback(null, cloudlabs[cloudLabId]);
            break;
            
        // The case when the request query is to edit an existing cloud lab
        case 'removeCloudLab':
            // Throwing an error if cloudLabId does not already exist
            if (!Object.keys(cloudlabs).includes(cloudLabId))
                throw new Error(`The cloud lab ID ${cloudLabId} does not exist`);

            // Removing the cloud lab from the JSON data and temporarily saving the cloud lab data to return back in the response
            const returnObj = JSON.parse(JSON.stringify(cloudlabs[cloudLabId]));
            delete cloudlabs[cloudLabId];

            // The JSON file in the S3 bucket gets overwritten with the updated JSON
            // data after the updateS3Object function is invoked
            await updateS3Object(bucket, key, cloudlabs);

            callback(null, returnObj);
            break;

        // The default case when the field itself is unidentified
        default:
            callback(`Unknown field "${requestField}", unable to resolve request`, null);
    } 
};