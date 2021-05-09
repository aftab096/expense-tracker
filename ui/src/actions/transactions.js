import {
  SET_TRANSACTIONS_DATA,
  APPLICATION_ERROR,
  OPEN_ADD_TRANSACTION_DIALOG,
  CLOSE_ADD_TRANSACTION_DIALOG,
} from "./types";

import HomeService from "../services/home-service";
import alertify from "../viewlibraries/notistack/notistack-store";

export const getTransactionsData = () => (dispatch) => {
  return HomeService.getTransactionsData().then(
    (res) => {
      dispatch({
        type: SET_TRANSACTIONS_DATA,
        payload: { transactionsData: res.data.success },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: APPLICATION_ERROR,
      });

      return Promise.reject();
    }
  );
};

export const createNewTransaction = (transactionData) => async (dispatch) => {
  try {
    const res = await HomeService.createTransaction(transactionData);
    alertify.success(res.data.success);
    dispatch({
      type: CLOSE_ADD_TRANSACTION_DIALOG,
    });
    return await Promise.resolve();
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
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
