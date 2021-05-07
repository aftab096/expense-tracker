import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { getTopCategoriesData } from "../actions/dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { topCategoriesData } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getTopCategoriesData());
  }, []);

  const getTopCategoriesView = () => {
    let topCategoriesCards = [];
    _.forEach(topCategoriesData, (categoryData) => {
      const card = (
        <div className="categoryCardView">
          <div className="categoryCardWrapper">
            <div className="categoryLabel">
              <span style={{ color: "red", fontWeight: 500, fontSize: "20px"}}>
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

  return <div className="dashboardContainer">{getTopCategoriesView()}</div>;
};

export default Dashboard;
