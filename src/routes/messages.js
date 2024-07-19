import axiosInstance from "../axios";

export function get_message(message_id) {
    let response = axiosInstance.get(`/messages/id/${message_id}`)
        .then( response => {
            return response.data.message;
        })
        .catch(error => {
            throw error.response.data.error;
        });
    return response;
}

