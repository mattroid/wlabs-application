import React, { Component } from 'react';
import request from 'request-promise';
import logo from './logo.svg';
import './App.css';

class App extends Component<{}, { products: any[]}> {
  constructor(props: any) {
      super(props);
      this.state = { products: [] }
      this.searchProducts = this.searchProducts.bind(this);
  }
  searchProducts(e: any){
    // Prevent button click from submitting form
    e.preventDefault();

    const searchTerm = (document.getElementById('searchText') as HTMLInputElement).value;

    request.get({ uri:`http://localhost:3002/search/${searchTerm}`, json: true}).then((data) => {
        // update the store
        this.setState({ products: data});
        data.map((d:any) => console.log(d.name));

    }).catch((e: any) => {
        console.log('caught the error!');
    });

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
          <ul className="results">
              {this.state.products.map( (d: any) => <li key={d.itemId}>
                  <img src={d.imageEntities[0].thumbnailImage} />
                  {d.name}
              </li>)}
          </ul>

        </header>
      </div>
    );
  }
}

export default App;
