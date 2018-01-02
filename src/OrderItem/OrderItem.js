import React, { Component } from 'react';
import './OrderItem.css';
import PropTypes from 'prop-types';

class OrderItem extends Component {

  constructor(props) {
    super(props);
    this.orderItemName = props.orderItemName;
    this.orderItemId = props.orderItemId;


    this.state = {
      quantity: props.orderItemQuantity
    };

    // this.setState({
    //   quantity: props.orderItemQuantity
    // });

    // this.handleClickOrderItem = this.handleClickOrderItem.bind(this);
  }

  // handleClickOrderItem() {
  //   // {alert(this.orderItemName)}
  //   this.addToOrder({
  //     id: this.orderItemId,
  //     name: this.orderItemName
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({ quantity: nextProps.orderItemQuantity })
  }

  render() {
    return (
      <div className="order-item-container">
        <div className="order-item-name">
        {this.orderItemName} x {this.state.quantity}
        </div>
      </div>
    )
  }
}

OrderItem.propTypes = {
  orderItemId: PropTypes.string,
  orderItemName: PropTypes.string,
  orderItemQuantity: PropTypes.number
};

export default OrderItem;