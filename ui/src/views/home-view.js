import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import tableHeaders from "../tack/data-table-headers";
import "../styles/home.css";
import SidebarNavigationView from "./sidebar-navigation-view";
import TransactionsView from "./transactions-view";
import Dashboard from "./dashboard-view";
import TableView from "./table-view";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { selectedItemId } = useSelector((state) => state.home);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const getViewAccordingToSelectedNavItem = () => {
    switch (selectedItemId) {
      case "dashboard":
        return <Dashboard />;

      case "expenses":
      case "incomes":
        return <TableView headers={tableHeaders} />;

      default:
        return null;
    }
  };

  return (
    <div className="homeContainer">
      <SidebarNavigationView />
      <div className="centralBodyContainer">
        {getViewAccordingToSelectedNavItem()}
      </div>
      <TransactionsView />
    </div>
  );
};

export default Home;
