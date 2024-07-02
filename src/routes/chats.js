import axiosInstance from "../axios"


    export function chats() {
        let response = axiosInstance.get("/chat")
            .then( response => {
                return response.data.chats;
            })
            .catch(error => {
                throw error.response.data.error;
            });
        return response;
    }
