import axios from "axios";
import { BASE_API_URL } from "../common/Constants";

const API_URL = BASE_API_URL + '/api/user';

class ApplicationService {

    apply(user) {
        return axios.post(API_URL + '/save', user);
    }

    // register(user) {
    //     return axios.post(API_URL + '/sign-up',user);
    // }

}

export default new ApplicationService;