import React from 'react';
import duke from './assets/duke_dog.png';
import './css/App.css';
import Loading from './components/Loading';



export default class App extends React.Component<any, any> {


  constructor(props : any) {
    super(props);

    this.state = {
      metadata: {},
      citation_data: {},
      citation_limit: "Today",
      metadata_loaded: false,
      citations_loaded: false,
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


  // add commas to numvber
  formatNumber = (str : String) => {

    // regex is crazy
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }


  // show data or show loading screen
  showData = () => {
    if (this.state.metadata_loaded && this.state.citations_loaded){
      return(
        <header className="App-header">
          <span>Last Updated: {this.getUpdatedString()}</span>
          <img src={duke} className="App-logo" alt="logo" />
          <span>Balance Charged {this.state.citation_limit}: ${this.formatNumber(this.state.citation_data.total_balance)}</span>
          <span className="subtext">From a total of <b>{this.state.citation_data.total_citations}</b> citations</span>
          <div className="separator"></div>
          <span className="description">This website tracks the number of citations given out by JMU each day. Right now there is just a live count, but there is more data coming soon!</span>
        </header>
      )
    } else {
      return(
        <Loading/>
      );
    }
  }

  // show notice if people are a player from wandr.land
  showGameNotice = () => {
    if (window.location.href.indexOf("player=true") !== -1) {
      return(
        <div id="game-notice" className="wrapper">
          <div id="notice-wrapper">
            <span>If you are a player of wandr.land, thank you for playing! I'm too busy to continue improving the game. I had a great time seeing how people play the game, and I hope you had a great time playing!</span>
          </div>
        </div>
      );
    }
  }

  // run when the component succefully mounts
  componentDidMount = () => {

    // get the meta data
    this.getMetatdata();

    // get citation data
    this.getCitations();

  }

  render() {
      return (
        <div className="App">
          {this.showGameNotice()}
          {this.showData()} 
        </div>
      )
  }
}