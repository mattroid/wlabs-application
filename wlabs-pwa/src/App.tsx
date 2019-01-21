import React, { Component } from 'react';
import request from 'request-promise';
import logo from './logo.jpg';
import './App.css';

class App extends Component<{}, { errors: string[], products: any[]}> {
  constructor(props: any) {
      super(props);
      this.state = { errors: [], products: [] }
      this.searchProducts = this.searchProducts.bind(this);
  }
  searchProducts(e: any){
    // Prevent button click from submitting form
    e.preventDefault();

    const searchTerm = (document.getElementById('searchText') as HTMLInputElement).value;

      request.get({ uri:`http://localhost:3002/search/${encodeURIComponent(searchTerm)}`, json: true}).then((data) => {
        // updates our product views
        this.setState({ errors: [], products: data});

    }).catch((e: any) => {
        this.setState({ errors: [`Couldn\'t make the request for ${searchTerm}`], products: []})
        throw e;
    });

  }
  render() {
      // add a search box with a button.
      // add a list to display results
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <img id="walmart-logo" src={logo} />Search for Walmart products
          </p>
          <form className="form" id="searchForm">
              <input type="text" className="input" id="searchText" placeholder="Backpacks" />
              <br />
              <button id="searchButton" className="button is-info" onClick={this.searchProducts}>Search</button>
          </form>
          { this.state.errors ? <p className="error">{this.state.errors[0]}</p>: null}
          <ul className="results">
              {this.state.products.map( (d: any) => <li key={d.itemId}>
                  <a href={d.productUrl} className="productLink">
                    {d.name}
                    <br />
                    <img src={d.mediumImage} width="300" />
                  </a>
              </li>)}
          </ul>

        </header>
      </div>
    );
  }
}

export default App;
