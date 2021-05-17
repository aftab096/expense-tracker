import { SET_SELECTED_ITEM_ID, SET_TABLE_DATA } from "./types";
import HomeService from "../services/home-service";
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
    dispatch({
      type: SET_TABLE_DATA,
      payload: { tableData: res.data.success },
    });
  } catch (err) {
    alertify.error(err.toString() || "APPLICATION ERROR!");
    return await Promise.reject();
  }
};
