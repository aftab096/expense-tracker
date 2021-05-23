import {
  SET_TRANSACTIONS_DATA,
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
    return Promise.resolve();
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
    return Promise.reject();
  }
};

export const saveTransaction = (transactionData, t_id) => async (dispatch) => {
  try {
    const res = await HomeService.saveTransaction(transactionData, t_id);
    alertify.success(res.data.success);
    return Promise.resolve();
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
    return Promise.reject();
  }
};