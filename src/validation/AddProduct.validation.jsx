import Joi from "joi-browser";

const addProductValidation = {
  productName: Joi.string().min(2).max(64).required(),
  productPrice: Joi.number().min(2).max(64).required(),
  category: Joi.string().min(2).max(64).required(),
  productCreator: Joi.string().min(5).max(64).email().required(),
};

export default addProductValidation;
