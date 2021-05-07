import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

import "../styles/home.css";
import sideNavigationItems from "../tack/sideNavigationItems";

const SidebarNavigationView = () => {
  const { selectedItemId: selectedItemId } = useSelector((state) => state.home);

  const handleSidebarNavigationItemClicked = (itemId) => {
    console.log(itemId);
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
