/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import OrderDetails from './OrderDetails';
import NewOrder from './NewOrder';
import './index.css';
import {
  Layout, Table, Typography, Button
} from 'antd';

import axios from 'axios';

const {
  Header, Footer, Sider, Content,
} = Layout;
const { Title } = Typography;


function Main(context) {
  const [orderDetails, setOrderDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
// console.log('modalVisible', modalVisible)
async function handleOk (e) {
  //   console.log(e);
    // console.log('ok');
    let orders = await axios.get(`https://lk.transcargo-group.com/basezip/hs/zayavki/${context.vesselCode}`, { auth: context.getAuth() });
      console.log('orders', { orders });
      context.setOrders(orders.data);
      setModalVisible(false);
     };

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип оборудования',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Статус документа',
      dataIndex: 'status',
      key: 'status',

      filters: [
        {
          text: 'Заявка направлена',
          value: 'Заявка направлена',
        },
        {
          text: 'Заявка передана',
          value: 'Заявка передана',
        },
        {
          text: 'Заявка удалена',
          value: 'Заявка удалена',
        },
        {
          text: 'Заказ отслеживание доставки',
          value: 'Заказ отслеживание доставки',
        },
        {
          text: 'Заказ получен',
          value: 'Заказ получен',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,

    },
    {
      title: 'Категория судна',
      dataIndex: 'catvessel',
      key: 'catvessel',

      filters: [
        {
          text: '1 кв. Расходное снабжение',
          value: '1 кв. Расходное снабжение',
        },
        {
          text: '2 кв. Расходное снабжение',
          value: '2 кв. Расходное снабжение',
        },
        {
          text: '3 кв. Расходное снабжение',
          value: '3 кв. Расходное снабжение',
        },
        {
          text: '4 кв. Расходное снабжение',
          value: '4 кв. Расходное снабжение',
        },
      ],
      onFilter: (value, record) => record.catvessel.indexOf(value) === 0,
    },
  ];
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Content>
          <Button style={{marginLeft: '16px'}} type="primary" onClick={() => setModalVisible(true)}>
            Создать заявку
          </Button>
          <Button size="delault" onClick={() => handleOk()}>Обновить</Button>
          <NewOrder 
            setOrders={(o) => context.setOrders(o)}
            setVisible={v => setModalVisible(v)} 
            isVisible={() => modalVisible} 
            vendors={context.vendors} 
            components={context.components} 
            vesselCode={context.vesselCode}
            auth={context.getAuth()}
            catvessel={context.catvessel}
            />
          <Title style={{paddingLeft: '16px'}}>Заявки</Title>
          <Table
            dataSource={context.orders}
            expandedRowRender={ 
              record => {
                return orderDetails && orderDetails[record.key] && 
                (<OrderDetails 
                  details={orderDetails[record.key]} 
                  statuskey={record.statuskey} 
                  auth={context.getAuth()} 
                  vesselCode={context.vesselCode}
                  setOrders={(o) => context.setOrders(o)}
                  setVisible={v => setModalVisible(v)} />)
              }
            }
            onExpand={ 
              async (expanded, record) => {
                if (!expanded) return;
                if (orderDetails[record.key]) return;
                
                let details = await axios.get(`https://lk.transcargo-group.com/basezip/hs/order/${record.key}`, { auth: context.getAuth() });
                console.log({details});
                setOrderDetails(prevState =>({...prevState, [record.key]: details}));
              }
            }
            columns={columns}
            pagination={{ 
              defaultPageSize: '15',
              showSizeChanger: true,
              pageSizeOptions: [15, 25, 50, 100]
            }}
          />
        </Content>
        <Sider />
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Main;
