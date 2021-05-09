import _ from "lodash";
import categoriesData from "../tack/categories";

const getTransactionTypeFromCategory = (category) => {
  const categoryData = _.find(categoriesData, { id: category });
  return categoryData.type;
};

const getLabelFromCategory = (category) => {
  const categoryData = _.find(categoriesData, { id: category });
  return categoryData.label;
};

const getTimestampValueFromString = (datetimeString) => {
  if (datetimeString) return new Date(datetimeString).valueOf();
  return null;
};

export default {
  getTransactionTypeFromCategory,
  getTimestampValueFromString,
  getLabelFromCategory,
};
