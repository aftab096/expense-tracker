import {
  SET_SELECTED_ITEM_ID,
  SET_TOP_CATEGORIES_DATA,
  SET_TRANSACTIONS_DATA,
  OPEN_ADD_TRANSACTION_DIALOG,
  CLOSE_ADD_TRANSACTION_DIALOG,
  SET_GRAPH_DATA,
  SET_GRAPH_OPTION,
  SET_TABLE_DATA,
} from "../actions/types";

import sideNavigationItems from "../tack/sideNavigationItems";

const initialState = {
  selectedItemId: sideNavigationItems[0].id,
  transactionsData: [],
  isDialogOpen: false,
  selectedGraphOption: "",
  graphData: [],
  totalExpense: 0,
  tableData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SELECTED_ITEM_ID:
      return {
        ...state,
        selectedItemId: payload.selectedItemId,
      };

    case SET_TRANSACTIONS_DATA:
      return {
        ...state,
        transactionsData: payload.transactionsData,
      };

    case SET_TOP_CATEGORIES_DATA:
      return {
        ...state,
        topCategoriesData: payload.topCategoriesData,
      };

    case OPEN_ADD_TRANSACTION_DIALOG:
      return {
        ...state,
        isDialogOpen: true,
      };

    case CLOSE_ADD_TRANSACTION_DIALOG:
      return {
        ...state,
        isDialogOpen: false,
      };

    case SET_GRAPH_DATA:
      return {
        ...state,
        graphData: payload.data,
        totalExpense: payload.totalExpense,
      };

    case SET_GRAPH_OPTION:
      return {
        ...state,
        selectedGraphOption: payload.id,
      };

    case SET_TABLE_DATA:
      return {
        ...state,
        tableData: payload.tableData,
      };

    default:
      return state;
  }
}
