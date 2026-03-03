const AuthModel = require("../Models/AuthSectionModel")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

// Signup Here
exports.Signup = async(req, res) => {
    try{
        const { username, email, gender, password } = req.body;

        if (!username || !email || !gender || !password) {
            return res.status(401).json(
                {
                    success: false,
                    message: "We want all signup details."
                }
            )
        }

        const existUser = await AuthModel.findOne({email: email})

        if (existUser) {
            return res.status(401).json(
                {
                    success: false,
                    message: "User Already Exist."
                }
            )
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const UserCreate = await AuthModel.create({
            username,
            email,
            gender,
            password: hashpassword
        })

        // Create A Token
        const payLoad = {
            id: UserCreate._id,
            email: UserCreate.email,
            // accountType: UserCreate.accountType,
        }

        const token = JWT.sign(payLoad, process.env.JWT_SECRET,{
            expiresIn: '2h'
        })

        res.cookie('token', token, { httpOnly: true }).status(201).json({
            success: true,
            message: 'User registered successfully.',
            token,
            UserCreate
        });

    }catch (error){
        console.log(error.message)
        return res.status(500).json(
            {
                success: false,
                message: "Signup Problem Check All Details.."
            }
        )
    }
}

// Signin Here
exports.Signin = async (req, res) => {
    try{

        const {email, password} = req.body;

        if (!email || !password){
            return res.status(401).json(
                {
                    success: false,
                    message: "Required fields are missing."
                }
            )
        }

        const CheckEmail = await AuthModel.findOne({email: email});

        if (!CheckEmail){
            return res.status(401).json(
                {
                    success: false,
                    message: "User Not Found."
                }
            )
        }

        // Compare Password
        const isPasswordCorrect = await bcrypt.compare(password, CheckEmail.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect."
            });
        }

        // Updated JWT payload
        const JWTPayLoad = {
            email: CheckEmail.email,
            id: CheckEmail._id,
            // accountType: CheckEmail.accountType
        };

        let token = JWT.sign(JWTPayLoad, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });

        const CookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        // Log the user ID
        console.log(`User logged in: ${CheckEmail._id}`);

        // Cookie pass and return necessary user info
        res.cookie("token", token, CookieOptions).status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            userId: CheckEmail._id, // Include user ID in the response
            email: CheckEmail.email, // Only return necessary info
        });

    }catch(error) {
        console.log(error.message)
        return res.status(501).json(
            {
                success: false,
                message: "Signin Problem Check All Details.."
            }
        )
    }
}