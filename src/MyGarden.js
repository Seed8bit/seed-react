import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Container, Row, Col, ProgressBar
  , Pagination, Nav, Carousel} from 'react-bootstrap';
import {testData} from './TestData';
import './myGardenStyle.css';

function markdownExtractor(str) {
  const pages = str.split(/(?=#\s+)/);
  const content = [];
  pages.forEach((element) => {
    // the following regex expression explain:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    // https://stackoverflow.com/questions/12059284/get-text-between-two-rounded-brackets
    const slides = [];
    const regRes = element.match(/!\[.*\]\(.*\)/g);
    if (regRes) {
      regRes.forEach((slide) => {
        const alt = slide.match(/\[([^\]]+)\]/)[1];
        const url = slide.match(/\(([^)]+)\)/)[1];
        slides.push({'url': url, 'alt': alt});
      });
    }
    content.push({'title': element.split('\n')[0],
      'paragraphs': element.replace(/!\[.*\]\(.*\)/g, ''),
      'slides': slides});
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
  const slides = [];

  for (let number = 0; number < content.length; number++) {
    if (content[number]['slides'].length > 0) {
      const carouselItems = [];
      content[number]['slides'].forEach((element) => {
        carouselItems.push(
            <Carousel.Item>
              <img
                src={element.url}
                alt={element.alt}
              />
              <Carousel.Caption>
                <p>{element.alt}</p>
              </Carousel.Caption>
            </Carousel.Item>);
      });
      slides.push(
          <Carousel>
            {carouselItems}
          </Carousel>);
    } else {
      slides.push(<></>);
    }
  }

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
      <Container fluid style={{maxWidth: 1250}}>
        <Row>
          <Col sm={2} xs={2}>
            <MyGardenSide/>
          </Col>
          <Col sm={10} xs={10}>
            <Container fluid>
              <ProgressBar now={activePage*100/content.length}
                label={content[activePage - 1]['title']}/>
              <Row>
                <Col sm={8} xs={8} md={8} lg={8}>
                  <ReactMarkdown
                    source={content[activePage - 1]['paragraphs']}/>
                </Col>
                <Col sm={4} xs={4} md={4} lg={4}>
                  {slides[activePage - 1]}
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
