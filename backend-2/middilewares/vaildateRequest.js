const validdateRequest = (requiredFields) => {
    return (req,res, next) => {
        const missingFields = requiredFields.filter(
            (field) => !req.body[fields] || string(req.body[field]).trim() === ''
        );
        if (missingFields.length > 0){
            return res.status(400).json({
                sucess: false,
                error: 'Missing required fields',
                missingFields,
            } );
        }
        if (requestFields.includes('email') && req.body.email){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegax.test(req.body.email)) {
                return res.status(400).json({
                    sucess: false,
                    error: 'Invalid email format',
                });
            }
        }
        next();
    }
};

module.exports = validdateRequest;