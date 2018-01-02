import React, { Component } from 'react';
import './Item.css';
import PropTypes from 'prop-types';

class Item extends Component {

  constructor(props) {
    super(props);
    this.orderItemName = props.orderItemName;
    this.orderItemId = props.orderItemId;


    this.state = {
      quantity: props.orderItemQuantity
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ quantity: nextProps.orderItemQuantity })
  }

  render() {
    return (
      <div className="backoffice-order-item-container">
        <div className="backoffice-order-item-name">
          {this.orderItemName} x {this.state.quantity || 0}
        </div>
      </div>
    )
  }
}

Item.propTypes = {
  orderItemId: PropTypes.string,
  orderItemName: PropTypes.string,
  orderItemQuantity: PropTypes.number
};

export default Item;