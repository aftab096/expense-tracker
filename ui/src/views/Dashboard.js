import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { getTopCategoriesData, getDataForGraph, changeGraphOption } from "../actions/dashboard";
import GraphContainerView from "./graph-container-view";
import graphOptions from "../tack/graphOptions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { topCategoriesData, selectedGraphOption, graphData} = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getTopCategoriesData());
    dispatch(getDataForGraph(selectedGraphOption))
  }, []);

  const handleGraphOptionChanged = (optionId) => {
    dispatch(changeGraphOption(optionId));
    dispatch(getDataForGraph(optionId));
  }

  const getTopCategoriesView = () => {
    let topCategoriesCards = [];
    _.forEach(topCategoriesData, (categoryData) => {
      const card = (
        <div className="categoryCardView">
          <div className="categoryCardWrapper">
            <div className="categoryLabel">
              <span style={{ color: "red", fontWeight: 500, fontSize: "20px" }}>
                •
              </span>
              {categoryData.label}
            </div>
            <div className="totalExpense">{`₹ ${categoryData.totalExpense}`}</div>
          </div>
          <div className={`categoryCardIcon ${categoryData.id}`} />
        </div>
      );

      topCategoriesCards.push(card);
    });
    return (
      <div className="topCategoriesCardsContainer">{topCategoriesCards}</div>
    );
  };

  const totalCost = 9000;
  const graphHeaderRightSection = `Total expense: ₹${totalCost}`;

  return (
    <div className="dashboardContainer">
      {getTopCategoriesView()}
      <GraphContainerView
        graphOptions={graphOptions}
        graphHeaderRightSection={graphHeaderRightSection}
        optionChangeHandler={handleGraphOptionChanged}
        selectedOption={selectedGraphOption || graphOptions[0]?.id}
        data={graphData}
      />
    </div>
  );
};

export default Dashboard;
