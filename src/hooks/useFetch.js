import { useState, useEffect } from 'react';
import keys from './keys.json';

export default function useFetch(backendOperation, queryAttributesStr) {
  // Declaring the essential state variables for data and checking
  // if the request is loading or succeeded
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extracting API key and endpoint URL from the keys.json file
    const { backendIp, backendPort } = keys;
    const baseUrl = `http://${backendIp}:${backendPort}`;

    // Changing loading and success state to true whenever there's an effect
    setLoading(true);
    setSuccess(false);

    // Initializing a controller for the API call
    const controller = new AbortController();

    // Extracting data from queryAttributesStr
    const queryAttributes = JSON.parse(queryAttributesStr);

    // Function to construct and return the URL with
    // the required query parameters
    function getURLQuery(operation, inputData) {
      const id = Math.floor(Math.random() * (999999 - 100 + 1) + 100);
      if (operation === 'allItems' || operation === 'clearItems') {
        return {
          url: `${baseUrl}/${operation}`,
          method: 'GET',
          body: null,
        };
      }
      if (operation === 'addItem') {
        return {
          url: `${baseUrl}/${operation}`,
          method: 'POST',
          body: {
            id,
            task: inputData.task,
          },
        };
      }
      if (operation === 'editItem') {
        return {
          url: `${baseUrl}/${operation}`,
          method: 'POST',
          body: {
            id: inputData.id,
            task: inputData.task,
          },
        };
      }
      if (operation === 'removeItem' || operation === 'changeItemStatus') {
        return {
          url: `${baseUrl}/${operation}/${inputData.id}`,
          method: 'GET',
        };
      }
      return {
        url: baseUrl,
        method: 'GET',
      };
    }

    // asynchronous function to make API call
    async function fetchData() {
      try {
        // Constructing URL for request
        const backendUrlObject = getURLQuery(backendOperation, queryAttributes);

        // Constructing the options object
        const options = backendUrlObject.body ? {
          method: backendUrlObject.method,
          signal: controller.signal,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(backendUrlObject.body),
        } : {
          method: backendUrlObject.method,
          signal: controller.signal,
          headers: {
            'content-type': 'application/json',
          },
        };

        // Making API call through custom proxy server
        const response = await fetch(backendUrlObject.url, options);

        // Checking if the request was a success
        setSuccess(response.ok);
        if (!response.ok) {
          if (response.errorMessage) {
            throw new Error(`Status Code: Internal Error\nError Message: ${response.errorMessage}`);
          } else if (!response.bodyUsed) {
            throw new Error(`Status Code: ${response.status}\nError Message: ${response.statusText}`);
          } else {
            const errorResponse = await response.json();
            throw new Error(`Status Code: ${response.status}\nAPI Error Message: ${errorResponse.message}`);
          }
        }

        // Extracting the content body
        const content = await response.json();

        // Saving retrieved data
        setData(content);
      } catch (error) {
        console.log(error.message);
        setData({ error: `${error}` });
        setSuccess(false);
      } finally {
        // Changing loading state to false whenever the API request ends in success or failure
        setLoading(false);
      }
    }

    // Making sure that a null field is not passed
    if (backendOperation) {
      fetchData();
    } else {
      setLoading(false);
      setSuccess(true);
    }

    // Cancelling the fetch request in case the user navigates
    // away from screen
    return () => {
      controller.abort();
    };

  // Defining variables that trigger useFetch
  }, [backendOperation, queryAttributesStr]);

  // Returning useFetch response
  return { data, success, loading };
}
