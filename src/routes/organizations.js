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

export function createOrganization(organization_form) {
    let response = axiosInstance.post('/organization/create', organization_form)
        .then(response => {
            if(response.status == 201) return true;
            else return false;
        })
        .catch(error => {
            throw error;
        });
    return response;
}