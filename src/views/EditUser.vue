<template>
    <ViewTitle title="Editar Usuario"/>
    <div class="register-container">
        <div class="register">
            <h2>Editar Usuario</h2>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                   <label for="email">Email:</label>
                   <input type="email" id="email" v-model="email" @blur="isValidEmail(email)" required/>
                    <p v-if="emailError"  class="error-message">Formato de email invalido</p> 
                </div>
                <div class="form-group">
                    <label for="username">Nombre de usuario:</label>
                    <input type="text" id="username" v-model="username" required/>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <div class="password-container">
                        <input :type="showPassword ? 'text' : 'password'" id="password" class="password-input" v-model="password" required />
                        <button type="button" id="toggle-password" class="toggle-password" @click="togglePasswordVisibility">
                            <i v-if="showPassword" class="fa-regular fa-eye" style="color: #FFD700"></i>
                            <i v-else class="fa-regular fa-eye-slash" style="color: #FFD700"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                  <label for="repeat_password">Repetir contraseña:</label>
                  <input type="password" id="repeat_password" v-model="repeat_password" required/>
              </div>
              <p v-if="mismatch_password" class="error-message">Las contraseñas no coinciden.</p>

                <div v-if="can_edit_is_manager" class="form-group">
                    <label class="checkbox-label" for="is-manager">Es Manager
                        <input type="checkbox" id="is-manager" v-model="is_manager"/>
                    </label>
                </div>
                <div class="form-group register-button">
                    <button id="register-button" type="button" @click="editUser">Editar Usuario</button>
                </div>
                <p v-if="error" class="error-message">Error al editar el usuario.</p>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import ViewTitle from '@/components/ViewTitle.vue';
  import { get_user } from '@/routes/users';
  import { mapGetters } from 'vuex';
  import { edit_user } from '@/routes/users';
  
  export default {
    data() {
        return {
            user_id: null,
            initial_email: '',
            email: '',
            initial_username: '',
            username: '',
            password: '',
            repeat_password: '',
            showPassword: false,
            can_edit_is_manager: false,
            initial_isManager: false,
            is_manager: false,
            error: false,
            emailError: false,
            mismatch_password: false
        };
    },
    components : { ViewTitle },
    async created() {

      console.log(this.$route.params)

        if((!this.isAdminOrganization && !this.isManager) || !this.$route.params.user_id) {
            this.initial_email = this.user.email;
            this.initial_username = this.user.username;
            this.initial_isManager = this.isManager;
            this.is_manager = this.isManager;
            this.can_edit_is_manager = false;
            this.user_id = this.user.id;
        }
        else {
          this.user_id = this.$route.params.user_id;
          let user_to_edit = await get_user(this.user_id);
            this.initial_email = user_to_edit.email;
            this.initial_username = user_to_edit.username;
            this.initial_isManager = Boolean(user_to_edit.role);
            this.is_manager = Boolean(user_to_edit.role);
            this.can_edit_is_manager = true;
        }
        this.email = this.initial_email;
        this.username = this.initial_username;
    },
    computed : {
      ...mapGetters(['isAdminOrganization', 'user', 'isManager']),
    },
  
    mounted() {
      if(!this.isAdminOrganization) {
        this.organization_id = this.user.organization_id;
      }
      this.fixWidths();
      window.addEventListener("resize", this.fixEmailWidth);
    }, 
    
    unmounted() {
      window.removeEventListener("resize", this.fixEmailWidth);
    },
  
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async editUser() {
            try {
                this.isValidEmail(this.email);
                if(this.emailError || this.username == '') {
                  this.error = true;
                  return;
                }
                if((this.password != '' || this.repeat_password != '') && this.password != this.repeat_password) {
                  this.mismatch_password = true;
                  return;
                }
                const credentials = {}
                if(this.initial_email != this.email) credentials['email'] = this.email;
                if(this.initial_username != this.username) credentials['username'] = this.username;
                if(this.initial_email != this.email) credentials['email'] = this.email;
                if(this.password) credentials['password'] = this.password;
                if(this.initial_isManager != this.is_manager) credentials['role'] = Number(this.is_manager);
                
                if(Object.keys(credentials).length == 0) {
                  this.$router.push({name: 'Users'});
                  return;
                }

                await edit_user(this.user_id, credentials); 
                
                if(!this.isAdminOrganization && !this.isManager) 
                    this.$router.push({name: 'Landing'});
                
                else this.$router.push({name: 'Users'});
                 
                
            } catch (error) {
                this.error = true;
            }
        },
  
        isValidEmail(email) {
          // Expresión regular para validar un email
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const is_valid = re.test(String(email).toLowerCase())
          
          this.emailError = !is_valid;
          
          return is_valid;
        },
        fixWidths() {
          let username = document.getElementById("username");
          let email = document.getElementById("email");
          let repeat_password = document.getElementById("repeat_password");
  
          const register_button_width = document.getElementById('register-button').offsetWidth + 'px';
  
          username.style.width = register_button_width;
          email.style.width = register_button_width;
          repeat_password.style.width = register_button_width;
        }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #2c2c2c;
    width: 100%;
  }
  
  .register {
    max-width: 80%;
    min-width: 50%;
    padding: 2em 3em;
    border: 1px solid #444;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    background-color: #1e1e1e;
    color: #fff;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 2em;
    color: #fff;
    font-size: 2em;
  }
  
  .form-group {
    max-width: 100%;
    margin-bottom: 1.5em;
  }
  
  form label {
    display: block;
    margin-bottom: 0.5em;
    color: #bbb;
    font-size: 1.1em;
  }
  
  .password-container {
    display: flex;
    align-items: center;
  }
  
  form input, form select {
    width: 100%;
    padding: 1em;
    border: 1px solid #555;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
    font-size: 1em;
    background-color: #333;
    color: #fff;
  }
  
  .toggle-password {
    padding: 1em;
    border: 1px solid #555;
    border-left: none;
    border-radius: 5px 5px 5px 5px;
    background-color: #444;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    flex: 1;
  }
  
  .password-input {
    flex: 20;
  }
  
  .toggle-password:hover {
    background-color: #555;
  }
  
  form input:focus, form select:focus {
    border-color: #CCD700;
    outline: none;
  }
  
  .checkbox-label {
    display: inline-flex;
    align-items: center;
  }
  
  .checkbox-label input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid #fff;
    border-radius: 3px;
    background-color: #333;
    display: inline-block;
    position: relative;
  }
  
  .checkbox-label input[type="checkbox"]:checked {
    background-color: #FFD700;
    border: 2px solid #FFD700;
  }
  
  .checkbox-label input[type="checkbox"]:checked::after {
    content: '✔'; /* Unicode character for check mark */
    color: #000;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  button {
    width: 100%;
  }
  
  .error-message {
    margin-top: 1em;
    color: #FF4C4C;
    text-align: center;
    font-size: 1.1em;
  }
  
  .register-button {
    margin-top: 50px;
  }
  </style>
  