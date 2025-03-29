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
    return response;
}

const declineRequest = async (id, token) => {
    const response = await axios.post(`/leave-requests/${id}/decline`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

const approveRequest = async (id, token) => {
    const response = await axios.post(`/leave-requests/${id}/approve`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export {
    postLogin,
    getUserProfile,
    getAllListRequest,
    declineRequest,
    approveRequest,
};