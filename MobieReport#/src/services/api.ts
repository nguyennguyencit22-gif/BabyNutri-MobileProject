import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: chỉnh lại đúng port backend thật (xem backend/server.js)
// - Android Emulator: dùng 10.0.2.2 thay cho localhost
// - Thiết bị thật cùng wifi: dùng IP LAN máy chạy backend, vd 192.168.1.5
const BASE_URL = 'http://10.0.2.2:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự gắn token vào mỗi request nếu người dùng đã đăng nhập
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Log lỗi tập trung, dễ debug khi API fail
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('[API Error]', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('[API Error] Không nhận được phản hồi từ server:', error.message);
        } else {
            console.error('[API Error]', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;