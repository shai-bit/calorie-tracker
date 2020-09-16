import React from 'react';

const ConsumptionList = () => {
  return (
    <div className="consumption">
      <div className="consumption__card bkfast">
        <div className="consumption__card--header">
          Breakfast<span>+</span>
        </div>
        <div className="consumption__card--body">
          <ul className="consumption__card--list">
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
            <li className="consumption__card--item">
              Food <span className="calories">100</span>
              <span className="quantity">2</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="consumption__card lunch">
        <div className="consumption__card--header">
          Lunch<span>+</span>
        </div>
        <div className="consumption__card--body"></div>
      </div>
      <div className="consumption__card dinner">
        <div className="consumption__card--header">
          Dinner<span>+</span>
        </div>
        <div className="consumption__card--body"></div>
      </div>
      <div className="consumption__card snacks">
        <div className="consumption__card--header">
          Snacks<span>+</span>
        </div>
        <div className="consumption__card--body"></div>
      </div>
    </div>
  );
};

export default ConsumptionList;
