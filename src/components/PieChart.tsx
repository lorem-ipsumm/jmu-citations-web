import React from 'react';
import "../css/loading.css";
import { PieChart, Pie, Tooltip, } from 'recharts';

/*
    This component handles displaying a pie chart of the data
*/
const data01 = [
    { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];

export default class Loading extends React.Component<any, any>{
    constructor(props : any){
        super(props);
        this.state = {
            // the current fact being shown
            current_fact: ""
        }
    }


    render() {
        return(
            <div className="loading-wrapper wrapper">
               <PieChart width={400} height={400}>
                   <Pie dataKey="value" isAnimationActive={true} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                   <Tooltip />
               </PieChart> 
            </div>
        );
    }
}