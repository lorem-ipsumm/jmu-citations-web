import React from 'react';

/*
    This component handles displaying a list of locations and the citations given
    at each one
*/

interface MyProps {
  location_data: any
}

interface MyState {
    total_citations: number;
}

export default class LocationList extends React.Component<MyProps, MyState>{

    constructor(props: any) {
        super(props);


        this.state = {
            total_citations: 0
        }

    }

    componentDidMount = () => {
        this.get_total();
    }


    // get the total number of tickets
    get_total = () => {

        let locations = this.props.location_data;
        let total = 0;

        // iterate through the location object
        // and get the total number of citations 
        for (var key in this.props.location_data) {
            if (locations.hasOwnProperty(key)) {

                // get value
                total += locations[key].value;
            }
        } 


        // update state
        this.setState({
            total_citations: total
        });

    }


    // format percent
    format_percent = (location: any) => {

        // get the percentage  citations at x / total citations
        let percent = location.value / this.state.total_citations;
        percent = Math.trunc(percent * 100);

        // return with formatted spans
        if (percent >= 1){
            return(
                <div className="location-list-item-value">
                    <span className="faded">( {percent}% )</span>
                    <span>{location.value}</span>
                </div>
            );
        } else {
            return(
                <div className="location-list-item-value">
                    <span className="faded">( &lt; 1% )</span>
                    <span>{location.value}</span>
                </div>
            );
        }
    }

    render() {
        if (this.props.location_data.length >= 1) {
            return(
                <div className="location-list-wrapper wrapper">
                <div className="location-list-item title">
                        <span><b>Location</b></span>
                        <span><b>Citations Given (today)</b></span>
                </div>
                {this.props.location_data.map((location : any,index : number) => 
                    <div className="location-list-item-wrapper" key={index}>
                        {index % 2 === 0 ? 
                            <div className="location-list-item color">
                                <span>{location.name}</span>
                                {this.format_percent(location)}
                            </div>
                        : 
                            <div className="location-list-item">
                                <span>{location.name}</span>
                                {this.format_percent(location)}
                            </div>
                        }
                    </div>
                )} 
                </div>
            );
        } else {
            return(
                <div className="location-list-wrapper wrapper">
                    <div className="location-list-item title">
                            <span><b>Location</b></span>
                            <span><b>Citations Given (today)</b></span>
                    </div>
                        <div className="location-list-item-wrapper">
                            <div className="location-list-item color">
                                <span>No Citations Given Today</span>
                            </div>
                        </div>
                </div>
            );
        }
    }
}