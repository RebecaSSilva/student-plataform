<template>
<v-navigation-drawer permanent>
  <v-toolbar height="40px" color="#858585" flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title-module">
          Módulo Acadêmico
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>

  <v-divider></v-divider>

  <v-list dense class="pt-0">
    <v-list-tile>
      <v-list-tile-content class="student">
        <v-list-tile-title>Alunos</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
      <v-btn class="w-100" prepend-icon="mdi-logout" flat @click="logout">
        Logout
      </v-btn>
  </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
name: "SideMenu",

methods: {
  logout() {
    localStorage.removeItem('token');
    this.$router.push("/login");
  }
}
};
</script>
<style>
.student{
margin: 10px;
}
</style>