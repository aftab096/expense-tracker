import { SET_TOP_CATEGORIES_DATA, APPLICATION_ERROR } from "./types";

import HomeService from "../services/home-service";

export const getTopCategoriesData = () => (dispatch) => {
  return HomeService.getTopCategoriesData().then(
    (data) => {
      dispatch({
        type: SET_TOP_CATEGORIES_DATA,
        payload: { topCategoriesData: data.data.success },
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
