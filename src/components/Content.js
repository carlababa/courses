import React, { Component } from 'react';
import Card from '../components/Card.js';
import '../css/Content.css';
import courses from '../courses.json';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses,
    };

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(course) {
    const regexValue = new RegExp(this.state.searchValue, "i");
    return !this.state.searchValue || regexValue.test(course.title) || regexValue.test(course.description);
  }

  handleChange(filter, e) {
    this.setState({
      [filter]: e.target.value,
    });
  }

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--3-col filter-container">
          <div className="testing">
            <h5>Filters</h5>
            <form action="#">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id="search"
                  value={this.state.searchValue}
                  onChange={this.handleChange.bind(this, 'searchValue')}
                />
                <label className="mdl-textfield__label" htmlFor="search">Search</label>
              </div>
            </form>
            <div className="categories">
              <h6>Filter by categories</h6>

              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" />
                <span className="mdl-checkbox__label">History</span>
              </label>

              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-2">
                <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input" />
                <span className="mdl-checkbox__label">Language</span>
              </label>

              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-3">
                <input type="checkbox" id="checkbox-3" className="mdl-checkbox__input" />
                <span className="mdl-checkbox__label">Calculus</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--9-col">
          <div className="mdl-grid courses-container">
            {this.state.courses.filter(this.applyFilter).map(course => <Card key={course.id} course={course}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
