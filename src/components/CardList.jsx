import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ItemCard from './ItemCard';
import LoaderCard from './loading/LoaderCard';

function CardList({
  data, type, setAction, setTask, setId,
}) {
  let listCards = <div />;
  if (data) {
    listCards = data.todoList.map((item) => {
      const dataObjStr = JSON.stringify(item);
      if (type === 'todoItem') {
        return (
          <React.Fragment key={item.id}>
            <ItemCard
              jsonData={dataObjStr}
              setAction={setAction}
              setTask={setTask}
              setId={setId}
            />
          </React.Fragment>
        );
      }
      if (type === 'loader') {
        return (
          <React.Fragment key={item.id}>
            <LoaderCard />
          </React.Fragment>
        );
      }
      return (<div />);
    });
  } else {
    return (
      <Container fluid>
        <h3 className="header5-design">No items in the list</h3>
      </Container>
    );
  }
  if (data.todoList.length === 0) {
    return (
      <Container fluid>
        <h3 className="header5-design">No items in the list</h3>
      </Container>
    );
  }
  return (
    <Col className="flex-col">
      { listCards }
    </Col>
  );
}

CardList.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  setAction: PropTypes.func,
  setTask: PropTypes.func,
  setId: PropTypes.func,
};

CardList.defaultProps = {
  setAction: null,
  setTask: null,
  setId: null,
};

export default CardList;
