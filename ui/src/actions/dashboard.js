import { SET_TOP_CATEGORIES_DATA, SET_GRAPH_DATA } from "./types";

import HomeService from "../services/home-service";
import homeUtils from "../utils/home-utils";
import alertify from "../viewlibraries/notistack/notistack-store";
import graphOptions from "../tack/graphOptions";
import _ from "lodash";

export const getTopCategoriesData = () => async (dispatch) => {
  try {
    const res = await HomeService.getTopCategoriesData();
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
    return await Promise.resolve();
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
    return await Promise.reject();
  }
};

export const getDataForGraph = (optionId) => async (dispatch) => {
  try {
    optionId = optionId || graphOptions[0].id;
    const duration = _.find(graphOptions, { id: optionId }).duration;
    const postData = { duration };
    const res = await HomeService.getDataForGraph(postData);
    const data = [{
      id: "Expenses",
      color: "hsl(135, 70%, 50%)",
      data: res.data.success,
    }];

    dispatch({
      type: SET_GRAPH_DATA,
      payload: { data: data },
    });
  } catch (error) {
    alertify.error(error.toString() || "APPLICATION ERROR!");
    return await Promise.reject();
  }
};
