import React, { useState }  from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
//extends React.Component
// class OrderStatus extends React.Component{
function OrderStatus (order) {    
//state = { visible: false };
  const [isModalVisible, setIsModalVisible] = useState(false);  
      
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleOk = async () => {
    const auth = order.auth;
    let body = {
      code: order.number,
      vessel: order.vesselCode
    };
    const vesselCode = order.vesselCode;
    console.log('auth', auth)
    let resp = await axios.post("https://lk.transcargo-group.com/basezip/hs/orderstatus", body, { auth });
    console.log(resp)
        
    let newOrders = await axios.get(`https://lk.transcargo-group.com/basezip/hs/zayavki/${vesselCode}`, { auth });
    console.log('orders new', { newOrders });
    console.log('order', order);
    console.log('neworder.data', newOrders.data);
    
    // fetch(`https://lk.transcargo-group.com/basezip/hs/zayavki/${order.vesselCode}`, order.auth )
    //   .then((response) => response.json())
    //   .then((myJson) => order.setOrders(myJson))
    
    
    order.setOrders(newOrders.data);
    order.setVisible(false);
          
    setIsModalVisible(false);
  };

  const handleCancel = e => {
    setIsModalVisible(false);  
    console.log('cancel');
    };


// showModal = () => {
//       this.setState({
//         visible: true,  // отображение модального окна при клике на кнопку
//       });
//     };
  
//     handleOk = async (e) => {
         
//     //   console.log(this.props.number);
     
         
//     const auth = this.props.auth;
//     // console.log("auth", {auth});
//     // req.then(async (vals) => {
//         let body = {
//           code: this.props.number
//         };
//         console.log("body", { body });
//         let resp = await axios.post("https://lk.transcargo-group.com/basezip/hs/orderstatus", body, { auth });
        
//         // let resp = await axios.post("http://192.168.1.124:8080/Uchetzip/hs/orderstatus", body);
//         console.log({ resp });
        
//         //refresh orders list
//         let orders = await axios.get(`https://lk.transcargo-group.com/basezip/hs/zayavki/${this.props.vesselCode}`, { auth });
                
//         console.log({ orders });
//         this.props.setOrders(orders.data);
//         // form.resetFields();
//         this.props.setVisible(false);
//       // })
//       // .catch((err) => {
//       //   console.error("Validation error: ", err);
//       // });
  
//       this.setState({
//         visible: false,
//       });
//     };
  
//     handleCancel = e => {
//     //   console.log(e);
//       console.log('cancel');
//       this.setState({
//         visible: false,
//       });
//     };
  
  //  render() {
      return (
        <>
          <Button type="primary" onClick={showModal}>
            Подтвердить получение
          </Button>
          <Modal
            title="Подтверждение получения заказа"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Заказ получен, подтверждаю.</p>
            
          </Modal>
        </>
      );
   // }
  }

  export default OrderStatus;
