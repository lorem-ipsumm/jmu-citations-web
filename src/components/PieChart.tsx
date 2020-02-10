import React from 'react';
import "../css/loading.css";
import { PieChart, Pie, Tooltip, } from 'recharts';

/*
    This component handles displaying a pie chart of the data
*/

/*
const data01 = [
    { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];
*/


interface MyProps {
  location_data: any
}

export default class PieChar extends React.Component<MyProps, any>{

    constructor(props : any){
        super(props);
        this.state = {
            // the current fact being shown
            current_fact: ""
        }
    }

    componentDidMount = () => {
        console.log(this.props);
    }


    render() {
        return(
            <div className="loading-wrapper wrapper">
               <PieChart width={400} height={400}>
                   <Pie dataKey="value" legendType={'square'} isAnimationActive={true} data={this.props.location_data} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
               </PieChart> 
            </div>
        );
    }
}