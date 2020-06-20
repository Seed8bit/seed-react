import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {vegetableList} from './vegeInfo';


class App extends React.Component {
  render() {
    const displayItem = vegetableList.map((element) => {
      return (
        <div style = {{margin: '2rem'}} key = {element.name}>
          <Card style={{width: '10rem'}}>
            <Card.Img variant="top" src={element.icon}/>
            <Card.Body>
              <Card.Title>{element.name}</Card.Title>
              <Card.Text>
            TestTest
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>);
    });

    return (
      <div style={{display: 'flex', margin: '3rem'}}>
        {displayItem}
      </div>
    );
  }
}

export default App;
