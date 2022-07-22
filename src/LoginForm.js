/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Form, Input, Button, Row,
} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import Logo from './img/logo_black.png';
import { render } from '@testing-library/react';

function LoginForm(context) {

  const [credsError, setCredsError] = useState(null);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const usernameRequiredRules = [
    {
      required: true,
      message: 'Введи имя!',
    },
  ];

  const passwordRequiredRules = [
    {
      required: true,
      message: 'Введи свой пароль!',
    },
  ];

  const onSubmitButtonClick = async (auth) => {
    try {
      let profile = await axios.get(`https://lk.transcargo-group.com/basezip/hs/profile/${auth.username}`, { auth });
      // console.log({ profile });
      let vesselCode = profile.data[0] && profile.data[0].Vessel;
      context.setVesselCode(vesselCode);

      let orders = await axios.get(`https://lk.transcargo-group.com/basezip/hs/zayavki/${vesselCode}`, { auth });
      // console.log({ orders });
      context.setOrders(orders.data);

      let vendors = await axios.get(`https://lk.transcargo-group.com/basezip/hs/guide/manufacturer`, { auth });
      // console.log({ vendors });
      context.setVendors(vendors.data);

      let components = await axios.get(`https://lk.transcargo-group.com/basezip/hs/guide/component`, { auth });
      // console.log({ components });
      context.setComponents(components.data);

      let catvessel = await axios.get(`https://lk.transcargo-group.com/basezip/hs/guide/catvessel`, { auth });
      console.log('catvessel', { catvessel });
      context.setСatvessel(catvessel.data);
    } catch (e) {
      console.error(e);
      setCredsError('Неправильный логин или пароль');
      return;
    }
    context.setAuth(auth);
    setCredsError(null);
  };

  return ( <div >
          <img className='pic' src={Logo} alt='logo'/>
      
       <Row type="flex" justify="center" align="middle" style={{ minHeight: '50vh' }}>
              
      <Form
        {...layout}
        name="basic"
        onFinish={onSubmitButtonClick}
      >
        <Form.Item
          label="Имя"
          name="username"
          rules={usernameRequiredRules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={passwordRequiredRules}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          {credsError && credsError.length > 0 && (<p>{credsError}</p>)}
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Row>
    </div> 
  );
}

export default LoginForm;
