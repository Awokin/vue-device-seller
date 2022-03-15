import { BASE_API_URL } from '../common/Constants';
import axios from 'axios';
import { authHeader, handleResponseWithLoginCheck } from './base.service';

const API_URL = BASE_API_URL + '/api/user';

class UserService {

    changeRole(role) {
        const req = axios.put(API_URL + '/change/' + role, {}, {headers: authHeader()});
    
        return handleResponseWithLoginCheck(req);
    }

    // getAllPurchaseItems() {
    //     return axios.get(API_URL, {headers: authHeader()});
    // }

}

export default new UserService();