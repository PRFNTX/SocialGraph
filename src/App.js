import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
// import { LineChart, XAxis, YAxis, Tooltip, CartesianAxis, CartesianGrid, Line } from 'recharts'
import ReactHighcharts from 'react-highcharts/ReactHighstock';
// import ReactHighstock from 'react-highstock';

class App extends Component {
  constructor() {
    super();

    this.state = {
      symbol: 'MSFT',
      data: [],
      options:[],
    }
    //this.chart = '';
    this.getData = this.getData.bind(this);
    
  }

  componentDidMount() {
    //this.getData();
  }

  componentDidUpdate() {
    //this.chart.getChart().addSeries({ name: 'open', data: this.state.data[0] });
    //this.chart.getChart().addSeries({ name: 'high', data: this.state.data[1] });
    //this.chart.getChart().addSeries({ name: 'low', data: this.state.data[2] });
    //this.chart.getChart().addSeries({ name: 'close', data: this.state.data[3] });
}
  tickerSearch=()=>{
    let url = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?lang=en&query="
    let query=this.search.value
    console.log(this.search.value)
    let opsOut
    axios.get("/stocks?link="+url+query).then(
      (res)=>{
        console.log(res)
          opsOut=res.data.ResultSet.Result.map((val,i)=>{
            console.log(val);
            return <option value={val.symbol} key={i}>{val.name}</option>
          })
          this.setState({
            options:opsOut,
          })
      },
      (err)=>{
        console.log(err)
      }
    )
    
  }

  getData(symbol) {
    let chart = this.chart.getChart();
    let embededData = [];
    let key = '2SV0X4IAITTAXO54';
    let timeSeries = 'DAILY_ADJUSTED';
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeries}&symbol=${symbol}&outputsize=full&apikey=`;
    axios.get(url + key)
      .then((result) => {
        console.log('result of axios get:');
        console.log(result);
        //let min = Infinity, max = -Infinity;
        const timeRange = 'Time Series (Daily)'
        //const timeRange = 'Weekly Time Series'
        for (let minData in result.data[timeRange]) {
          let ret = []
         
          for (let point in result.data[timeRange][minData]) {
            
            let dataItem = result.data[timeRange][minData][point];
            ret.push(Number(dataItem));

          }

          ret.splice(ret.length - 1, 1)
          ret.unshift(Number(new Date(minData)));
          console.log(ret)
          embededData.unshift(ret);
        }

        console.log('embededData:');
        console.log(embededData);
        console.log(chart)
        let chartData=embededData
        //let chartData = [[], [], [], [], []];
        // embededData.forEach((set) => {
          // console.log(set)
          // set.forEach((item, i) => {
            // chartData[i].push(item)
          // })
        // })
        this.setState({
          data: chartData
        })
      })
  }

  render() {
    const config = {
      
      rangeSelector: {
        selected: 1
    },

    title: {
        text: 'AAPL Stock Price'
    },

    series: [{
        type: 'candlestick',
        name: 'AAPL Stock Price',
        data: this.state.data,
        dataGrouping: {
            units: [
                [
                    'day', // unit name
                    [1] // allowed multiples
                ], [
                    'week',
                    [1, 2, 3, 4, 6]
                ]
            ]
        }
    }]
  };
    let ops 
    return (
      <div className="App">
        <input type="text" ref={(ref)=>this.search=ref} placeholder="search..."/>
        <button onClick={()=>{this.tickerSearch()}}>Find</button>
        <select name="symbol" ref={(ref)=>this.symbol=ref} onChange={(e)=>this.getData(e.nativeEvent.target.value)}>
          {this.state.options}
        </select>
        <button onClick={()=>this.getData(this.symbol.value)}>Update</button>
        <ReactHighcharts config={config} ref={(ref) => this.chart = ref}></ReactHighcharts>
      </div>
    );
  }
}

export default App;
