import React, {useState} from 'react';
import {Card, Button, Modal, Table,
  Container, Col, Row, Image,
  Form}
  from 'react-bootstrap';
import {vegetableList} from './vegeInfo';
import './myGardenStyle.css';
import {handleResize, isMobilePage} from './utils';
import PropTypes from 'prop-types';

export const SELECTVEGE_KEY_IN_STORAGE = 'selectedVege';

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

function ActionButton(inGarden, handler) {
  if (!inGarden) {
    return (
      <Button variant="primary" onClick={handler}>
      加入菜园
      </Button>
    );
  } else {
    // remove from garden
    return(
      <Button variant="dark" onClick={handler}>
      移出菜园
      </Button>
    );
  }
}

function CreateVegeCard(params, isMobile, vegeShowModal, setVegeShowModal, forceUpdate) {
  const handleClose = () => setVegeShowModal('none');
  const handleShow = () => setVegeShowModal(params.name);
  const showModal = params.name === vegeShowModal ? true: false;
  const selectedVege = Object.values(JSON.parse(localStorage.getItem(SELECTVEGE_KEY_IN_STORAGE)) || {});
  const addToGarden = () => {
    if (!selectedVege.includes(params.name)){
      selectedVege.push(params.name);
      localStorage.setItem(SELECTVEGE_KEY_IN_STORAGE, JSON.stringify(selectedVege));
      forceUpdate((currentValue) => {return currentValue + 1});
    } else {
      ;   // Already exist
    }
  };
  const removeFromGarden = () => {
    if (selectedVege.includes(params.name)) {
      // https://www.w3schools.com/js/js_array_methods.asp
      selectedVege.splice(selectedVege.indexOf(params.name), 1);
      localStorage.setItem(SELECTVEGE_KEY_IN_STORAGE, JSON.stringify(selectedVege));
      forceUpdate((currentValue) => {return currentValue - 1});
    } else {
      ;   // selectedVege does not include this one
    }
  }
  const inGarden = !!selectedVege.includes(params.name);
  const buttonHandler = inGarden ? removeFromGarden: addToGarden;

  if (isMobile) {
    return (
      <div key = {params.name}>
        <Card style={{margin: '1rem'}}>
          <div className="z-depth-5" style={{backgroundColor: 'whitesmoke'}}>
            <Container>
              <Row>
                <Col sm={3} xs={3} md={3} lg={3}>
                  <Image variant="top" src={params.icon}
                    style={{width: '6rem'}} onClick={handleShow}/>
                </Col>
                <Col>
                  <Row onClick={handleShow}>
                    <Col><h1 style={{fontSize: '23px'}}>{params.name}</h1></Col>
                  </Row>
                  <Row onClick={handleShow}>
                    <Col>{params.general}</Col>
                  </Row>
                  <Row>
                    <Col>
                      {ActionButton(inGarden, buttonHandler)}
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
          <Card.Img variant="top" src={params.icon} onClick={handleShow}/>
          <Card.Body>
            <Card.Title onClick={handleShow}>{params.name}</Card.Title>
            <Card.Text onClick={handleShow}>
              {params.general}
            </Card.Text>
              {ActionButton(inGarden, buttonHandler)}
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
  const [vegeShowModal, setVegeShowModal] = useState('none');
  const [selectedVege, setSelectedVege] = useState('');
  const [updateCounter, forceUpdate] = useState(1);
  const [isMobile, setIsMobile] = useState(isMobilePage);
  let vegeShowList = [];

  window.addEventListener('resize', () => {
    handleResize(isMobile, setIsMobile);
  });

  if (selectedVege === '') {
    vegetableList.forEach((element) => {
      vegeShowList.push(element);
    });
  } else {
    const filterSelection = vegetableList.filter((element) => {
      return element.name.includes(selectedVege);
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
    return (CreateVegeCard(element, isMobile, vegeShowModal, setVegeShowModal, forceUpdate));    // eslint-disable-line
  });

  return (
    <>
      <VegeFilter vegeSelection = {setSelectedVege}/>
      <div style={{display: 'flex', flexDirection: 'row',
        flexWrap: 'wrap'}}>
        {displayItem}
      </div>
    </>
  );
}
