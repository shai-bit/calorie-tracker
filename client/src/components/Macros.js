import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Macros.css';

const Macros = (props) => {
  const [macrosPercentage, setMacrosPercentage] = useState({
    carbsp: 0,
    fatsp: 0,
    proteinp: 0,
  });
  const { fetchedPosts, macrosSums, setMacrosSum } = props;
  const { carbs, fats, protein } = macrosSums;
  const { carbsp, fatsp, proteinp } = macrosPercentage;
  const chartStyle =
    carbsp === 0 && fatsp === 0 && proteinp === 0
      ? 'gray'
      : `conic-gradient(blue 0%, 
        blue ${carbsp}%, red ${carbsp}%, red ${
          carbsp + fatsp
        }%, green ${proteinp}%, green ${proteinp}%)`;
  if (carbsp === 0 && fatsp === 0 && proteinp === 0) {
  }

  // Clear macrosSum and macrosPercentage if fetchedPosts change and they haven't loaded
  // else get sum
  useEffect(() => {
    if (fetchedPosts === '' || fetchedPosts === null) {
      setMacrosSum({ carbs: 0, fats: 0, protein: 0 });
      setMacrosPercentage({ carbsp: 0, fatsp: 0, proteinp: 0 });
      return;
    }
    getTotalMacros(fetchedPosts, setMacrosSum);
  }, [fetchedPosts, setMacrosSum]);

  // Get macros percentages when macrosSums changes
  useEffect(() => {
    if (fetchedPosts === '' || fetchedPosts === null) return;
    setMacrosPercentage(getPercentage(macrosSums));
  }, [macrosSums]);

  return (
    <div className="macros__container">
      <div className="macros__title">Macros</div>
      <div className="macros__values">
        <div className="macros__element">
          Carbs: {carbs} g ({carbsp}%)
          <div
            style={{
              backgroundColor: 'blue',
              width: `${carbsp}%`,
              height: '4px',
            }}
          ></div>
        </div>
        <div className="macros__element">
          Fats: {fats} g ({fatsp}%)
          <div
            style={{
              backgroundColor: 'red',
              width: `${fatsp}%`,
              height: '4px',
            }}
          ></div>
        </div>
        <div className="macros__element">
          Protein. {protein} g ({proteinp}%)
          <div
            style={{
              backgroundColor: 'green',
              width: `${proteinp}%`,
              height: '4px',
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '220px',
          height: '220px',
          background: `${chartStyle}`,
          borderRadius: '50%',
        }}
      ></div>
    </div>
  );
};

// Iterate through fetched posts and sum their macros into an object 'sum'
// then update redux store
const getTotalMacros = (fetchedPosts, setMacrosSum) => {
  if (fetchedPosts === '') return;
  const sum = { carbs: 0, fats: 0, protein: 0 };
  fetchedPosts.dates[0].posts.forEach((foodItem) => {
    const { quantity, carbs, fats, protein } = foodItem;
    sum.carbs += carbs * quantity;
    sum.fats += fats * quantity;
    sum.protein += protein * quantity;
  });
  setMacrosSum(sum);
};

const getPercentage = (macrosSums) => {
  var total = Object.values(macrosSums).reduce((a, b) => a + b);
  var percentages = { carbsp: 0, fatsp: 0, proteinp: 0 };
  percentages.carbsp =
    Math.round(((macrosSums.carbs * 100) / total) * 100) / 100;
  percentages.fatsp = Math.round(((macrosSums.fats * 100) / total) * 100) / 100;
  percentages.proteinp =
    Math.round(((macrosSums.protein * 100) / total) * 100) / 100;
  console.log(percentages);
  return percentages;
};

const mapStateToProps = (state) => {
  return {
    fetchedPosts: state.fetchedPosts,
    auth: state.auth,
    date: state.date,
    macrosSums: state.macrosSums,
  };
};

export default connect(mapStateToProps, actions)(Macros);
