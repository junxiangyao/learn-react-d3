import { useState, useCallback, useEffect } from 'react';
import {csv, scaleBand, scaleLinear, max} from 'd3'
// import { message } from './message';
const csvURL = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'


const width = 960;
const height = 500;


const BarChart = ()=>{

  // Loading with D3

  const [data, setData] = useState(null);
  // Deprecated - the population of 2020 should be parsed and stringified only once here, so the xScale was changed accordingly as well
	// useEffect(()=>{csv(csvURL).then(data=>{
  //       setData(data);
  //   console.log("fetching data")
  // })},[])

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020']; // the numeric population is saved as a new column in each row
      return d;
    };
    csv(csvURL, row).then(data => {
      setData(data.slice(0, 10));
    });
  }, []);

  if(!data){
    return <pre>Loading...</pre>;
  }
  // useEffect(()=>csv(csvURL).then(setData),[]); // useEffect, the csv() will only be called once.
  console.log(data[0]);

  const yScale = scaleBand()
    .domain(data.map(d=>d.Country)) // get a new array contains country names.
    .range([0,height])
    /******
    About scaleBand and domain
    ??? https://www.d3indepth.com/scales/
    ******/

  const xScale = scaleLinear()
    .domain([0, max(data, d => +d['2020'])])
    .range([0, width]);

  return (
    <svg width = {width} height = {height} style={{margin:'auto', display:'block'}}>
     {data.map((d,i) => (
       <rect
        x = {0}
        y = {yScale(d.Country)}
        width = {xScale(d.Population)}
        height ={yScale.bandwidth()}
        key = {i}/>
      ))}
    </svg>
    // <svg width = {width} height = {height} style={{margin:'auto', display:'block'}}>
    //  {data.map((d,i) => (
    //    <rect
    //     x = {0}
    //     y = {yScale(d.Country)}
    //     width = {xScale(d['2020'])} // this is deperecated for better performance
    //     height ={yScale.bandwidth()}
    //     key = {i}/>
    //   ))}
    // </svg>
  );
}


export default BarChart;
