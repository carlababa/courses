import React, { Component } from 'react';
import Card from '../components/Card';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
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
      const isAllEmpty = () => (categories.every(category => !this.state[category.id]));
      const isMatching = () => (
        categories.some(category => (
          this.state[category.id] && course.category === category.id
        ))
      );
      return isAllEmpty() || isMatching();
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

  renderNotFound() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h4>Sorry, no courses matched your criteria!</h4>
      </div>
    );
  }

  render() {
    const coursesFiltered = this.state.courses.filter(this.applyFilter);
    return (
      <div className="mdl-grid">
        <Filters
          searchValue={this.state.searchValue}
          handleChange={this.handleChange}
          categories={categories}
          min={this.min}
          max={this.max}
          onPriceChange={this.onPriceChange}
        />
        <div className="mdl-cell mdl-cell--9-col">
          <div className="mdl-grid courses-container">
            { coursesFiltered.length
              ? coursesFiltered.map(course => <Card key={course.id} course={course} />)
              : this.renderNotFound()}
          </div>
        </div>
        <div className="mdl-cell mdl-cell--12-col">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Content;
