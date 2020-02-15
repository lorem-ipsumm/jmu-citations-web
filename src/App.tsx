import React from 'react';
import duke from './assets/duke_dog.png';
import './css/App.css';
import Loading from './components/Loading';
import LineGraph from './components/LineGraph';
import LocationList from './components/LocationList';
import Cookies from 'universal-cookie';





interface MyState {
  metadata: any,
  citation_data: any,
  week_data: any,
  citation_limit: string,
  metadata_loaded: boolean,
  citations_loaded: boolean,
  week_data_loaded: boolean
}

const cookies = new Cookies();


export default class App extends React.Component<any, MyState> {


  constructor(props : any) {
    super(props);

    this.state = {
      metadata: {},
      citation_data: {},
      week_data: {},
      citation_limit: "Today",
      metadata_loaded: false,
      citations_loaded: false,
      week_data_loaded: false
    }

  }

  // format a "last updated" string
  getUpdatedString = () => {

    // convert epoch seconds to date
    let seconds = this.state.metadata.last_updated["_seconds"];
    let d = new Date(0);
    d.setUTCSeconds(seconds);

    return(d.toLocaleString());
  }


  // get the citations from the db
  getCitations = () => {

    // get a timestamp and force 2 digits
    const now = new Date();
    const month = ("0" + (now.getMonth()+1)).slice(-2);
    const date = ("0" + (now.getDate())).slice(-2);

    // make a get request to the citation endpoint
    fetch("https://us-east1-ticket-counter-7b7ab.cloudfunctions.net/get_citations_today?month=" + month + "&date=" + date)
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        citation_data: responseData,
        citations_loaded: true
      });

    });

    fetch("https://us-east1-ticket-counter-7b7ab.cloudfunctions.net/get_citations_week?month=" + month + "&date=" + date)
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        week_data: [responseData.graph_data],
        week_data_loaded: true
      });
    });
  }

  // get metadata from the db
  getMetatdata = () => {

    // make a get request to the given url
    fetch("https://us-central1-ticket-counter-7b7ab.cloudfunctions.net/get_metadata")
    .then(response => response.json())
    .then((responseData) => {
      
      // update state variables
      this.setState({
        metadata: responseData,
        metadata_loaded: true
      });

    })
    .catch(error => {
      console.log(error);
    })

  }

  // update the visit counter if needed
  update_visit_counter = () => {

    // console.log(cookies.get("n"))
    
    if (cookies.get("visited") === undefined) {

      // create date for ten minutes in the future
      let expire = new Date();
      expire.setTime(expire.getTime() + (10*60*1000));

      // set visited cookie
      cookies.set('visited', true, {
        path: '/',
        expires: expire
      });

      // send a get request to the visitor_count url
      // no need to parse a response
      fetch("https://us-central1-ticket-counter-7b7ab.cloudfunctions.net/update_visitor_count");
    }
  }


  // add commas to numvber
  formatNumber = (str : String) => {

    // regex is crazy
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }


  // show data or show loading screen
  showData = () => {
    if (this.state.metadata_loaded && this.state.citations_loaded){
      return(
        <div className="App-wrapper">
          <div className="header">
            <div className="header-text">
              <span className="main-text">This website tracks the number of parking citations given out by JMU each day.</span> 
              <span className="sub-subtext">*This is a personal project and is not directly affiliated with JMU.*</span>
            </div>
          </div>
          <img src={duke} className="App-logo" alt="logo" />
          <span className="main-text">Balance Charged {this.state.citation_limit}: <b>${this.formatNumber(this.state.citation_data.total_balance)}</b></span>
          <span className="subtext">From <b>{this.state.citation_data.total_citations}</b> parking citations</span>
          <div className="separator"></div>
          <LineGraph week_data={this.state.week_data[0]}/>
          <span className="subtext last-updated">Last Updated: {this.getUpdatedString()}</span>
          <div className="separator"></div>
          <LocationList location_data={this.state.citation_data.location_count}/>
          <div className="separator"></div>
          <span className="description subtext">Go Dukes</span>
          <span className="visitor-count subtext"><span id="count">{this.formatNumber(this.state.metadata.visitors)} visitors</span></span>
        </div>
      )
    } else {
      return(
        <Loading/>
      );
    }
  }


  

  // run when the component succefully mounts
  componentDidMount = () => {

    // get the meta data
    this.getMetatdata();

    // get citation data
    this.getCitations();

    this.update_visit_counter();
  }

  render() {
      return (
        <div className="App">
          {this.showData()} 
        </div>
      )
  }
}