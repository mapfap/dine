import React, { Component } from 'react';

import firebase from 'firebase';
import 'firebase/firestore';
import config from './Config/config.js';
import BackOfficeOrder from './BackOfficeOrder/BackOfficeOrder'
import './BackOffice.css'

class BackOffice extends Component {

  constructor(props) {
    super(props);

    firebase.initializeApp(config);
    this.db = firebase.firestore();

    this.state = {
      orders: []
    };

    this.getOrders = this.getOrders.bind(this);
  }

  componentWillMount() {
    this.getOrders();
  }

  getOrders() {
    let that = this;
    let dbOrders = [];
    this.db.collection("orders").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (order) {
        // let orderItems = [];
        // that.db.collection("orders").doc(order.id).collection("items").get()
        // .then(function (querySnapshot) {
        //   querySnapshot.forEach(function (item) {
        //     orderItems.push({
        //       id: item.id,
        //       name: item.data().name,
        //       quantity: item.data().quantity
        //     })
        //   });

        dbOrders.push({
          id: order.id,
          createdAt: order.data().createdAt.toString(),
          items: order.data().items
        });
      });
      
      that.setState({
        orders: dbOrders
      });

      // console.log(that.state.orders);
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  }

  render() {
    return (
      <div className="orders-container">  
        {/* {console.log(this.state.orders)} */}
        {this.state.orders.map((order) => {
          return (<BackOfficeOrder createdAt={order.createdAt} items={order.items}  key={order.id}/>);
        })}

      </div>
    );
  }
}

export default BackOffice;
