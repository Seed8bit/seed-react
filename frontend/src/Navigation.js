import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export function NavigationBar(params) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>蔬菜图鉴</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href={params.navInfo[0].link}>
          {params.navInfo[0].name}
        </Nav.Link>
        <Nav.Link href={params.navInfo[1].link}>
          {params.navInfo[1].name}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
