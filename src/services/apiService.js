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

const createLeaveRequest = async (token, data) => {
    const response = await axios.post("/leave-requests", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
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

const getAttachment = async (token, id) => {
    try {
        const response = await axios.get(`/leave-requests/${id}/attachments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error getting attachment:", error);
        throw error;
    }
}

export {
    postLogin,
    getUserProfile,
    declineRequest,
    approveRequest,
    getAllLeaveRequests,
    createLeaveRequest,
    deleteLeaveRequest,
    getAttachment,
}
