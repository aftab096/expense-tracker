import {
  SET_TRANSACTIONS_DATA,
  APPLICATION_ERROR,
  OPEN_ADD_TRANSACTION_DIALOG,
  CLOSE_ADD_TRANSACTION_DIALOG,
} from "./types";

import HomeService from "../services/home-service";

export const getTransactionsData = () => (dispatch) => {
  return HomeService.getTransactionsData().then(
    (data) => {
      dispatch({
        type: SET_TRANSACTIONS_DATA,
        payload: { transactionsData: data.data.success },
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

export const createNewTransaction = (transactionData) => (dispatch) => {
  return HomeService.createTransaction(transactionData).then(
    (data) => {
      dispatch({
        type: CLOSE_ADD_TRANSACTION_DIALOG,
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
