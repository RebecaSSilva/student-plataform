<template>
  <v-container>
    <v-row>
      <v-col class="login-wrapper" cols="12" sm="8" offset-sm="2">
        <v-card class="card-login">
          <v-card-title class="headline"> Login </v-card-title>
          <v-card-text>
            <v-form v-model="formLogin" @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <div class="action-login w-100 d-flex justify-lg-space-between">
                <v-btn type="submit" :disabled="!formLogin" color="primary">Enter</v-btn>
                <v-btn
                  class="register-btn"
                  color="secondary"
                  @click="registerUser"
                  :disabled="!formLogin"
                  >Register</v-btn
                >
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-snackbar :color="snackbar.color" v-model="snackbar.show">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn color="dark" variant="text" @click="snackbar.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '../AuthService';
import router from '../router/index';

export default {
  data() {
    return {
      formLogin: true,
      email: '',
      password: '',
      snackbar: {
        color: "",
        text:"",
        show:false
      },
      rules:{
        required: (value) => !!value || "Required.",
        email: (value) => {
      if (!value) return true;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value) || "Invalid email format.";
    },
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        await AuthService.register(this.email, this.password);
        this.snackbar.show=true;
        this.snackbar.text = "User has been registred. You can now login.";
        this.snackbar.color="success"
        this.password = "";
        this.email="";
      } catch(erro) {
        this.snackbar.show=true;
        this.snackbar.text = "Failed to register user";
        this.snackbar.color="error"
      }
    },
    async login() {
      try {
        const response = await AuthService.login(this.email, this.password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.snackbar.show=true;
        this.snackbar.text = "User has been loged in. You will be redirected.";
        this.snackbar.color="success"
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>
<style>
.login-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}
.card-login {
  width: 100%;
}
</style>
