import axiosInstance from "../axios"


    export function register(register_form) {
        let response = axiosInstance.post("/signup", register_form)
            .then( response => {
                if(response.status == 201) return true;
                else return false;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }
    
    
    export function users(query_args = '') {
        let query_str = query_args != '' ? '?'+query_args : ''
        let response = axiosInstance.post(`/users${query_str}`)
            .then(response => {
                return response.data.users;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }
