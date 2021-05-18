import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import {
  getTopCategoriesData,
  getDataForGraph,
  changeGraphOption,
} from "../actions/dashboard-action";
import GraphContainerView from "./graph-container-view";
import graphOptions from "../tack/graphOptions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { topCategoriesData, selectedGraphOption, graphData, totalExpense } =
    useSelector((state) => state.home);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTopCategoriesData());
    dispatch(getDataForGraph(selectedGraphOption)).then(() =>
      setIsLoading(false)
    );
  }, []);

  const graphHeaderRightSection = `Total expense: ₹${totalExpense}`;

  const handleGraphOptionChanged = (optionId) => {
    dispatch(changeGraphOption(optionId));
    dispatch(getDataForGraph(optionId));
  };

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

  const getLoaderView = () => {
    return (
      <div className="loaderContainer">
        <ReactLoading type="bubbles" color="#111" />
      </div>
    );
  };

  return (
    <div className="dashboardContainer">
      {isLoading && getLoaderView()}
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
