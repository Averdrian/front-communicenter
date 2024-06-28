import axiosInstance from "../axios"


    export function login(email, password) {
        console.log(email, password)
        console.log("hola");
        let response = axiosInstance.post("/login", {email:email, password:password})
            .then( response => {
                return response;
            })
            .catch(error => {
                throw error.response.data.error;
            });
        return response;
    }
    
    
    export function logout() {
        let response = axiosInstance.post("/logout")
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
        return response;
    }
