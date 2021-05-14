import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

import { getTransactionsData } from "../actions/transactions";
import AddTransactionDialogView from "./add-transaction-dialog-view";

import { openDialog } from "../actions/transactions";

const TransactionsView = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { transactionsData, isDialogOpen } = useSelector((state) => state.home);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTransactionsData()).then(() => setIsLoading(false));
  }, []);

  const editBtnClickHandler = (transactionId) => {
    console.log(transactionId);
  };

  const handleAddTransaction = () => {
    dispatch(openDialog());
  };

  const getDateAndTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    return `${dateObject.toDateString()} ${
      dateObject.toTimeString().split(" ")[0]
    }`;
  };

  const getTransactionsHeaderView = () => {
    return (
      <div className="transactionsHeader">
        <div className="transactionsIcon" />
        <div className="transactionsLabel">Your Transaction History</div>
      </div>
    );
  };

  const getTransactionsViewView = () => {
    let transactionsView = [];
    _.forEach(transactionsData, (data) => {
      let categoryIconClassName = `categoryIcon ${data.category}`;
      let amountClassName = `amount ${data.type}`;
      let transactionView = (
        <div className="transactionWrapper" key={data.t_id}>
          <div className={categoryIconClassName} />
          <div className="transactionLabel" title={data.description}>
            <div className="transactionDescription">{data.description}</div>
            <div className="transactionDate">
              {getDateAndTime(data.datetime)}
            </div>
          </div>
          <div className={amountClassName}>{`₹${data.amount}`}</div>
          <div
            className="transactionEditIcon"
            onClick={editBtnClickHandler.bind(this, data.t_id)}
          />
        </div>
      );

      transactionsView.push(transactionView);
    });

    return transactionsView;
  };

  const getAddTransactionView = () => {
    return (
      <div className="addTransactionWrapper">
        <div className="walletIcon" />
        <div className="addTransactionLabel">Missing Transaction?</div>
        <button
          className="addTransactionBtn btn btn-primary btn-sm"
          onClick={handleAddTransaction}
        >
          ADD NEW
        </button>
      </div>
    );
  };

  const getAddTransactionDialogView = () => {
    return <AddTransactionDialogView open={isDialogOpen} />;
  };

  const getLoaderView = () => {
    return (
      <div className="loaderContainer">
        <ReactLoading type="bubbles" color="#111" />
      </div>
    );
  };

  return (
    <div className="transactionViewContainer">
      {isLoading && getLoaderView()}
      {getTransactionsHeaderView()}
      <div className="transactionsViewMainContainer">
        {getTransactionsViewView()}
      </div>
      {getAddTransactionView()}
      {isDialogOpen && getAddTransactionDialogView()}
    </div>
  );
};

export default TransactionsView;
