import axios from "axios"


export default {

    login(email, password) {

        response = axios.get("/login", {email:email, password:password})
            .then( response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }   


}