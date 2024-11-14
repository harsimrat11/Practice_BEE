const mongoose = require("mongoose")

const newsletterSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "Please add title"]
        },
        author: {
            type: String,
            require: [true, "Please add author"]
        },
        date: {
            type: String,
            require: [true, "Please add date"]
        },
        imageUrl: {
            type: Number,
            require: [true, "Please add imageUrl"]
            
        },
        discription: {
            type: String,
            require: [true, "Please add newsletter discription"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Newsletter", newsletterSchema)