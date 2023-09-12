const Product = require("../models/Product");

/**
 * Getting the all products from the tasks.
 * @Route GET api/v1/products
 * @returns {Json}.
 */
const allProduct = async (req, res) => {
  const { features, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  if (features) {
    queryObj.features = features === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join("");
    result = result.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.json({ products, nmbHits: products.length });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product, message: "Product created..." });
};

module.exports = { allProduct, createProduct };
