import { SET_TOP_CATEGORIES_DATA, APPLICATION_ERROR } from "./types";

import HomeService from "../services/home-service";
import homeUtils from "../utils/home-utils";
import alertify from "../viewlibraries/notistack/notistack-store";

export const getTopCategoriesData = () => (dispatch) => {
  return HomeService.getTopCategoriesData().then(
    (res) => {
      const topCategoriesData = res.data.success.map((category) => {
        return {
          id: category.category,
          label: homeUtils.getLabelFromCategory(category?.category),
          totalExpense: category.totalExpense,
        };
      });

      dispatch({
        type: SET_TOP_CATEGORIES_DATA,
        payload: { topCategoriesData: topCategoriesData },
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
