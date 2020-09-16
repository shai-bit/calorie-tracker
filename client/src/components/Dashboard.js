import React from 'react';
import { useLocation } from 'react-router-dom';

import CurrentDate from './CurrentDate';
import WelcomeUser from './WelcomeUser';
import ConsumptionList from './ConsumptionList';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <WelcomeUser />
      <CurrentDate />
      <ConsumptionList />
    </div>
  );
};

export default Dashboard;
