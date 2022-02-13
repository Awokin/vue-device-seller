import axios from "axios";
//import { BASE_API_URL } from "../common/Constants";

const API_URL = "http://localhost:5000" + '/api/user';

class RegService {

    signup(user) {
        return axios.post(API_URL + '/save', user);
    }

    // register(user) {
    //     return axios.post(API_URL + '/sign-up',user);
    // }

}

export default new RegService;