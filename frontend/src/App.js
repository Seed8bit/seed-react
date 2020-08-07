import React from 'react';
import {Route, Switch} from 'react-router-dom';
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
    'link': '/myGarden',
  },
];

function App() {
  return (
    <div>
      <div>
        <NavBar navList={navItems}></NavBar>
      </div>
      <Switch>
        <Route path={navItems[0].link} component={VegeCardList} exact/>
        <Route path={navItems[1].link} component={MyGarden}/>
      </Switch>
    </div>
  );
}

export default App;
