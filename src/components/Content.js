import React, { Component } from 'react';
import Card from '../components/Card';
import PriceFilter from '../components/PriceFilter';
import '../css/Content.css';
import courses from '../courses.json';
import categories from '../categories.json';

class Content extends Component {
  constructor(props) {
    super(props);

    const prices = courses.map(course => course.price).sort((a, b) => a - b);
    this.min = prices[0];
    this.max = prices[prices.length - 1];

    this.state = {
      courses,
      min: this.min,
      max: this.max,
    };

    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
  }

  onPriceChange(prices) {
    this.setState({
      min: prices[0],
      max: prices[1],
    });
  }

  applyFilter(course) {
    const isTextMatching = () => {
      const searchValue = this.state.searchValue;
      const search = new RegExp(searchValue, 'i');
      return !searchValue || search.test(course.title) || search.test(course.description);
    };

    const isCategoryMatching = () => {
      const isAllEmpty = categories.every(category => !this.state[category.id]);
      const isMatching = categories.some(category => (
        this.state[category.id] && course.category === category.id
      ));
      return isAllEmpty || isMatching;
    };

    const isPriceMatching = () => (
      course.price >= this.state.min && course.price <= this.state.max
    );

    return isTextMatching() && isCategoryMatching() && isPriceMatching();
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
                <label
                  key={category.id}
                  className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
                  htmlFor={category.id}
                >
                  <input
                    type="checkbox"
                    name={category.id}
                    id={category.id}
                    onChange={this.handleChange}
                    className="mdl-checkbox__input"
                  />
                  <span className="mdl-checkbox__label">{category.title}</span>
                </label>
              ))}
            </div>
            <br />
            <PriceFilter min={this.min} max={this.max} onPriceChange={this.onPriceChange} />
          </div>
        </div>
        <div className="mdl-cell mdl-cell--9-col">
          <div className="mdl-grid courses-container">
            {this.state.courses
              .filter(this.applyFilter)
              .map(course => <Card key={course.id} course={course} />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
