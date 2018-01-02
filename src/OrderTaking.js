import React, { Component } from 'react';
// import logo from './logo.svg';
import './OrderTaking.css';
import Menu from './Menu/Menu';
import OrderItem from './OrderItem/OrderItem';
import BackOffice from './BackOffice'
import config from './Config/config.js';
import firebase from 'firebase';
import 'firebase/firestore';


class OrderTaking extends Component {

  constructor(props) {
    super(props);

    firebase.initializeApp(config);
    this.db = firebase.firestore();
    // this.db = this.app.database().ref().child('menus')

    this.state = {
      menus: [],
      order: []
    };

    this.getMenus = this.getMenus.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  addToOrder(orderItem) {
    let currentOrder = this.state.order;

    let foundItem = false;
    for (let i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i].id === orderItem.id) {
        currentOrder[i].quantity = currentOrder[i].quantity + 1;
        foundItem = true;
        break;
      }
    }


    if (!foundItem) {
      currentOrder.push(orderItem);
    }

    this.setState({
      order: currentOrder
    });
  }

  componentWillMount() {
    this.getMenus();
  }

  getMenus() {
    let that = this;
    let dbMenus = [];
    this.db.collection("menus").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          dbMenus.push({
            id: doc.id,
            name: doc.data().name
          })
        });

        that.setState({
          menus: dbMenus
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <div className="menus-container">
        <h1>สั่งอาหาร</h1>
        <div className="menus-wrapper">
          {this.state.menus.map(menu => {
            return (<Menu menuName={menu.name} menuId={menu.id} key={menu.id} addToOrder={this.addToOrder} />);
          })}
        </div>
        <div className="order-wrapper">
          <h3>อาหารที่สั่ง</h3>
          {this.state.order.map(orderItem => {
            return (<OrderItem orderItemName={orderItem.name} orderItemId={orderItem.id} key={orderItem.id} orderItemQuantity={orderItem.quantity} />);
          })}
          {
            (this.state.order.length === 0) ? (<div className="empty-list">ยังไม่มีรายการอาหารที่สั่ง</div>) : ""
          }
        </div>
      </div>
    )
  }
}

export default OrderTaking;
