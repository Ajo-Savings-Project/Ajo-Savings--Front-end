
// import React from 'react';

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// interface DataObject {}

// Define a TypeScript interface for the props
// interface LinechartProps {
//   info:DataObject[]; 
  // You should specify the correct type for your data
//   xKey: string;
//   yKey: string;
//   width: number | string;
//   height: number;
// }



// const Linechart: React.FC<LinechartProps> = ({ info, xKey, yKey, width, height }) => {
 
//   return (
//     <ResponsiveContainer width={width} height={height}>
//       <LineChart data={info}>
//         <XAxis dataKey={xKey} />
//         <YAxis />
//         <CartesianGrid strokeDasharray="3 3" stroke="#888"  />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey={yKey} stroke="#8884d8"  activeDot={{ r: 8}} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default Linechart;




import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LinechartProps {
  info: { month: string; totalIncome: number }[];
  xKey: string;
  yKey: string;
  width: number | string;
  height: number;
}

const Linechart: React.FC<LinechartProps> = ({ info, xKey, yKey, width, height }) => {
  return (
    <ResponsiveContainer width={width} height={height} className="">
      <LineChart data={info}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" stroke="#888" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yKey} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linechart;

