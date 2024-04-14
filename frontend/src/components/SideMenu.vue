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
        <v-list-tile-content>
          <v-list-tile-title>Alunos</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideMenu",

  data() {
    return {};
  },
};
</script>
