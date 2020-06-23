import React, {useState} from 'react';
import {Card, Button, Modal, Table} from 'react-bootstrap';
import {vegetableList} from './vegeInfo';

function vegeInfoModalTable(props) {
  const tableContent = Object.keys(props).map((element) => {
    return (<tr key={element}>
      <td>{element}</td>
      <td>{props[element]}</td>
    </tr>);
  },
  );

  return (
    <Table>
      <thead>
      </thead>
      <tbody>
        {tableContent}
      </tbody>
    </Table>
  );
}

function CreateVegeCard(params) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style = {{margin: '2rem'}} key = {params.name}>
      <Card style={{width: '12rem'}}>
        <Card.Img variant="top" src={params.icon}/>
        <Card.Body>
          <Card.Title>{params.name}</Card.Title>
          <Card.Text>
            {params.general}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            {params.name}信息
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{params.name}信息表</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vegeInfoModalTable(params.infoTable)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            关闭
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default function listVegeCards() {
  const displayItem = vegetableList.map((element) => {
    // turn eslint complaint off for the next line of code
    // eslint complaints using capital for function naming.
    // if not using capital then the function cannot use Hooks.
    // TODO: rules on naming function, class, variable
    return (CreateVegeCard(element));    // eslint-disable-line
  });

  return (
    <div style={{display: 'flex', flexDirection: 'row',
      flexWrap: 'wrap', margin: '3rem'}}>
      {displayItem}
    </div>
  );
}
