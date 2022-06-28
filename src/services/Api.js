import Vue from 'vue';
import axios from "axios";
import VueAxios from "vue-axios";
// import { config } from "@/config/development";
// import Auth from './Auth'

// const baseURL = `${config.baseURL}`;

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        // axios.defaults.baseURL = "http://192.168.1.13:8000/api";
        // axios.defaults.baseURL = "http://127.0.0.1:8000/api";
        axios.defaults.baseURL = "https://manage.inchargecard.com/backend/api";
        
        axios.defaults.headers.common["Content-Type"] = "application/json";
    },
    PostRequest(url, data) {
        return axios({
            method: "POST",
            url: url,
            data: data,
            headers: {Authorization: "Bearer " + localStorage.getItem("token")}
        },).then((response) => response);
    },
    PostRequestExport(url, data){
        return axios({
            method: "POST",
            url: url,
            data: data,
            responseType: "blob",
            headers: {Authorization: "Bearer " + localStorage.getItem("token")}
        }).then((response) => response);
    },
    GetRequest(url) {
        return axios({
            method: "GET",
            url: url,
            headers: {Authorization: "Bearer " + localStorage.getItem("token")}
        }).then((response) => response).catch( (error) => error );
    },
    DeleteRequest(url) {
        return axios({
            method: "DELETE",
            url: url,
            // headers: {Authorization: "Bearer " + localStorage.getItem("token")}
        }).then((response) => response);
    }
};
export default ApiService;