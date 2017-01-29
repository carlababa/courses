import React from 'react';
import '../css/Card.css';

const Card = props => (
  <div className="mdl-cell mdl-cell--4-col">
    <div className="mdl-card mdl-shadow--2dp card">
      <div className="course-main">
        <img alt={props.course.title} src={props.course.img} />
        <h2 className="mdl-card__title-text">{props.course.title}</h2>
      </div>
      <div className="mdl-card__supporting-text">
        {props.course.description}
      </div>
      <div className="price-container">
        <span className="price-card-text">
          {props.course.price.toFixed(2)} &euro;
        </span>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  course: React.PropTypes.object.isRequired,
};

export default Card;
