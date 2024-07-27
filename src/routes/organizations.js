import axiosInstance from "../axios";

export function get_organizations() {
    let response = axiosInstance.get('/organization/all')
        .then( response => {
            return response.data.organizations;
        })
        .catch(error => {
            throw error.response.data.error;
        });
    return response;
}

