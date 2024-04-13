<template>
  <v-data-table :headers="headers" :items="students" :search="search">
    <template v-slot:top>
      <div class="actions-table-section">
        <div class="search">
          <v-text-field
            v-model="search"
            label="Digite sua busca"
            class="search-field"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            full-width="true"
            hide-details
            single-line
          ></v-text-field>
        </div>
        <div class="action-add-student">
          <v-btn class="mb-2" color="black" dark @click="$emit('openDialogStudent')">
            Cadastrar Aluno
          </v-btn>
        </div>
      </div>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Tem certeza que deseja deletar esse estudante?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
              >Cancelar</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >Deletar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="$emit('editStudent', item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from '@/axiosConfig';

export default {
  name: "StudentView",

  mounted(){
    this.getStudents();
  },
  data: () => ({
    search: "",
    dialogDelete: false,
    headers: [
      {
        title: "RA",
        align: "start",
        sortable: true,
        key: "ra",
      },
      { title: "Nome", key: "name", sortable: true },
      { title: "E-mail", key: "email", sortable: true },
      { title: "CPF", key: "cpf", sortable: true },
      { title: "Ações", key: "actions", sortable: false },
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      registroAcademicio: "",
      nome: "",
      cpf: "",
    },
    defaultItem: {
      registroAcademicio: "",
      nome: "",
      cpf: "",
    },
  }),
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    async getStudents() {
      try {
        const response = await axios.get('/');
        this.students = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        const response = await axios.delete(`/${this.editedItem.id}`);
        if (response.status === 200) {
          this.students.splice(this.editedIndex, 1);
          this.closeDelete();
        } else {
          console.error('Falha ao excluir o estudante.');
        }
      } catch (error) {
        console.error(error);
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
