import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import OrderStatus from './OrderStatus';

function OrderDetails(resp) {
  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Код/Артикул",
      dataIndex: "articlenumber",
      key: "articlenumber"
    },
    {
      title: "№ Чертежа",
      dataIndex: "drawing",
      key: "drawing"
    },
    {
      title: "Позиция по чертежу",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Ед. изм",
      dataIndex: "unit",
      key: "unit"
    }
  ];

  return (
  
    resp.statuskey === '1' 
    ? (<p>
     <OrderStatus 
     number={resp.details.data.header.number} 
     auth={resp.auth} 
     vesselCode={resp.vesselCode} 
     setVisible={v => resp.setVisible(v)} 
     setOrders={(o) => resp.setOrders(o)} 
     />

    <p>Наименование: {resp.details.data.header.name}</p>
    <p>Номер: {resp.details.data.header.number}</p>
    <p>Компонент: {resp.details.data.header.component}</p>
    <p>Серийный номер: {resp.details.data.header.serialnumber}</p>
    <p>Производитель: {resp.details.data.header.manufacturer}</p>
    <p>Примечание: {resp.details.data.header.note}</p>
    <p>Комментарий удаления: {resp.details.data.header.notedelete}</p>
    <Table 
      dataSource={resp.details.data.rows}
      columns={columns}
      pagination={false} 
    />
  </p>) 
  : (<p>
    <p>Наименование: {resp.details.data.header.name}</p>
    <p>Номер: {resp.details.data.header.number}</p>
    <p>Компонент: {resp.details.data.header.component}</p>
    <p>Серийный номер: {resp.details.data.header.serialnumber}</p>
    <p>Производитель: {resp.details.data.header.manufacturer}</p>
    <p>Примечание: {resp.details.data.header.note}</p>
    <p>Комментарий удаления: {resp.details.data.header.notedelete}</p>
    <Table 
      dataSource={resp.details.data.rows}
      columns={columns}
      pagination={false} 
    />
    </p>)
  
  );
}

export default OrderDetails;
