import axiosInstance from "../axios";


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

    export function getChat(chat_id) {
        let response = axiosInstance.get(`/chat/${chat_id}`)
            .then( response => {
                return response.data.chat;
            })
            .catch(error => {
                throw error.response.data.error;
            });
        return response;
    }


    export function chatMessages(chat_id, timestamp=null) {
        if(timestamp != null && Number.isInteger(timestamp)) timestamp = timestamp.toFixed(1)
        let response = axiosInstance.get(`/messages/${chat_id}${timestamp != null ? '/'+ timestamp : ''}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response.data.errro;
            })
        return response;
    }

    export function sendMessage(message_data) {
        let response = axiosInstance.post('/messages/send', message_data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response.data.errro;
            })
        return response;

    }

    export function statuses() {
        let response = axiosInstance.get('/chat/statuses')
            .then(response => {
                return response.data.statuses;
            })
            .catch(error => {
                throw error;
            })
        return response;
    }

    export function updateStatus(chat_id, status) {
        let response = axiosInstance.patch(`/chat/${chat_id}/status/${status}`)
            .then(response => {
                return response.data.status;
            })
            .catch(error => {
                throw error;
            })
        return response;
    }
