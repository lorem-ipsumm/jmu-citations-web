import React from 'react';
import "../css/loading.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

/*
    This component handles displaying a line graph of the data
*/



interface MyProps {
  week_data: any
}

export default class LineGraph extends React.Component<MyProps, any>{

    render() {
        return(
            <div className="graph-wrapper wrapper">
                <span className="graph-title">Citations and Balance Over Time</span>
                <LineChart
                width={425}
                height={300}
                data={this.props.week_data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
                >
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="citations" stroke="#82ca9d" activeDot={{ r: 8 }}/>
                </LineChart>
            </div>
        );
    }
}