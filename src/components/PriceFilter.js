import React from 'react';
import { Range, Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const PriceFilterTooltip = props => (
  <Tooltip
    overlay={props.value}
    visible={props.dragging}
    placement="top"
    key={props.index}
  >
    <Handle {...props} />
  </Tooltip>
);

const PriceFilter = props => (
  <div>
    <h6>Filter by price range</h6>
    <Range
      defaultValue={[props.min, props.max]}
      min={props.min}
      max={props.max}
      onChange={props.onPriceChange}
      handle={PriceFilterTooltip}
    />
  </div>
);

PriceFilter.propTypes = {
  onPriceChange: React.PropTypes.func.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

PriceFilterTooltip.propTypes = {
  value: React.PropTypes.number.isRequired,
  dragging: React.PropTypes.bool.isRequired,
  index: React.PropTypes.number.isRequired,
};

export default PriceFilter;
