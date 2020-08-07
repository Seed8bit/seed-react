import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav} from 'react-bootstrap';

export default function NavigationBar({navList = [{link: '', name: ''}]}) {
  const renderNavItem = navList.map((item) => {
    return (
      <Nav.Link href={item.link} key={item.name}>
        {item.name}
      </Nav.Link>
    );
  });

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>蔬菜图鉴</Navbar.Brand>
      <Nav className="mr-auto">
        {renderNavItem}
      </Nav>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  navList: PropTypes.array.isRequired,
};
