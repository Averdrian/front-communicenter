import axiosInstance from "@/axios";


    export function getChatNotes(chat_id) {
        let response = axiosInstance.get(`/chat/note/${chat_id}`)
            .then( response =>  { 
                return response.data.notes;
            })
            .catch ( error => {
                throw error.response.data.error;
            });
        return response
    } 

    export function createNote(note_data) {
        let response = axiosInstance.post("/chat/note/create", note_data)
            .then( response =>  { 
                return response.data.note;
            })
            .catch ( error => {
                throw error.response.data.error;
            });
        return response
    } 

    export function deleteNote(note_id) {
        let response = axiosInstance.delete(`/chat/note/${note_id}`)
            .then( response =>  { 
                if (response.status == 204) {
                    return true
                }
                else return false
            })
            .catch ( error => {
                throw error.response.data.error;
            });
        return response
    } 
