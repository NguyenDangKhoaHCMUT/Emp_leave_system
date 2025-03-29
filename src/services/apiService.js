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

const getAllLeaveRequests = async (token) => {
    const response = await axios.get("/leave-requests", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

const createLeaveRequest = async (data, token) => {
    try {
        const response = await axios.post("/leave-requests", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating leave request:", error);
        throw error;
    }
}

const deleteLeaveRequest = async (token, id) => {
    try {
        const response = await axios.delete(`/leave-requests/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error deleting leave request:", error);
        throw error;
    }
    // console.log(id);
}

export { 
    postLogin,
    getUserProfile,
    getAllLeaveRequests,
    createLeaveRequest,
    deleteLeaveRequest
};