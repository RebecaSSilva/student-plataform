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
                  @editStudent="editItem($event)"
                  @openDialogStudent="dialogStudent = true"
                />
              </div>
              <div v-show="dialogStudent" class="view-student-form w-100">
                <StudentForm @closeFormStudent="dialogStudent = false" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-main>
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
  }),
  components: {
    SideMenu,
    StudentView,
    StudentForm,
  },

  computed: {
    formTitle() {
      return this.dialog == true ? "Cadastro Alunos" : "Consulta Alunos";
    },
  },

  watch: {
    dialogStudent(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogStudent = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
