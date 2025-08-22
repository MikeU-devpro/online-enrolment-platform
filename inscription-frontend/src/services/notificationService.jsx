import axios from 'axios';

const API_URL = 'http://localhost:8091/api/v1/notifications'; // Replace with your actual backend URL

const getToken = () => {
    return localStorage.getItem('jwt_token');
};

const getAuthHeaders = () => {
    const token = getToken();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

export const getNotifications = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export const markAllAsRead = async () => {
    try {
        await axios.post(`${API_URL}/mark-all-read`, {}, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        throw error;
    }
};