import axios from "../utils/axiosCustomize";

const postLogin = async (data) => {
    const response = await axios.post("/auth/login", data);
    console.log(response);
    return response;
}

const getUserProfile = async (token) => {
    const response = await axios.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

const getAllListRequest = async (token) => {
    const response = await axios.get("/leave-requests", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export { 
    postLogin,
    getUserProfile,
    getAllListRequest
};