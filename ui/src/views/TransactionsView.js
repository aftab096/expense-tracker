import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTransactionsData } from "../actions/transactions";
import AddTransactionDialogView from "./add-transaction-dialog-view";

import { openDialog } from "../actions/transactions";

const TransactionsView = () => {
  const dispatch = useDispatch();
  const { transactionsData, isDialogOpen } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getTransactionsData());
  }, []);

  const editBtnClickHandler = (transactionId) => {
    console.log(transactionId);
  };

  const handleAddTransaction = () => {
    dispatch(openDialog());
  }

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
        <div className="transactionWrapper" key={data.id}>
          <div className={categoryIconClassName} />
          <div className="transactionLabel">
            <div className="transactionDescription">{data.description}</div>
            <div className="transactionDate">{data.date}</div>
          </div>
          <div className={amountClassName}>{`₹${data.amount}`}</div>
          <div
            className="transactionEditIcon"
            onClick={editBtnClickHandler.bind(this, data.id)}
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
        <button className="addTransactionBtn btn btn-primary btn-sm" onClick={handleAddTransaction}>
          ADD NEW
        </button>
      </div>
    );
  };

  const getAddTransactionDialogView = () => {
    return (<AddTransactionDialogView open={isDialogOpen}/>)
  };

  return (
    <div className="transactionViewContainer">
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
