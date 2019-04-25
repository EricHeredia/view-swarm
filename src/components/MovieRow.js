import React from 'react'

class MovieRow extends React.Component {

  viewMovie = () => {
    let movOrTv = document.getElementsByName('typeFilter')[0].checked ? 'movie':'tv'
    const url = "https://www.themoviedb.org/" + movOrTv + "/" + this.props.movie.id
    window.location.href = url 
  }

  render() {
    let toShorten = () => {
      let fullOver = this.props.movie.overview
      let shortOver = fullOver.slice(0, 150) + "..."
      if (this.props.movie.overview.length > 150) {
        return shortOver
      } else {
        return fullOver
      }
    }
    return  (
      <table key={this.props.movie.id} id="movieData" onClick={this.viewMovie}>
        <tbody>
          <tr>
            <td width="120">
              <img alt="poster" width="120" src={this.props.movie.poster_src}/>
            </td>
            <td>
              <h3>{this.props.movie.title ? this.props.movie.title : this.props.movie.name}</h3>
              <p>{toShorten()}</p>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default MovieRow