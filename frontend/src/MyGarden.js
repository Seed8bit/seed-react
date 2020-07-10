import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Container, Row, Col, ProgressBar
  , Pagination, Nav, Carousel,
} from 'react-bootstrap';
import './myGardenStyle.css';
import {useBreedInfo} from './context/useBreedInfo';
import {Spinner} from './components/notification';

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
    content.push({
      'title': element.split('\n')[0],
      'paragraphs': element.replace(/!\[.*\]\(.*\)/g, ''),
      'slides': slides,
    });
  });
  return content;
}

/* eslint-disable react/prop-types */
const MyGardenSide = ({onSelectAction}) => {
  return (
    <>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="tomato"
        onSelect={(selectedKey) => onSelectAction(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="tomato">西红柿</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cucumber">黄瓜</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="greenonion">小葱</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
/* eslint-enable react/prop-types */

const BreedLoading = () => {
  return (
    <>
      <Container fluid style={{maxWidth: 1250}}>
        <p>Loading...</p>
        <Spinner></Spinner>
      </Container>
    </>
  );
};

const BreedError = () => {
  return (
    <p>error getting content...</p>
  );
};

/* eslint-disable */
export default function MyGarden() {
  const [{ data, loading, hasError }, queryBreedInfo] = useBreedInfo({ vegeName: 'tomato' });
  const [activePage, setActivePage] = useState(1);
  if (loading) {
    return <BreedLoading/>
  } else if (hasError) {
    return <BreedError/>
  } else {
    const content = markdownExtractor(data.markdown);
    const paginationItems = [];
    const slides = [];

    const sideTabOnSelect = (selectedKey) => {
      console.log(`selected: ${selectedKey}`);
      queryBreedInfo({vegeName: selectedKey});
    };

    const handleActivePageSel = (selection) => {
      setActivePage(selection);
    }

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
        <Pagination onClick={(params) => {
          handleActivePageSel(params.target.text);
        }}>{paginationItems}</Pagination>
        <br />
      </div>
    );

    // "activePage - 1" to convert to index
    return (
      <>
        <Container fluid style={{ maxWidth: 1250 }}>
          <Row>
            <Col sm={2} xs={2}>
              <MyGardenSide onSelectAction={sideTabOnSelect} />
            </Col>
            <Col sm={10} xs={10}>
              <Container fluid>
                <ProgressBar now={activePage * 100 / content.length}
                  label={content[activePage - 1]['title']} />
                <Row>
                  <Col sm={8} xs={8} md={8} lg={8}>
                    <ReactMarkdown
                      source={content[activePage - 1]['paragraphs']} />
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

}
/* eslint-ensable */