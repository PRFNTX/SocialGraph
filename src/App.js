import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

var Graph = require('react-graph-vis');

var graph = {
  nodes: [
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ],
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

var options = {
  layout: {
      hierarchical: true
  },
  edges: {
      color: "#000000"
  }
};

var events = {
  select: function(event) {
      var { nodes, edges } = event;
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      a: 'a'
    }
  }

  render() {
    let width = 400; 
    let height = 300;
    return (
      <div className="App">
        <h1>testing</h1>
        <Graph graph={graph} options={options} events={events} />
      </div>
    );
  }
}

export default App;
