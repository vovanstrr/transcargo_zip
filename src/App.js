/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Main from './Main';
import 'antd/dist/antd.css';

function App() {
  const [orders, setOrders] = useState(null);
  const [auth, setAuth] = useState(null);
  const [vesselCode, setVesselCode] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [components, setComponents] = useState([]);
  const [catvessel, setСatvessel] = useState([]);

  return (
    orders && orders.length > 0
      ? (<Main 
          orders={orders} 
          vendors={vendors} 
          components={components} 
          vesselCode={vesselCode} 
          getAuth={() => auth} 
          setOrders={(o) => setOrders(o)}
          catvessel={catvessel} 
          />)
      : (<LoginForm 
          setOrders={o => setOrders(o)} 
          setAuth={a => setAuth(a)} 
          setVendors={v => setVendors(v)} 
          setComponents={c => setComponents(c)} 
          setVesselCode={vc => setVesselCode(vc)} 
          setСatvessel={vv => setСatvessel(vv)} 
          />)
  );
}

export default App;
