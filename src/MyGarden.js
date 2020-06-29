import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Container, Row, Col, ProgressBar
  , Pagination, Nav} from 'react-bootstrap';
import {testData} from './TestData';

function markdownExtractor(str) {
  const pages = str.split(/(?=#\s+)/);
  const content = [];
  pages.forEach((element) => {
    content.push({'title': element.split('\n')[0], 'paragraphs': element});
  });
  return content;
}

function MyGardenSide() {
  return (
    <>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/home">西红柿</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">黄瓜</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">小葱</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default function MyGarden() {
  const input = testData;
  const [activePage, setActivePage] = useState(1);
  const content = markdownExtractor(input);

  const handleActivePageSel = (selection) => setActivePage(selection);

  const paginationItems = [];

  for (let number = 1; number <= content.length; number++) {
    paginationItems.push(
        <Pagination.Item key={number} active={number === activePage}>
          {number}
        </Pagination.Item>,
    );
  }

  const paginationBasic = (
    <div>
      <Pagination onClick={(params)=>{
        handleActivePageSel(params.target.text);
      }}>{paginationItems}</Pagination>
      <br/>
    </div>
  );

  // "activePage - 1" to convert to index
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={2} xs={2}>
            <MyGardenSide/>
          </Col>
          <Col sm={10} xs={10}>
            <Container fluid>
              <ProgressBar now={activePage*100/content.length}
                label={content[activePage - 1]['title']}/>
              <Row>
                <Col>
                  <ReactMarkdown
                    source={content[activePage - 1]['paragraphs']}/>
                </Col>
              </Row>
              <Row>
                {paginationBasic}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
