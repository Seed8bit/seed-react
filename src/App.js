import React from 'react';
import {navInfo} from './vegeInfo';
import {NavigationBar as navigationBar} from './Navigation';
import listVegeCards from './VegeCards';
import {Route, Switch} from 'react-router-dom';
import MyGarden from './MyGarden';

function App() {
  return (
    <div>
      <div>
        {navigationBar({navInfo})}
      </div>
      <Switch>
        <Route path={navInfo[0].link} component={listVegeCards} exact/>
        <Route path={navInfo[1].link} component={MyGarden}/>
      </Switch>
    </div>
  );
}

export default App;
