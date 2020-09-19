import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {NavigationBar as NavBar} from './components';
import VegeCardList from './pages/vege/VegeCards';
import MyGarden from './pages/garden/MyGarden';

const navItems = [
  {
    'name': '蔬菜',
    'link': '/',
  },
  {
    'name': '菜园',
    'link': '/garden',
  },
];

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <NavBar navList={navItems}></NavBar>
        </div>
        <Switch>
          <Route path={navItems[0].link} component={VegeCardList} exact />
          <Route path={navItems[1].link} component={MyGarden} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
