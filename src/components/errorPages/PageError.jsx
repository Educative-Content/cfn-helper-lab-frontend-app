import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

export default function PageError({ errorMessage }) {
  return (
    <Container className="center-container">
      <pre>
        <h3 className="text-title-color">{errorMessage}</h3>
      </pre>
    </Container>
  );
}

PageError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
