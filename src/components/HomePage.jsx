import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageError from './errorPages/PageError';
import Loading from './loading/Loading';
import useFetch from '../hooks/useFetch';
import CardList from './CardList';
import NewItemForm from './NewItemForm';

export default function HomePage() {
  const [action, setAction] = useState('allItems');
  const [task, setTask] = useState('');
  const [id, setId] = useState('');

  const queryParams = {
    id: `${id}`,
    task: `${task}`,
  };

  // Initializing API Call with a useFetch function
  const {
    data: itemData,
    success: callSuccess,
    loading: callLoading,
  } = useFetch(
    action,
    JSON.stringify(queryParams),
  );

  // Function to re-update GraphQL query parameters fetch list of items
  // when either a course had been added, edited, or deleted
  useEffect(() => {
    if (!callLoading && action !== 'allItems') {
      setAction('allItems');
      setTask('');
      setId('');
    }
  }, [callLoading]);

  if (callLoading) {
    return (
      <Loading />
    );
  } if (!(callSuccess)) {
    if (!itemData.success) {
      console.error(`The following errors were encountered:\nError -> ${itemData.error}\n`);
      return (
        <PageError errorMessage={`The following errors were encountered:\nError -> ${itemData.error}\n`} />
      );
    }
    return (
      <PageError errorMessage="Oops! Something went wrong" />
    );
  } if (!itemData.todoList) {
    return (
      <Container className="center-container">
        <pre>
          <h1 className="text-title-color">Action Successful</h1>
        </pre>
      </Container>
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '30px' }}>
          <h1 className="header1-design">Add Todo Item</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <NewItemForm
            setAction={setAction}
            setTask={setTask}
          />
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <hr style={{ color: '#ffffff' }} />
        </Row>
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Todo List</h1>
        </Row>
        <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <CardList
            data={itemData}
            type="todoItem"
            setAction={setAction}
            setTask={setTask}
            setId={setId}
          />
        </Row>
      </Col>
    </Container>
  );
}
