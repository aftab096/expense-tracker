import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import "../styles/transaction-form.css";
import DialogView from "../viewlibraries/dialog-view";
import homeUtils from "../utils/home-utils";
import categoriesData from "../tack/categories";
import alertify from "../viewlibraries/notistack/notistack-store";

const TransactionDialogView = (props) => {
  const [desc, setDesc] = useState(props.desc || "");
  const [amount, setAmount] = useState(props.amount || "");
  const [datetime, setDatetime] = useState(props.datetime || "");
  const [category, setCategory] = useState(props.category || "");
  const [isLoading, setIsLoading] = useState(false);

  const [emptyFields, setEmptyFields] = useState();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);

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
    props.onCloseHandler?.();
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
      setIsLoading(false);
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
        setIsLoading(true);
        if (validateFormData()) {
          const transactionData = {
            desc,
            amount,
            datetime: homeUtils.getTimestampValueFromString(datetime),
            category,
            type: homeUtils.getTransactionTypeFromCategory(category),
            userId: currentUser.userId,
          };

          if (_.isFunction(props.onSaveHandler)) {
            props.onSaveHandler(transactionData, props.id);
          } else {
            setIsLoading(false);
          }
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
        isLoading={isLoading}
      >
        {addTransactionForm}
      </DialogView>
    </div>
  );
};

export default TransactionDialogView;
