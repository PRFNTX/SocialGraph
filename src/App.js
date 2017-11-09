import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import d3 from 'd3'
import d3 from './box'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.margin = {top: 10, right: 50, bottom: 20, left: 50},
    this.width = 120 - this.margin.left - this.margin.right,
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.min = Infinity,
    this.max = -Infinity;

    this.chart = d3.box()
    .whiskers(this.iqr(1.5))
    .width(this.width)
    .height(this.height);
    
    this.state = {
      data: []
    }
}
  componentWillMount() {
 
    
      let key = '2SV0X4IAITTAXO54';
      let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=';
      let embededData = [];

      axios.get(url+key)
      .then(result=>{
        let min = Infinity, max = -Infinity;
        for (let minData in result.data['Time Series (1min)']) {
          let ret=[]
          // console.log(minData)
          for (let point in result.data['Time Series (1min)'][minData]) {
            let dataItem = result.data['Time Series (1min)'][minData][point];
            ret.push(dataItem);
           
          }
        
          //let n = minData.map(item=>[item['1. open'], item['2. high'], item['3. low'], item['4. close']]);
          
          ret.splice(ret.length-1,1)
          console.log(ret);
          ret.forEach(val=>{
            max = max < val ? val : max;
            min = min > val ? val : min;
          })
          embededData.push(ret);
        }
          var data = embededData;

          this.chart.domain([min, max]);
            
              var svg = d3.select("#root").selectAll("svg")
                  .data(data)
                .enter().append("svg")
                  .attr("class", "box")
                  .attr("width", this.width + this.margin.left + this.margin.right)
                  .attr("height", this.height + this.margin.bottom + this.margin.top)
                .append("g")
                  .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
                  .call(this.chart);
            

                  
        
      })
      .catch(error=>{
        console.log(error);
      })

  
  }
    // Returns a function to compute the interquartile range.
  iqr(k) {
    return function(d, i) {
      var q1 = d.quartiles[0],
          q3 = d.quartiles[2],
          iqr = (q3 - q1) * k,
          i = -1,
          j = d.length;
      while (d[++i] < q1 - iqr);
      while (d[--j] > q3 + iqr);
      return [i, j];
    };
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
