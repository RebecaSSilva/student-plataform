<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <v-card>
          <v-card-title class="headline">
            Login
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Enter</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '../AuthService';
import { VCard, VCardTitle, VCardText, VForm, VTextField, VBtn } from 'vuetify/lib/components';
import { mapActions } from 'vuex';

export default {
  components: {
    VCard,
    VCardTitle,
    VCardText,
    VForm,
    VTextField,
    VBtn
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['setUser']),
    async login() {
      try {
        const response = await AuthService.login(this.email, this.password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.setUser({ email: this.email, token }); 
        if (this.$router) {
          this.$router.push('/dashboard');
        } else {
          console.error("$router is not available");
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>
