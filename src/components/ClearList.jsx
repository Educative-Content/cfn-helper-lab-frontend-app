import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function ClearList({ setAction }) {
  // Function to clear items list
  const clearList = () => {
    setAction('clearItems');
  };

  return (
    <Row style={{ paddingBottom: '24px' }}>
      <Container className="d-flex justify-content-center">
        <Button onClick={clearList} variant="danger" size="lg">
          Clear To-Do List
        </Button>
      </Container>
    </Row>
  );
}

ClearList.propTypes = {
  setAction: PropTypes.func.isRequired,
};
