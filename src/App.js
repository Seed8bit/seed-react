import React from 'react';
import {vegetableList, navInfo} from './vegeInfo';
import {NavigationBar as navigationBar} from './Navigation';
import {VegeCard as vegeCard} from './VegeCard';

function App() {
  const displayItem = vegetableList.map((element) => {
    return (vegeCard(element));
  });

  return (
    <div>
      <div>
        {navigationBar({navInfo})}
      </div>
      <div style={{display: 'flex', margin: '3rem'}}>
        {displayItem}
      </div>
    </div>
  );
}

export default App;
