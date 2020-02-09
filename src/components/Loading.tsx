import React from 'react';
import "../css/loading.css";

/*
    This component shows the user a loading screen while data is prepared
*/

export default class PieChar extends React.Component<any, any>{
    constructor(props : any){
        super(props);

        // random facts to show to the user
        /*
        this.facts = [
            "Only 2% of Earth population naturally has green eyes.",
            "A bolt of lightning is six times hotter than the sun.",
            "Dolphins recognize and admire themselves in mirrors.",
            "There is a McDonald’s in every continent except Antartica.",
            "A duel between three people is actually called a truel.",
            "All Fruit Loops taste the same",
            "In Morse Code -.- means k.",
            "???",
            "The Boston Marathon didn’t allow female runners until 1972.",
            "y̫͍̭o̫̭̩̟͞u͓̞͜ͅ'̞͖re̼ ͚̞͔̹͖͢p͔̝̫̪̭̺͓͢r҉̻͈ͅo͠b̺̠a̷̝̻͈͔b̬͖̖ļ̱̗̗y͜ h͏̭̳̤ͅu͖̱̻̟͚m̘̙͍a̼n͉̥",
        ];
        */


        this.state = {
            // the current fact being shown
            current_fact: ""
        }
    }

    // wait five seconds before showing bad connection message
    componentDidMount = () => {

        /*
        // get a new fact whenever the component mounts
        this.setState({
            current_fact: this.facts[Math.floor(Math.random()*this.facts.length)]
        })
        */

        this.setState({
            connection_timer:  setTimeout(() => {
                // show bad connection message
                let message = document.getElementsByClassName("loading-message")[0];

                // check to see if the element exists
                if(message !== undefined){
                    document.getElementsByClassName("loading-message")[0].classList.add("visible");
                }
            },5000)
        });
    }


    // disable the timer and reset the connection message
    componentWillUnmount = () => {
        // check if the timer is defined
        if (this.state.connection_timer !== undefined) {
            // clear (reset) the timer for the next mounting
            clearTimeout(this.state.connection_timer);
        }

        // get the loading message
        let message = document.getElementsByClassName("loading-message")[0];

        // if the loading message is defined, make it invisible for the next mounting
        if(message !== undefined) {
            document.getElementsByClassName("loading-message")[0].classList.remove("visible");
        }
    }

    render() {
        return(
            <div className="loading-wrapper wrapper">
                <div className="loading">
                    <span>Loading</span>
                </div>

                <div className="loading-message">
                    <span>It looks like your connection is weak. Please be patient. If this cotinues try refreshing the page.</span>
                </div>
            </div>
        );
    }
}