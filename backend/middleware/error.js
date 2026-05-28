module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
    }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(value => value.message);
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};