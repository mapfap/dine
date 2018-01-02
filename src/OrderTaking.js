import React, { Component } from 'react';
// import logo from './logo.svg';
import './OrderTaking.css';
import Menu from './Menu/Menu';
import OrderItem from './OrderItem/OrderItem';
import BackOffice from './BackOffice'
import config from './Config/config.js';
import firebase from 'firebase';
import 'firebase/firestore';
import swal from 'sweetalert2'
import Spinner from 'react-spinkit';

class OrderTaking extends Component {

  constructor(props) {
    super(props);

    firebase.initializeApp(config);
    this.db = firebase.firestore();
    // this.db = this.app.database().ref().child('menus')

    this.state = {
      menus: [],
      order: [],
      forceHideConfirmButton: false,
      isLoading: true
    };

    this.getMenus = this.getMenus.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.handleConfirmOrder = this.handleConfirmOrder.bind(this);
  }

  handleConfirmOrder() {
    this.setState({
      forceHideConfirmButton: true,
      isLoading: true
    });

    let that = this;
    this.db.collection("orders").doc().set({
      createdAt: new Date(),
      items: this.state.order
    })
    .then(function () {
      swal(
        'สั่งอาหารเรียบร้อย',
        '',
        'success'
      );
      that.setState({
        order: [],
        isLoading: false
      });
      
    })
    .catch(function (error) {
      swal(
        'บางอย่างผิดพลาด',
        'โปรดลองอีกครั้ง',
        'error'
      );
      console.log(error);
      this.setState({
        isLoading: false
      });
    });


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
          menus: dbMenus,
          isLoading: false
        });

      })
      .catch(function (error) {
        swal(
          'บางอย่างผิดพลาด',
          'โปรดลองอีกครั้ง',
          'error'
        );
        console.log(error);
      });
  }

  render() {
    return (
      <div className="menus-container">
        {this.state.isLoading && <Spinner className='spinner' name='ball-pulse-sync' />}
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
            (this.state.order.length === 0) ? (<div className="empty-list">ยังไม่มีรายการอาหารที่สั่ง</div>) : (!this.state.forceHideConfirmButton && <div onClick={this.handleConfirmOrder} className="confirm-order-button">ส่งรายการ</div>)
          }
        </div>
      </div>
    )
  }
}

export default OrderTaking;
