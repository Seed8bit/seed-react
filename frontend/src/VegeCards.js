import React, {useState} from 'react';
import {Card, Button, Modal, Table,
  Container, Col, Row, Image,
  Form}
  from 'react-bootstrap';
import {vegetableList} from './vegeInfo';
import './myGardenStyle.css';
import {handleResize, isMobilePage} from './utils';
import PropTypes from 'prop-types';

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

function CreateVegeCard(params, isMobile, showModal, setShowModal) {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (isMobile) {
    return (
      <div key = {params.name}>
        <Card style={{margin: '1rem'}}>
          <div className="z-depth-5" style={{backgroundColor: 'whitesmoke'}}>
            <Container>
              <Row>
                <Col sm={3} xs={3} md={3} lg={3}>
                  <Image variant="top" src={params.icon}
                    style={{width: '6rem'}}/>
                </Col>
                <Col>
                  <Row>
                    <Col><h1 style={{fontSize: '23px'}}>{params.name}</h1></Col>
                  </Row>
                  <Row>
                    <Col>{params.general}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant="primary" onClick={handleShow}>
                        {params.name}信息
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </Card>

        <Modal show={showModal} onHide={handleClose}>
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

        <Modal show={showModal} onHide={handleClose}>
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

function VegeFilter({vegeSelection}) {
  return (
    <Form noValidate onSubmit={(event) => {
      event.preventDefault();
    }}>
      <Form.Row>
        <Form.Group as={Col} style={{margin: '1rem'}}>
          <Form.Control as="input" type="text" placeholder="搜索蔬菜"
            name="vegeFilter"
            onChange={(event) => {
              vegeSelection(event.target.value);
            }}/>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

// https://stackoverflow.com/questions/38684925/react-eslint-error-missing-in-props-validation
VegeFilter.propTypes = {
  vegeSelection: PropTypes.func,
};

export default function VegeCardList() {
  const [showModal, setShowModal] = useState(false);
  const [vegeSelection, setVegeSelection] = useState('');
  const [isMobile, setIsMobile] = useState(isMobilePage);
  let vegeShowList = [];

  window.addEventListener('resize', () => {
    handleResize(isMobile, setIsMobile);
  });

  if (vegeSelection === '') {
    vegetableList.forEach((element) => {
      vegeShowList.push(element);
    });
  } else {
    const filterSelection = vegetableList.filter((element) => {
      return element.name.includes(vegeSelection);
    });
    if (filterSelection.length > 0) {
      vegeShowList = filterSelection.slice();
    } else {
      vegeShowList = vegetableList.slice();
    }
  }

  const displayItem = vegeShowList.map((element) => {
    // turn eslint complaint off for the next line of code
    // eslint complaints using capital for function naming.
    // if not using capital then the function cannot use Hooks.
    // TODO: rules on naming function, class, variable
    return (CreateVegeCard(element, isMobile, showModal, setShowModal));    // eslint-disable-line
  });

  return (
    <>
      <VegeFilter vegeSelection = {setVegeSelection}/>
      <div style={{display: 'flex', flexDirection: 'row',
        flexWrap: 'wrap'}}>
        {displayItem}
      </div>
    </>
  );
}
