const errorHandler = (err, req, res, next) => {
  console.error('[error]', err.stack || err.message);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((error) => error.message);
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: messages,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid value supplied' });
  }

  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return res.status(409).json({
      success: false,
      error: fields.length ? 'Duplicate value for field: ' + fields.join(', ') : 'Duplicate value',
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  return res.status(statusCode).json({
    success: false,
    error: statusCode >= 500 ? 'Internal server error' : err.message,
  });
};

module.exports = errorHandler;