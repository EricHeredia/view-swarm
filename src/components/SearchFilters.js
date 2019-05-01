import React from 'react'

class SearchFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rButton: 'rMulti',
      cAdult: 'false'
    }
  }

  buildSearchUrl = (e) => {
    let value = e.currentTarget.value
    if (value === "rTVShows") {
      document.getElementById("aFilter").disabled = true
      document.getElementById("aFilter").checked = false
    } else {
      document.getElementById("aFilter").disabled = false
    }
    this.setState({rButton: value, cAdult: document.getElementsByName('adultFilter')[0].checked})
  }

    render() {
    //let radios = document.getElementsByName('typeFilter')
    //let value
    //for (var i = 0; i < radios.length; i++) {
    //  if (radios[i].type === 'radio' && radios[i].checked) {
    //    value = radios[i].value
    //  }
    //}
    //console.log(this.state.rButton)
    //console.log(this.state.cAdult)
      return (
        <div id="movieFilters" radiobutton={this.state.rButton} checkbox={this.state.cAdult}>
        <label>
          <input 
            type="radio" 
            name="typeFilter" 
            value="rMovies" 
            onChange={this.buildSearchUrl} 
          /> Movies 
        </label>
        <label>
          <input 
            type="radio" 
            name="typeFilter" 
            value="rTVShows" 
            onChange={this.buildSearchUrl} 
          /> TV Shows
        </label>
          <input 
            type="radio" 
            name="typeFilter" 
            value="rMulti" 
            onChange={this.buildSearchUrl} 
            defaultChecked 
          /> Multi
          <input 
            type="checkbox" 
            name="adultFilter" 
            id="aFilter" 
            value={this.state.cAdult}
            onChange={this.buildSearchUrl}
          /> Adult
        </div>
      )
    }
}

export default SearchFilters