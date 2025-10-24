const Joi = require("joi");

module.exports.JoiListingSchema = Joi.object({
    listing: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            location: Joi.string().required(),
            country: Joi.string().required(),
            category: Joi.string().valid('Beach','City','Mountain','Lake','Ski','Desert','Cabin','Villa'),
            image: Joi.string().allow("",null),
    }).required()
});

module.exports.JoiReviewSchema= Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});  