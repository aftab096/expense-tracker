import {
  SET_TRANSACTIONS_DATA,
  OPEN_ADD_TRANSACTION_DIALOG,
  CLOSE_ADD_TRANSACTION_DIALOG,
} from "./types";

import HomeService from "../services/home-service";
import alertify from "../viewlibraries/notistack/notistack-store";

export const getTransactionsData = () => async (dispatch) => {
  try {
    const res = await HomeService.getTransactionsData();
    dispatch({
      type: SET_TRANSACTIONS_DATA,
      payload: { transactionsData: res.data.success },
    });
    return await Promise.resolve();
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
    return await Promise.reject();
  }
};

export const createNewTransaction = (transactionData) => async (dispatch) => {
  try {
    const res = await HomeService.createTransaction(transactionData);
    alertify.success(res.data.success);
    dispatch({
      type: CLOSE_ADD_TRANSACTION_DIALOG,
    });
    return Promise.resolve();
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
    return Promise.reject();
  }
};

export const openDialog = () => (dispatch) => {
  dispatch({
    type: OPEN_ADD_TRANSACTION_DIALOG,
  });
};

export const closeDialog = () => (dispatch) => {
  dispatch({
    type: CLOSE_ADD_TRANSACTION_DIALOG,
  });
};
