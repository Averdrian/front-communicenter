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
        let response = axiosInstance.get(`/users${query_str}`)
            .then(response => {
                return response.data.users;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }

    export function get_user(user_id) {
        let response = axiosInstance.get(`/users/${user_id}`)
            .then(response => {
                return response.data.user;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }

    export function edit_user(user_id, form) {
        let response = axiosInstance.put(`/users/${user_id}`, form)
            .then(response => {
                return response.data.user;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }

