import axiosInstance from "../axios";


export function getOrganization(organization_id) {
    let response = axiosInstance.get(`/organization/${organization_id}`)
        .then( response => {
            return response.data.organization;
        })
        .catch(error => {
            throw error.response.data.error;
        });
    return response;
}

export function getAllOrganizations() {
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
            console.log(error)
            throw error.response.data;
        });
    return response;
}

export function editOrganization(organization_id, organization_form){
    let response = axiosInstance.put(`/organization/${organization_id}`, organization_form)
        .then( response => {
            return response.data.organization;
        })
        .catch( error => {
            throw error.response.data.error;
        })
    return response;
}