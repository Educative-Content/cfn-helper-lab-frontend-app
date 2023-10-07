import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import InputGroup from 'react-bootstrap/InputGroup';
import Tooltip from 'react-bootstrap/Tooltip';

export default function NewItemForm({
  setAction, setTask,
}) {
  // Function to update GraphQL query parameters to trigger API call to add course
  const addTodoItem = (event) => {
    event.preventDefault();
    if (event.target[0].value) {
      setTask(event.target[0].value);
      setAction('addItem');
    }
  };

  return (
    <Col className="flex-col">
      <Row>
        <Card>
          <Card.Body>
            <Container style={{ padding: '10px' }}>
              <Form onSubmit={addTodoItem}>
                <Row>
                  <Col style={{ paddingTop: '3px' }}>
                    <InputGroup>
                      <Form.Control
                        placeholder="Add Todo Item"
                      />
                    </InputGroup>
                  </Col>
                  <Col className="col-auto">
                    <InputGroup>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(
                          <Tooltip className="custom-tooltip" id="status-tooltip" style={{ fontSize: '12px' }}>
                            Mark Item as Done
                          </Tooltip>
                      )}
                      >
                        <Button type="submit" variant="link" style={{ color: 'white', outline: null }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                          </svg>
                        </Button>
                      </OverlayTrigger>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
}

NewItemForm.propTypes = {
  setAction: PropTypes.func.isRequired,
  setTask: PropTypes.func.isRequired,
};

/* <Form onSubmit={addCourseMethod}>
        <Container className="flex">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Course Title"
              aria-label="Course Title"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Course Author"
              aria-label="Course Author"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Course URL"
              aria-label="Course URL"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Course Image URL"
              aria-label="Course Image URL"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Button className="button" type="submit">Add Course</Button>
          </InputGroup>
        </Container>
      </Form> */
