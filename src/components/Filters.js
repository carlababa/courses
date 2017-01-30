import React from 'react';
import PriceFilter from '../components/PriceFilter';
import '../css/Filters.css';

const Filters = props => (
  <div
    className="mdl-cell mdl-cell--3-col
      mdl-cell--12-col-tablet
      mdl-cell--12-col-phone
      filter-container"
  >
    <div className="mdl-grid filter">
      <div className="mdl-cell--12-col mdl-cell--3-col-tablet">
        <h5>Filters</h5>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label search">
          <input
            className="mdl-textfield__input"
            type="text"
            id="search"
            name="searchValue"
            value={props.searchValue}
            onChange={props.handleChange}
          />
          <label className="mdl-textfield__label" htmlFor="search">Search</label>
        </div>
      </div>
      <div className="mdl-cell--12-col mdl-cell--3-col-tablet categories">
        <h6>Filter by categories</h6>
        {props.categories.map(category => (
          <label
            key={category.id}
            className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
            htmlFor={category.id}
          >
            <input
              type="checkbox"
              name={category.id}
              id={category.id}
              onChange={props.handleChange}
              className="mdl-checkbox__input"
            />
            <span className="mdl-checkbox__label">{category.title}</span>
          </label>
        ))}
      </div>
      <PriceFilter
        min={props.min}
        max={props.max}
        onPriceChange={props.onPriceChange}
      />
    </div>
  </div>
);

Filters.defaultProps = {
  searchValue: '',
};

Filters.propTypes = {
  searchValue: React.PropTypes.string,
  categories: React.PropTypes.array.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  onPriceChange: React.PropTypes.func.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default Filters;
