import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function ItemCard({
  jsonData, setAction, setTask, setId,
}) {
  const [editorMode, setEditorMode] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todoItemData = JSON.parse(jsonData);

  // Function to update query parameters to trigger API call to delete course
  const deleteItemMethod = () => {
    setId(todoItemData.id);
    setAction('removeItem');
  };

  const changeStatusMethod = () => {
    setId(todoItemData.id);
    setAction('changeItemStatus');
  };

  const enableEditor = () => {
    setEditorMode(true);
  };

  const disableEditor = () => {
    setEditorMode(false);
  };

  // Function to update query parameters to trigger API call to edit course
  const confirmEdits = (event) => {
    event.preventDefault();
    if (event.target[1].value) {
      setId(todoItemData.id);
      setTask(event.target[1].value);
      setAction('editItem');
    }
  };
  if (editorMode) {
    return (
      <Row style={{ paddingBottom: '24px' }}>
        <Card>
          <Card.Body>
            <Container style={{ padding: '10px' }}>
              <Form onSubmit={confirmEdits}>
                <Row>
                  <Col className="col-auto">
                    <Button variant="link" style={{ color: 'grey', outline: null }} disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8" />
                      </svg>
                    </Button>
                  </Col>
                  <Col style={{ paddingTop: '3px' }}>
                    <InputGroup>
                      <Form.Control
                        placeholder="Task Details"
                        defaultValue={todoItemData.task}
                      />
                    </InputGroup>
                  </Col>
                  <Col className="col-auto">
                    <InputGroup>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip className="custom-tooltip" id="confirm-tooltip" style={{ fontSize: '12px' }}>Confirm Changes</Tooltip>}
                      >
                        <Button variant="link" type="submit" style={{ color: 'white', outline: null }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </Button>
                      </OverlayTrigger>
                    </InputGroup>
                  </Col>
                  <Col className="col-auto">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip className="custom-tooltip" id="discard-tooltip" style={{ fontSize: '12px' }}>Discard Changes</Tooltip>}
                    >
                      <Button variant="link" onClick={disableEditor} style={{ color: 'white', outline: null }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card.Body>
        </Card>
      </Row>
    );
  }
  return (
    <Row style={{ paddingBottom: '24px' }}>
      <Card>
        <Card.Body>
          <Container style={{ padding: '10px' }}>
            <Row>
              <Col className="col-auto">
                {todoItemData.status
              && (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip className="custom-tooltip" id="status-tooltip" style={{ fontSize: '12px' }}>Mark Item as not Done</Tooltip>}
                >
                  <Button variant="link" onClick={changeStatusMethod} style={{ color: 'white', outline: null }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  </Button>
                </OverlayTrigger>
              )}
                {!todoItemData.status
              && (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip className="custom-tooltip" id="status-tooltip" style={{ fontSize: '12px' }}>Mark Item as Done</Tooltip>}
                >
                  <Button variant="link" onClick={changeStatusMethod} style={{ color: 'white', outline: null }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    </svg>
                  </Button>
                </OverlayTrigger>
              )}
              </Col>
              <Col style={{ paddingTop: '6px' }}>
                <Card.Text style={{ fontSize: '20px' }}>
                  {`${todoItemData.task}`}
                </Card.Text>
              </Col>
              <Col className="col-auto">
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip className="custom-tooltip" id="edit-tooltip" style={{ fontSize: '12px' }}>Edit Item</Tooltip>}
                >
                  <Button variant="link" onClick={enableEditor} style={{ color: 'white', outline: null }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </Button>
                </OverlayTrigger>
              </Col>
              <Col className="col-auto">
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip className="custom-tooltip" id="edit-tooltip" style={{ fontSize: '12px' }}>Delete Item</Tooltip>}
                >
                  <Button variant="link" onClick={handleShow} style={{ color: 'white', outline: null }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </Button>
                </OverlayTrigger>
                <Modal
                  show={show}
                  onHide={handleClose}
                  keyboard={false}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Delete Item
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {`Are you sure want to delete the todo item "${todoItemData.task}"?`}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="button" variant="secondary" onClick={handleClose}>No</Button>
                    <Button className="button" onClick={deleteItemMethod}>Yes</Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Row>
  );
}

ItemCard.propTypes = {
  jsonData: PropTypes.string.isRequired,
  setAction: PropTypes.func,
  setTask: PropTypes.func,
  setId: PropTypes.func,
};

ItemCard.defaultProps = {
  setAction: null,
  setTask: null,
  setId: null,
};
