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
    
    
    export function users(page=1, organization_id=null) {
        const org_str = organization_id ? `&organization_id=${organization_id}` : ''
        let response = axiosInstance.get(`/users?page=${page}${org_str}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }

    export function getUser(user_id) {
        let response = axiosInstance.get(`/users/${user_id}`)
            .then(response => {
                return response.data.user;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }

    export function editUser(user_id, form) {
        let response = axiosInstance.put(`/users/${user_id}`, form)
            .then(response => {
                return response.data.user;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }

    export function deleteUser(user_id) {
        let response = axiosInstance.delete(`/users/${user_id}`)
            .then(response => {
                if(response.status == 204) return true;
                else return false;
            })
            .catch(error => {
                throw error;
            })
        return response;
    }

