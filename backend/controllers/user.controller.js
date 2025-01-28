const { createUserService, updateUserService, handleSignIn } = require("../services/user.service");
const sendResponse = require("../utils/sendResponse")

const getSingleProfile = async (req, res) => {
    // const { username } = req.params;
    // const response = await getprofile(username);
    // if (response) {
    //     sendResponse(res, 200, true, "User fetched succesfully", response)
    // }
    // else {
    //     sendResponse(res, 400, false, "Failed to fetch user", response)
    // }

}

const createUser = async (req, res) => {
    const userData = req.body;
    const response = await createUserService(userData);

    if (response.success) {
        sendResponse(res, 200, true, "User created succesfully", response.data)
    }
    else {
        sendResponse(res, 400, false, response.message)
    }

}

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;
    const response = await updateUserService(userId, updateData);
    console.log(userId, updateData)
    if (response.success) {
        sendResponse(res, 200, true, "User updated successfully", response.data)
    }
    else {
        sendResponse(res, 400, false, response.message)
    }
}

const handleLogin = async (req, res) => {

    const { identifier, password } = req.body;
    const response = await handleSignIn(identifier, password);
    if (response.success) {
        sendResponse(res, 200, true, "User loggedin successfully", response.data)
    }
    else {
        sendResponse(res, 400, false, response.message)
    }
}





module.exports = {
    getSingleProfile,
    createUser,
    updateUser,
    handleLogin

}