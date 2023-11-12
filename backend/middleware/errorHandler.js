const errorHandler = (err, req, res, next) => {
  res.json({ err: err.message });
};

module.exports = errorHandler;
