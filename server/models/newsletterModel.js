const mongoose = require("mongoose")

const newsLetterSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require:[true,"Please add title"],

        },
        email: {
            type: String,
            require:[true,"Please add email"],
        },
        author: {
            type: String,
            require:[true,"Please add author"],
        },
        date: {
            type: String,
            require:[true,"Please add date"],
        },
        imageURL: {
            type: String,
            require:[true,"Please add imageURL"],
        },
        description: {
            type: String,
            require:[true,"Please add Newsletter Description"],
        }
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("NewsLetter", NewsLetterSchema);