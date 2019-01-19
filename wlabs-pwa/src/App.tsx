import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  searchProducts(){
      return '';
  }
  render() {
      // add a search box with a button.
      // add a list to display results
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Search for Walmart products
          </p>
          <form className="form" id="searchForm">
              <input type="text" className="input" id="searchText" placeholder="Backpacks" />
              <button className="button is-info" onClick={this.searchProducts}>Search</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
