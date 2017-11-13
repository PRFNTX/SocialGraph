import * as d3 from 'd3';
import d3Wrap from 'react-d3-wrap';

const MyChart = d3Wrap({
 initialize (svg, data, options) {
   // Optional initialize method called once when component mounts 
 },

 update (svg, data, options) {
   // setup container, root svg element passed in along with data and options 
   const chart = d3.select(svg)
     .append('g')
     .attr('transform', `translate(${options.margin.left}, ${options.margin.top})`)

   // continue your d3 implementation as usual... 
 },

 destroy () {
   // Optional clean up when a component is being unmounted... 
 }
})

export default MyChart