import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DialogView from "../viewlibraries/dialog-view";
import _ from "lodash";

import "../styles/transaction-form.css";
import { closeDialog, createNewTransaction } from "../actions/transactions";

const AddTransactionDialogView = (props) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [datetime, setDatetime] = useState("");
  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  const onChangeDesc = (e) => {
    const desc = e.target.value;
    setDesc(desc);
  };

  const onChangeAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const onChangeDatetime = (e) => {
    const datetime = e.target.value;
    setDatetime(datetime);
  };

  const handleCategoryChipClicked = (categoryId) => {
    category === categoryId ? setCategory("") : setCategory(categoryId);
  };

  const handleDialogClose = () => {
    dispatch(closeDialog());
  };

  const handleButtonClicked = (buttonId) => {
    switch (buttonId) {
      case "close":
        handleDialogClose();
        break;

      case "discard":
        setDesc("");
        setAmount("");
        setDatetime("");
        setCategory("");
        break;

      case "save":
        let translationData = { desc, amount, datetime, category };
        dispatch(createNewTransaction(translationData));
        break;

      default:
        break;
    }
  };

  const categoryData = [
    {
      id: "shopping",
      label: "Shopping",
      type: "debit",
    },
    {
      id: "bill",
      label: "Bill & Payments",
      type: "debit",
    },
    {
      id: "food",
      label: "Food",
      type: "debit",
    },
    {
      id: "travel",
      label: "Travel",
      type: "debit",
    },
    {
      id: "entertainment",
      label: "Entertainment",
      type: "debit",
    },
    {
      id: "charity",
      label: "Help & Charity",
      type: "debit",
    },
    {
      id: "other_debit",
      label: "Other costs",
      type: "debit",
    },
    {
      id: "salary",
      label: "Salary",
      type: "credit",
    },
    {
      id: "gift",
      label: "Gift",
      type: "credit",
    },
    {
      id: "other_income",
      label: "Other Incomes",
      type: "credit",
    },
  ];
  const categoryChipsView = _.map(categoryData, (data) => {
    let wrapperClassName = "categoryChipWrapper ";
    if (data.id === category) {
      wrapperClassName += "selected";
    }
    return (
      <div
        className={wrapperClassName}
        onClick={handleCategoryChipClicked.bind(this, data.id)}
      >
        <div className={`categoryChipIcon ${data.id}`} />
        <div className="categoryLebl">{data.label}</div>
      </div>
    );
  });

  const addTransactionForm = (
    <div>
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          className="form-control"
          name="desc"
          value={desc}
          onChange={onChangeDesc}
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={amount}
          onChange={onChangeAmount}
        />
      </div>

      <div className="form-group">
        <label htmlFor="datetime">Date & time</label>
        <input
          classname="form-control"
          type="datetime-local"
          name="datetime"
          value={datetime}
          onChange={onChangeDatetime}
        ></input>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <div className="categoryChipsContainer">{categoryChipsView}</div>
      </div>
    </div>
  );

  const dialogButtons = [
    {
      id: "close",
      label: "CLOSE",
      isRaised: false,
    },
    {
      id: "discard",
      label: "DISACRD",
      isRaised: false,
    },
    {
      id: "save",
      label: "SAVE",
      isRaised: true,
    },
  ];

  return (
    <div className="customDialogContainer">
      <DialogView
        contentClassName="addTransactionDialog"
        open={props.open}
        title={"Add a New Transaction"}
        buttonsData={dialogButtons}
        onClose={handleDialogClose}
        buttonClickHandler={handleButtonClicked}
      >
        {addTransactionForm}
      </DialogView>
    </div>
  );
};

export default AddTransactionDialogView;
