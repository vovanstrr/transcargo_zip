import React from 'react';
import { Form, Input, Modal, Button, Space, Select } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const units = ["шт", "кг", "см", "л", "м"];

function NewOrder(context) {
  const vesselCode = context.vesselCode;
  const auth = context.auth;
  const [form] = Form.useForm();

  const onSubmit = async () => {
    form
      .validateFields()
      .then(async (vals) => {
        let body = {
          name: vals.name,
          vessel: vesselCode,
          type: vals.type,
          serialnumber: vals.partnum,
          manufacturer: vals.vendor,
          catvessel: vals.catvessel,
          component: vals.component,
          note: vals.note,
          rows: vals.items
        };
        console.log("Going to submit request with body", { body });
        let resp = await axios.post("https://lk.transcargo-group.com/basezip/hs/application", body, { auth });
        console.log({ resp });
        
        //refresh orders list
        let orders = await axios.get(`https://lk.transcargo-group.com/basezip/hs/zayavki/${vesselCode}`, { auth });
        console.log({ orders });
        context.setOrders(orders.data);
        form.resetFields();
        context.setVisible(false);
      })
      .catch((err) => {
        console.error("Validation error: ", err);
      });
    
  }

  return (
    <Modal 
    title="Создать новую заявку"
    visible={context.isVisible()}
    width={1200}
    onOk={() => context.setVisible(false)}
    onCancel={() => context.setVisible(false)}
    footer={[
      <Button key="back" onClick={() => context.setVisible(false)}>
        Отмена
      </Button>,
      <Button key="submit" type="primary" onClick={onSubmit}>
        Создать
      </Button>,
    ]}            
  >
    <Form form={form}>
      <Form.Item
        label="Наименование"
        name="name">
          <Input />
      </Form.Item>
      <Form.Item
        label="Тип оборудования"
        name="type">
          <Input />
      </Form.Item>
      <Form.Item
        label="Серийный номер"
        name="partnum">
          <Input />
      </Form.Item>
      <Form.Item
        label="Производитель"
        name="vendor">
          <Select>
            {context.vendors.map(v => <Option key={v.key} value={v.key}>{v.name}</Option>)}
          </Select>
      </Form.Item>
      <Form.Item
        label="Компонент"
        name="component">
          <Select>
            {context.components.map(v => <Option key={v.key} value={v.key}>{v.name}</Option>)}
          </Select>
      </Form.Item>
      <Form.Item
        label="Категория"
        name="catvessel">
          <Select>
            {context.catvessel.map(v => <Option key={v.key} value={v.key}>{v.name}</Option>)}
          </Select>
      </Form.Item>
      <Form.Item
        label="Примечание"
        name="note">
          <Input.TextArea />
      </Form.Item>


      <Form.List name="items">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(field => (
                <Space key={field.key} align="start">
                  <Form.Item
                    {...field}
                    label="Наименование"
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{ required: false, message: 'Missing name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Код/Артикул"
                    name={[field.name, 'articlenumber']}
                    fieldKey={[field.fieldKey, 'articlenumber']}
                    rules={[{ required: false, message: 'Missing code' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="№ Чертежа"
                    name={[field.name, 'drawing']}
                    fieldKey={[field.fieldKey, 'drawing']}
                    rules={[{ required: false, message: 'Missing number' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Позиция по чертежу"
                    name={[field.name, 'position']}
                    fieldKey={[field.fieldKey, 'position']}
                    rules={[{ required: false, message: 'Missing position' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Количество"
                    name={[field.name, 'quantity']}
                    fieldKey={[field.fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Missing quantity' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    noStyle
                    label="Ед. изм"
                    name={[field.name, 'unit']}
                    fieldKey={[field.fieldKey, 'unit']}
                    rules={[{ required: true, message: 'Missing unit' }]}
                  >
                    <Select>
                      {units.map(item => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Добавить
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form>
  </Modal>          
  );
}

export default NewOrder;
