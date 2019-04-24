import React, { Component } from 'react';
import './App.css';
import MovieRow from './components/MovieRow.js'

let searchTerm
let incAdult

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      rButton: 'rMovies',
      searchUrls: {
        rMovies: 'https://api.themoviedb.org/3/search/movie?api_key=5c27811081e9d0437b14f8f5b43b0c23&language=en-US&page=1&include_adult=false&region=US&query=',
        rMoviesPop: 'https://api.themoviedb.org/3/movie/popular?api_key=5c27811081e9d0437b14f8f5b43b0c23&language=en-US&page=1',
        rTVShows: 'https://api.themoviedb.org/3/search/tv?api_key=5c27811081e9d0437b14f8f5b43b0c23&language=en-US&page=1&query=',
        rTVShowsPop: 'https://api.themoviedb.org/3/tv/popular?api_key=5c27811081e9d0437b14f8f5b43b0c23&language=en-US&page=1'
      }
    }

    this.performSearch(this.state.searchTerm)
    }

    performSearch(searchTerm) {
      console.log(this.state.searchUrls[this.state.rButton])
      let urlString = ''
      if (searchTerm === '') {
        urlString = this.state.searchUrls[this.state.rButton + 'Pop']
      } else {
        urlString = this.state.searchUrls[this.state.rButton] + searchTerm
      }
      //console.log(this.state.searchUrls[this.state.rButton])

      fetch(urlString)
        .then(function(response) {
          return response.json()
        })
        .then((searchResults) => {
          const results = searchResults.results

          var movieRows= []

          results.forEach((movie) => {
            movie.poster_src = "http://image.tmdb.org/t/p/w185" + movie.poster_path
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow)
          })

          this.setState({rows: movieRows})
        })
    }

  buildSearchUrl = (e) => {
    let value = e.currentTarget.value
    this.setState({rButton: value}, () => 
      {this.performSearch(this.state.searchTerm)
    })
  }

  searchChangeHandler = (event) => {
    //console.log(event.target.value)
    if (event.target.value === ' ') {
      this.setState({searchTerm: ''})
      this.performSearch(this.state.searchTerm)
    } else if (event.target.value === '') {
      this.setState({searchTerm: ''})
      this.performSearch('')
    } else {
      this.setState({searchTerm: event.target.value})
      this.performSearch(event.target.value)
    }
  }

  render() {
    //console.log(document.getElementById('movieFilters').checkbox)
    return (
      <div className="App">

        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="150" src="tmdbIcon.svg"/>
              </td>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <div id="movieFilters" radiobutton={this.state.rButton} checkbox={this.state.cAdult}>
          <input 
            type="radio" 
            name="typeFilter" 
            value="rMovies" 
            onChange={this.buildSearchUrl}
            defaultChecked
          /> Movies 
          <input 
            type="radio" 
            name="typeFilter" 
            value="rTVShows" 
            onChange={this.buildSearchUrl} 
          /> TV Shows
        </div>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} value={this.state.searchTerm} onChange={this.searchChangeHandler} placeholder="Enter search term"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;