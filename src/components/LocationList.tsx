import React from 'react';

/*
    This component handles displaying a list of locations and the citations given
    at each one
*/

interface MyProps {
  location_data: any
}

export default class LocationList extends React.Component<MyProps, any>{
    render() {
        if (this.props.location_data.length >= 1) {
            return(
                <div className="location-list-wrapper wrapper">
                <div className="location-list-item title">
                        <span><b>Lot Name</b></span>
                        <span><b>Citations Given (today)</b></span>
                </div>
                {this.props.location_data.map((location : any,index : number) => 
                    <div className="location-list-item-wrapper" key={index}>
                        {index % 2 === 0 ? 
                            <div className="location-list-item color">
                                <span>{location.name}</span>
                                <span>{location.value}</span>
                            </div>
                        : 
                            <div className="location-list-item">
                                <span>{location.name}</span>
                                <span>{location.value}</span>
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
                            <span><b>Lot Name</b></span>
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