import React from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

import "../styles/home.css";
import sideNavigationItems from "../tack/sideNavigationItems";
import { setSelectedItemId } from "../actions/home-action";

const SidebarNavigationView = () => {
  const { selectedItemId: selectedItemId } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleSidebarNavigationItemClicked = (itemId) => {
    dispatch(setSelectedItemId(itemId));
  };

  const getSidebarNavigationView = () => {
    let sideNavigationItemsView = _.map(sideNavigationItems, (item) => {
      let iconClassName = `sideNavIcon ${item.iconClassName}`;
      let itemClassName = "sideNavigationItem";
      if (selectedItemId === item.id) {
        itemClassName += " selected";
      }

      return (
        <div
          className={itemClassName}
          onClick={handleSidebarNavigationItemClicked.bind(this, item.id)}
          key={item.id}
        >
          <div className={iconClassName} />
          <div className="sideNavigationLabel">{item.label}</div>
        </div>
      );
    });

    return sideNavigationItemsView;
  };

  return (
    <div className="sidebarNavigationContainer">
      {getSidebarNavigationView()}
    </div>
  );
};

export default SidebarNavigationView;
