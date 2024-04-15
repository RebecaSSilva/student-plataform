<template>
  <v-app>
    <v-layout>
      <SideMenu />
      <v-main>
      
        <v-row no-gutters>
          <v-col cols="12">
            <div class="title-table-section">
              <v-toolbar-title align-center>{{ formTitle }}</v-toolbar-title>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="w100 d-block main-content">
              <div v-show="!dialogStudent" class="data-table-view w-100">
                <StudentView
                  @snackbar="snackHandler($event)"
                  @editStudent="processEditStudent($event)"
                  @openDialogStudent="dialogStudent = true"
                  @updateList="update = !update"

                />
              </div>
              <div v-show="dialogStudent" class="view-student-form w-100">
                <StudentForm
                  :edit="editStudent"
                  :student="studentEntity"
                  @snackbar="snackHandler($event)"
                  @closeFormStudent="dialogStudent = false"
                  @updateList="update = !update"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-main>
      <v-snackbar :color="snackbar.color" v-model="snackbar.show">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn color="dark" variant="text" @click="snackbar.show = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-layout>
  </v-app>
</template>

<script>
import SideMenu from "./components/SideMenu.vue";
import StudentView from "./components/StudentView.vue";
import StudentForm from "./components/StudentForm.vue";

export default {
  data: () => ({
    dialogStudent: false,
    editStudent: false,
    studentEntity: {},
    update:false,
    snackbar: {
      text:"", 
      color: "",
      show: false
    }
  }),
  components: {
    SideMenu,
    StudentView,
    StudentForm,
  },
  computed: {
    formTitle() {
      if (this.dialogStudent && this.editStudent) {
        return "Editar Aluno";
      } else if (this.dialogStudent) {
        return "Cadastro Aluno";
      } else {
        return "Consulta Alunos";
      }
    },
  },

  

  methods: {
    snackHandler(val) {
      this.snackbar = {...val};
    },
    processEditStudent(item) {
      console.log(item);
      this.editStudent = true;
      this.studentEntity = { ...item };
      this.dialogStudent = true;
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogStudent = true;
    },
   
  },
};
</script>
