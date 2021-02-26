import GridLayout from 'react-updated-grid-layout';
import React from 'react';
import './App.css';
import "react-updated-grid-layout/css/styles.css";

function logData(layout, oldItem, newItem, placeholder, e, element) {
  let items = [];
  for(let item in layout) {
    item = layout[item];
    items[item.y * 100 + item.x] = item;
  }
  let orderedItems = [];
  let i = 0;
  for(let item in items) {
    if(items[item].static !== true) {
      orderedItems[i] = items[item].i;
      i++;
    }
  }
  
  // The sending can be async, so it won't block performance, but the user will have updates on the screen right away
  fetch('/api/save',
    {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({ displayedElements: orderedItems })
    }
  ).then(function(response) {
    console.log(response.headers);
  });
}

class UmbrUI extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'header', x: 0, y: 0, w: 3, h: 1, static: true},
      {i: 'tor', x: 0, y: 1, w: 3, h: 1, minW: 3, maxW: 3},
      {i: 'maxSend', x: 0, y: 2, w: 1, h: 1},
      {i: 'maxReceive', x: 1, y: 2, w: 1, h: 1},
      {i: 'activeChannels', x: 2, y: 2, w: 1, h: 1},
      {i: 'forward', x: 0, y: 3, w: 1, h: 1},
      {i: 'syncProgress', x: 1, y: 3, w: 1, h: 1}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={3} rowHeight={60} width={600} isResizable={false} compactType={'horizontal'} onDragStop={logData}>
        <div key="header">Design your own UmbrUI</div>
        <div key="tor"><p class="heading">Tor URL</p><p class="content">reallylongurlthattakesmuchspaceandneedsitsownrow</p></div>
        <div key="maxSend"><p class="heading">Max Send</p><p class="content">1K Sats</p></div>
        <div key="maxReceive"><p class="heading">Max Receive</p><p class="content">1K Sats</p></div>
        <div key="activeChannels"><p class="heading">Active Channels</p><p class="content">0</p></div>
        <div key="forward"><p class="heading">24H Forward</p><p class="content">0</p></div>
        <div key="syncProgress"><p class="heading">Sync progress</p><p class="content">99%</p></div>
      </GridLayout>
    )
  }
}


function App() {
  return (
    <div className="App">
      <UmbrUI>

      </UmbrUI>
    </div>
  );
}

export default App;
