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

const getDatetimeInReadableFormat = (timestamp) => {
  if (isNaN(timestamp)) return null;
  const date = new Date(timestamp);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export default {
  getTransactionTypeFromCategory,
  getTimestampValueFromString,
  getLabelFromCategory,
  getDatetimeInReadableFormat,
};
