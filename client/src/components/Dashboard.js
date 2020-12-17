import React from 'react';

import CurrentDate from './CurrentDate';
import WelcomeUser from './WelcomeUser';
import ConsumptionList from './ConsumptionList';
import FoodFormPopup from './FoodFormPopup';
import DaysTotal from './DaysTotal';
import Macros from './Macros';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <FoodFormPopup />
      <WelcomeUser />
      <CurrentDate />
      <DaysTotal />
      <ConsumptionList />
      <Macros />
    </div>
  );
};

export default Dashboard;
