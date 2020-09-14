import React from 'react';

const ConsumptionList = () => {
  return (
    <div className="dashboard__consumption">
      <div className="dashboard__consumption--item bkfast">
        <h3 className="dashboard__consumption--time">Breakfast</h3>
      </div>
      <div className="dashboard__consumption--item lunch">
        <h3 className="dashboard__consumption--time">Lunch</h3>
      </div>
      <div className="dashboard__consumption--item dinner">
        <h3 className="dashboard__consumption--time">Dinner</h3>
      </div>
      <div className="dashboard__consumption--item snacks">
        <h3 className="dashboard__consumption--time">Snacks</h3>
      </div>
    </div>
  );
};

export default ConsumptionList;
