"use strict";

const success = (res, message, code) => {
  res.status(code).json({
    isSuccess: true,
    message: message,
    responseCode: code,
  });
};
const data = (res, item, code) => {
  res.status(code).json({
    isSuccess: true,
    data: item,
    responseCode: code,
  });
};
const token = (res, item, code) => {
  res.status(code).json({
    isSuccess: true,
    token: item,
    responseCode: code,
  });
};
const failure = (res, error, code) => {
  res.status(code).json({
    isSuccess: false,
    message: error.message ? error.message : error,
    responseCode: code,
  });
};

const page = (res, items, total, page_no, code) => {
  res.status(code).json({
    isSuccess: true,
    data: {
      items: items,
      skip: page_no || 0,
      total: total || items.length,
    },
    responseCode: code,
  });
};

module.exports = {
  success,
  data,
  token,
  failure,
  page,
};
