import {
  SET_SELECTED_ITEM_ID,
  SET_TOP_CATEGORIES_DATA,
  SET_TRANSACTIONS_DATA,
  OPEN_ADD_TRANSACTION_DIALOG,
  CLOSE_ADD_TRANSACTION_DIALOG,
} from "../actions/types";

import sideNavigationItems from "../tack/sideNavigationItems";

const initialState = {
  selectedItemId: sideNavigationItems[0].id,
  transactionsData: [],
  isDialogOpen: false,
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

    default:
      return state;
  }
}
