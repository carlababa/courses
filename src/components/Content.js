import React, { Component } from 'react';
import Card from '../components/Card.js';
import '../css/Content.css';
import courses from '../courses.json';
import categories from '../categories.json';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses,
    };
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(course) {
    const isTextMatching = () => {
      const regexValue = new RegExp(this.state.searchValue, "i");
      return !this.state.searchValue || regexValue.test(course.title) || regexValue.test(course.description);
    };

    const isCategoryMatching = () => {
      const isAllEmpty = categories.every(category => !this.state[category.id]);
      const isMatching = categories.some(category => this.state[category.id] && course.category === category.id);
      return isAllEmpty || isMatching;
    };

    return isTextMatching() && isCategoryMatching();
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--3-col filter-container">
          <div className="testing">
            <h5>Filters</h5>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input
                className="mdl-textfield__input"
                type="text"
                id="search"
                name="searchValue"
                value={this.state.searchValue}
                onChange={this.handleChange}
              />
              <label className="mdl-textfield__label" htmlFor="search">Search</label>
            </div>
            <div className="categories">
              <h6>Filter by categories</h6>
              {categories.map(category => (
                <label key={category.id} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={category.id}>
                  <input type="checkbox" name={category.id} id={category.id} onChange={this.handleChange} className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">{category.title}</span>
                </label>
              ))}
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
