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


    export function chat_messages(chat_id, timestamp=null) {
        let response = axiosInstance.get(`/messages/${chat_id}${timestamp != null ? '/'+timestamp : ''}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response.data.errro;
            })
        return response;
    }

    export function send_message(message_data) {
        let response = axiosInstance.post('/messages/send', message_data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response.data.errro;
            })
        return response;

    }