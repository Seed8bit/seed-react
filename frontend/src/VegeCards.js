import React, {useState, useEffect} from 'react';
import {Card, Button, Modal, Table, Container, Col, Row, Image} from 'react-bootstrap';
import {vegetableList} from './vegeInfo';
import './myGardenStyle.css';

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

function CreateVegeCard(params, isMobile) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (isMobile) {
    return (
      <div key = {params.name}>
        <Card style={{margin: "1rem"}}>
          <div className="z-depth-5" style={{backgroundColor: "whitesmoke"}}>
            <Container>
              <Row>
                <Col sm={3} xs={3} md={3} lg={3}>
                  <Image variant="top" src={params.icon} style={{width:"6rem"}}/>
                </Col>
                <Col>
                  <Row>
                    <Col><h style={{fontSize: "23px"}}>{params.name}</h></Col>
                  </Row>
                  <Row>
                    <Col>{params.general}</Col>
                  </Row>
                  <Row>
                    <Col><Button variant="primary" onClick={handleShow}>{params.name}信息</Button></Col>
                  </Row>
                </Col>
              </Row>
              </Container>
          </div>
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
  } else {
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
}

export default function VegeCardList() {

  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth < 600
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize)
  });

  const displayItem = vegetableList.map((element) => {
    // turn eslint complaint off for the next line of code
    // eslint complaints using capital for function naming.
    // if not using capital then the function cannot use Hooks.
    // TODO: rules on naming function, class, variable
    return (CreateVegeCard(element, isMobile));    // eslint-disable-line
  });

  return (
    <div style={{display: 'flex', flexDirection: 'row',
      flexWrap: 'wrap'}}>
      {displayItem}
    </div>
  );
}
