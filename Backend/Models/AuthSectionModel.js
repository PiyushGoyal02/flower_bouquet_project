const mongoose = require("mongoose")

const AuthModel = new mongoose.Schema(
    {
        username: {
            type: String
        },
        
        email: {
            type: String
        },
    
        gender: {
            type: String
        },
    
        password: {
            type: String
        }
        
    }
)

module.exports = mongoose.model("AuthModel", AuthModel)