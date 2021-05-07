import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/home.css";
import SidebarNavigationView from "./SidebarNavigationView";
import TransactionsView from "./TransactionsView";
import Dashboard from "./Dashboard";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { selectedItemId: selectedItemId } = useSelector((state) => state.home);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const getViewAccordingToSelectedNavItem = () => {
    switch (selectedItemId) {

      case 'dashboard':
        return <Dashboard />;

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
