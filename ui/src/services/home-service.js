import axios from "axios";
import api_constants from "../tack/constants/api-constants";
import authHeader from "./auth-header";

const getTransactionsData = () => {
  return axios.get(
    api_constants.BASE_PATH + api_constants.GET_LATEST_TRANSACTIONS,
    {
      headers: authHeader(),
    }
  );
};

const createTransaction = (transactionData) => {
  return axios.post(
    api_constants.BASE_PATH + api_constants.TRANSACTION,
    transactionData,
    {
      headers: authHeader(),
    }
  );
};

const getTopCategoriesData = () => {
  return axios.get(api_constants.BASE_PATH + api_constants.GET_TOP_CATEGORIES, {
    headers: authHeader(),
  });
};

const getDataForGraph = (postData) => {
  return axios.post(api_constants.BASE_PATH + api_constants.GRAPH, postData, {
    headers: authHeader(),
  });
};

const getDataForTable = (transactionType) => {
  return axios.post(
    api_constants.BASE_PATH + api_constants.TRANSACTION_LIST,
    { transactionType },
    {
      headers: authHeader(),
    }
  );
};

export default {
  getTransactionsData,
  createTransaction,
  getTopCategoriesData,
  getDataForGraph,
  getDataForTable,
};
