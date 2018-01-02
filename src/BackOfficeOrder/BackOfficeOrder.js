import React, { Component } from 'react';
import './BackOfficeOrder.css';
import PropTypes from 'prop-types';
import Item from './Item/Item'

class BackOfficeOrder extends Component {

  constructor(props) {
    super(props);
    // this.orderItemName = props.orderItemName;
    //his.orderItemId = props.orderItemId;
    this.createdAt = props.createdAt;
    this.items = props.items;

    // this.state = {
    //   quantity: props.orderItemQuantity
    // };

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

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ quantity: nextProps.orderItemQuantity })
  // }

  render() {
    return (
      <div className="backoffice-order-container">
        <div className="backoffice-order-name">
          {this.createdAt}
        </div>
        {this.items.map((item) => {
          return (<Item orderItemName={item.name} orderItemQuantity={item.quantity} />);
        })}
      </div>
    )
  }
}

BackOfficeOrder.propTypes = {
  createdAt: PropTypes.any,
  items: PropTypes.any
  // orderItemName: PropTypes.string,
  // orderItemQuantity: PropTypes.number
};

export default BackOfficeOrder;