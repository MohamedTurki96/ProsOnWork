import React from 'react';

import NewFooter from '../home/footer/newFooter';
import HomeHeader from '../home/header/home-header';

import CustomersRoutes from './customers.routes';

const Customers = () => {
  return (
    <>
      {/* <CustomerHeader /> */}
      <HomeHeader type={11}/>
      <CustomersRoutes />
      <NewFooter/>
    </>
  );
};

export default Customers;
