import { useState, useCallback, useEffect } from 'react';
import {csv} from 'd3'
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

const App = ()=>{

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
  return data.map((d,i) =>
    <div
    key={i}
    style = {{
      backgroundColor: d['RGB hex value'],
      width: '960px',
      height: '6px'
    }}
  />);
}


export default App;
