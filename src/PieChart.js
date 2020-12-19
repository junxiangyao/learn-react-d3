import { useState, useEffect } from 'react';
import {csv, arc, pie} from 'd3'
// import { message } from './message';
const csvURL = 'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv'

// message(csvURL);

// const App = ()=>{
//   const [data, setData] = useState(null);
// 	useEffect(()=>{csv(csvURL).then(data=>{
//         setData(data);
//     console.log("fetching data")
//   })},[])
//   // useEffect(()=>csv(csvURL).then(setData),[]); // useEffect, the csv() will only be called once.
//   return(<pre>{data ? message(data) : "loading"}</pre>);
// }
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);

const PieChart = ()=>{

  // Loading with D3
  const [data, setData] = useState(null);
	useEffect(()=>{csv(csvURL).then(data=>{
        setData(data);
    console.log("fetching data")
  })},[])

  if(!data){
    return <pre>Loading...</pre>;
  }
  // useEffect(()=>csv(csvURL).then(setData),[]); // useEffect, the csv() will only be called once.
  console.log(data[0]);

  const colorPie = pie().value(1);
  return (
    <svg width = {width} height = {height} style={{margin:'auto', display:'block'}}>
      <g transform={`translate(${centerX},${centerY})`}>
        {colorPie(data).map((d,i)=>(
          <path
            fill={d.data['RGB hex value']}
            d={pieArc(d)}
            key = {i}
          />
     ))}
    </g>
  </svg>
  );
  // {data.map((d,i) => (
  //   <path
  //     fill={d['RGB hex value']}
  //     d={pieArc({
  //       startAngle: i / data.length * 2 * Math.PI,
  //       endAngle: (i + 1) / data.length * 2 * Math.PI
  //     })} />
  // ))}
}


export default PieChart;
