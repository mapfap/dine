import React, { Component } from 'react';
import './Menu.css';
import PropTypes from 'prop-types';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.menuName = props.menuName;
    this.menuId = props.menuId;
    this.addToOrder = props.addToOrder;

    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  handleClickMenu() {
    this.addToOrder({
      id: this.menuId,
      name: this.menuName,
      quantity: 1
    });
  }

  render() {
    return (
      <div onClick={this.handleClickMenu} className="menu-container">
        <div className="menu-name">
        {this.menuName}
        </div>
          <img src="/img/restaurant.svg" className="menu-picture"/>
      </div>
    )
  }
}

Menu.propTypes = {
  menuId: PropTypes.string,
  menuName: PropTypes.string,
  addToOrder: PropTypes.func
};

export default Menu;