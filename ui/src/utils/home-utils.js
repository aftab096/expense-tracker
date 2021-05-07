import _ from "lodash";
import categoriesData from "../tack/categories";

const getTransactionTypeFromCategory = (category) => {
    const categoryData = _.find(categoriesData, {id:category});
    return categoryData.type;
};

export default {
  getTransactionTypeFromCategory,
};
