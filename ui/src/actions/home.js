import { SET_SELECTED_ITEM_ID, SET_TABLE_DATA } from "./types";
import HomeService from "../services/home-service";
import HomeUtils from "../utils/home-utils";
import alertify from "../viewlibraries/notistack/notistack-store";

export const setSelectedItemId = (selectedItemId) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_ITEM_ID,
    payload: { selectedItemId },
  });
};

export const setTableData = (selectedItemId) => async (dispatch) => {
  const transactionType = selectedItemId === "expenses" ? "debit" : "credit";
  try {
    const res = await HomeService.getDataForTable(transactionType);
    let tableData = res.data.success;
    tableData = tableData.map(row => {
      row.amount = `₹${row.amount}`;
      row.datetime = HomeUtils.getDatetimeInReadableFormat(row.datetime);
      row.category = HomeUtils.getLabelFromCategory(row.category);
      return row;
    })
    dispatch({
      type: SET_TABLE_DATA,
      payload: { tableData },
    });
  } catch (err) {
    alertify.error(err.toString() || "APPLICATION ERROR!");
    return await Promise.reject();
  }
};
