import './App.css';
import React, { Component } from 'react';

//Joke Component 
class Joke extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPunchline: false
    }
    
  }

  //Update Component that checks previous state to set 
  componentDidUpdate(prevProps) {
    //Reset punchline display when new joke loads
    if (this.props.joke !== prevProps.joke) {
      this.setState({
        showPunchline: false
      })
    }
  }

  //Displays Joke Set Up, Punchline Button, and Punchline on Click
  render() {
    if(this.props.joke) {
      return (
        <div className="Joke">
          <p className="joke">{this.props.joke.setup}</p>
          <button className="punchlineButton" onClick={() => this.setState({showPunchline: !this.state.showPunchline})}>{this.state.showPunchline ? 'Hide': 'Show'} Punch Line</button>       
          {this.state.showPunchline ? <p className="punchline">{this.props.joke.punchline}</p> : <p></p>}
        </div>
      );
    } else {
      return (
        <div>
          <p className="loading">LOADING YOUR JOKE...</p>
        </div>
      );
    }
  }
}

//Main Application Component
class App extends React.Component {

  constructor(props) {
    super(props);

    //Sets initial state
    this.state = {
      error: false,
      joke: null
    }

    this.apiDocs = 'https://github.com/15Dkatz/official_joke_api';
    this.jokeApi = 'https://official-joke-api.appspot.com/random_joke';

    //Loads initial joke
    this.getJoke();
  }

  //Function that retrieves random joke from joker api
  getJoke() {
    this.setState({
      error: false,
      joke: null
    })
    fetch(this.jokeApi)
    .then(response => {
      //If the response does not return an "ok" response an error is thrown
      if (!response.ok) {
        throw Error(response.statusText);
      }
      //Otherwise a json response is retrieved
      return response.json();
    })
    //On success the data is stored in the joke variable
    .then(data => {
      this.setState({
        error: false,
        joke: data
      });
    })
    //If an error is detectected it sets error to true
    .catch(error => {
      console.log(error);
      this.setState({
        error: true,
        joke: null
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className ="container">
            <button className="jokeButton" onClick={() => this.getJoke()}>Get A New Random Joke</button>
            <a href={this.apiDocs} target="_blank"><p>View API Docs</p></a>
          </div>
          <Joke joke={this.state.joke} />
          {this.state.error ? <p className="errorMessage">THERE WAS AN ERROR LOADING YOUR JOKE</p> : <p></p>}
        </div>

      </div>
    );
  }
}

export default App;
