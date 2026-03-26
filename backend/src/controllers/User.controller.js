import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/User.model.js"
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;
    if ([name, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required ")
    }

    if (!email.includes("@") || !email.includes(".") || !(email.indexOf("@") < email.lastIndexOf("."))) {
        throw new ApiError(400, "Email is not valid ")
    }
    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "Email already exist");
    }

    const user = await User.create({ name, email, password, role });

    const createdUser = await User.findOne(user._id).select("-password ");

    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    res.status(201).json(new ApiResponse(201, "User registered successfully", createdUser));
});

export { registerUser };