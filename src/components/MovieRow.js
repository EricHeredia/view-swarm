import React from 'react'

class MovieRow extends React.Component {

  viewMovie = () => {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    window.location.href = url 
  }

  render() {
    return  (
      <table key={this.props.movie.id}>
        <tbody>
          <tr>
            <td>
              <img alt="poster" width="80" src={this.props.movie.poster_src}/>
            </td>
            <td>
              <h3>{this.props.movie.title}</h3>
              <p>{this.props.movie.overview}</p>
              <input type="button" onClick={this.viewMovie} value="View"/>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default MovieRow