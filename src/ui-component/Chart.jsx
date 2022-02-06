/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 21/01/2022 - 23:53:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = (props) => {
  return (
    <ResponsiveContainer width="100%">
      <LineChart
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;