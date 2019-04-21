import React, { Component } from 'react';
import './App.css';
import MovieRow from './components/MovieRow.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: 'woman'
    }

    //console.log("This is my initializer")

    //const movies = [
      //{id: 0, poster_src: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "Avengers: Infinity War", overview: "this is the review of the movie"},
      //{id: 1, poster_src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/cezWGskPY5x7GaglTTRN4Fugfb8.jpg", title: "The Avengers", overview: "this is the second review of the movie"},
    //]

    //var movieRows = []
    //movies.forEach((movie) => {
      //console.log(movie.title)
      //const movieRow = <MovieRow movie={movie}/>
      //movieRows.push(movieRow)
    //})

    //this.state = {rows: movieRows}

      this.performSearch(this.state.searchTerm)
    }

    performSearch(searchTerm) {
      console.log("Perform search using")
      let urlString = 'https://api.themoviedb.org/3/search/movie?api_key=5c27811081e9d0437b14f8f5b43b0c23&language=en-US&page=1&include_adult=false&query=' + searchTerm
      fetch(urlString)
        .then(function(response) {
          return response.json()
        })
        .then((searchResults) => {
          console.log(searchResults)
          const results = searchResults.results
          //console.log(results[0])

          var movieRows= []

          results.forEach((movie) => {
            movie.poster_src = "http://image.tmdb.org/t/p/w185" + movie.poster_path
            //console.log(movie.title)
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow)
          })

          this.setState({rows: movieRows})
        })
    }

  searchChangeHandler = (event) => {
    //console.log(event.target.value)
    if (event.target.value === '') {
      this.performSearch(this.state.searchTerm)
    } else {
      this.setState({searchTerm: event.target.value})
      const searchTerm = event.target.value
      this.performSearch(searchTerm)
    }
  }

  render() {
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

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler} placeholder="Enter search term"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;