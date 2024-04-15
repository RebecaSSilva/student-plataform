import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user';

class AuthService {

    login(email, password) {
        return axios.post(`${API_URL}/login`, {
        email,
        password,
        });
    }


    register(email, password) {
        return axios.post(`${API_URL}/register`, {
        email,
        password,
        });
    }
}

export default new AuthService();