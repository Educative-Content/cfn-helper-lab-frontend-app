import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';

export default function LoaderCard() {
  return (
    <Row style={{ paddingBottom: '24px' }}>
      <Card>
        <Card.Body>
          <Row>
            <Col className="col-auto">
              <Button variant="link" style={{ color: 'grey', outline: null }} disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </Button>
            </Col>
            <Col>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={7} size="lg" />
              </Placeholder>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Row>
  );
}
