import * as d3 from 'd3';
export const message = data => {
  let message = '';
  message += Math.round(d3.csvFormat(data).length/1024) + ' kb\n'; // here is the difference
  message += data.length + ' rows\n';
  message += data.columns.length +' columns\n';
  console.log(data);
  return message;
};

// import parsed csv data parsed by d3, export information
