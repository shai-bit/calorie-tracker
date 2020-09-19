import React from 'react';

import CurrentDate from './CurrentDate';
import WelcomeUser from './WelcomeUser';
import ConsumptionList from './ConsumptionList';
import FoodFormPopup from './FoodFormPopup';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <FoodFormPopup />
      <WelcomeUser />
      <CurrentDate />
      <ConsumptionList />
    </div>
  );
};

export default Dashboard;
