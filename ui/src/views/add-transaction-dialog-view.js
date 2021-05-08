import React, { useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";

import "../styles/transaction-form.css";
import DialogView from "../viewlibraries/dialog-view";
import homeUtils from "../utils/home-utils";
import categoriesData from "../tack/categories";
import { closeDialog, createNewTransaction } from "../actions/transactions";
import alertify from "../viewlibraries/notistack/notistack-store";

const AddTransactionDialogView = (props) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState();
  const [datetime, setDatetime] = useState();
  const [category, setCategory] = useState("");

  const [emptyFields, setEmptyFields] = useState();

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

  const validateFormData = () => {
    if (desc && amount && datetime && category) return true;
    else {
      let emptyFields = [];
      if (!desc) emptyFields.push("desc");
      if (!amount) emptyFields.push("amount");
      if (!datetime) emptyFields.push("datetime");
      if (!category) emptyFields.push("category");
      setEmptyFields(emptyFields);
      alertify.error("Please fill the required fields");
    }
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
        if (validateFormData()) {
          const translationData = {
            desc,
            amount,
            datetime: homeUtils.getTimestampValueFromString(datetime),
            category,
            type: homeUtils.getTransactionTypeFromCategory(category),
          };
          dispatch(createNewTransaction(translationData))
          .then(()=>handleDialogClose());
        }
        break;

      default:
        break;
    }
  };

  const categoryChipsView = _.map(categoriesData, (data) => {
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

  const descClassName = _.includes(emptyFields, "desc")
    ? "required"
    : "required hidden";
  const amountClassName = _.includes(emptyFields, "amount")
    ? "required"
    : "required hidden";
  const datetimeClassName = _.includes(emptyFields, "datetime")
    ? "required"
    : "required hidden";
  const categoryClassName = _.includes(emptyFields, "category")
    ? "required"
    : "required hidden";

  const addTransactionForm = (
    <div>
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <div className="inputWrapper">
          <input
            type="text"
            className="form-control"
            name="desc"
            value={desc}
            onChange={onChangeDesc}
          />
          <span className={descClassName}>Required!</span>
        </div>
      </div>

      <div className="form-group amount">
        <label htmlFor="amount">Amount</label>
        <div className="inputWrapper">
          <input
            type="number"
            className="form-control"
            name="amount"
            value={amount}
            onChange={onChangeAmount}
          />
          <span className={amountClassName}>Required!</span>
        </div>
      </div>

      <div className="form-group datetime">
        <label htmlFor="datetime">Date & time</label>
        <div className="inputWrapper">
          <input
            classname="form-control"
            type="datetime-local"
            name="datetime"
            value={datetime}
            onChange={onChangeDatetime}
          />
          <span className={datetimeClassName}>Required!</span>
        </div>
      </div>

      <div className="form-group">
        <div className="inputWrapper">
          <label htmlFor="category">Category</label>
          <span className={categoryClassName}>Required!</span>
        </div>
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
