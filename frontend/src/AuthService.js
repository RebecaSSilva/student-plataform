import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

class AuthService {

    login(email, password) {
        return axios.post(`${API_URL}/login`, {
        email,
        password,
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(name, email, password) {
        return axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        });
    }
}

export default new AuthService();