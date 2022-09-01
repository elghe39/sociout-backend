export function validation(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(404).send({
                success: false,
                error: error.details[0].message
            });
        } else {
            next();
        }
    };
}

export async function validateUserId(req, res, next) {
    const sendId = req.body.sendId
    const receiveId = req.body.userId
    if (sendId == receiveId) {
        res.status(404).send({
            success: false,
            message: 'Can\'t action yourself'
        })
    } else {
        next()
    }
}