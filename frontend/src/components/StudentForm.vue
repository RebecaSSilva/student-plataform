<template>
  <v-card class="card-form-student" elevation="0">
    <v-card-text>
      <v-container>
        <v-form ref="form">
          <v-row no-gutters>
            <v-col cols="12">
              <div class="d-flex input-group">
                <div style="width: 20%">
                  <div class="d-flex justify-center align-center outline-label">
                    <p>Nome</p>
                  </div>
                </div>

                <div style="width: 80%">
                  <v-text-field
                    v-model="studentEntity.name"
                    placeholder="Informe o nome completo"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required]"
                    single-line
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="d-flex input-group">
                <div style="width: 20%">
                  <div class="d-flex justify-center align-center outline-label">
                    <p>E-mail</p>
                  </div>
                </div>

                <div style="width: 80%">
                  <v-text-field
                    v-model="studentEntity.email"
                    placeholder="Informe apenas um e-mail"
                    variant="outlined"
                    density="compact"
                    single-line
                    :rules="[rules.email]"
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col v-show="edit" cols="12">
              <div class="d-flex input-group">
                <div style="width: 20%">
                  <div class="d-flex justify-center align-center outline-label">
                    <p>RA</p>
                  </div>
                </div>

                <div style="width: 80%">
                  <v-text-field
                    v-model="studentEntity.ra"
                    placeholder="Informe o registro acadêmico"
                    variant="outlined"
                    density="compact"
                    :disabled="edit"
                    single-line
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="d-flex input-group">
                <div style="width: 20%">
                  <div class="d-flex justify-center align-center outline-label">
                    <p>CPF</p>
                  </div>
                </div>

                <div style="width: 80%">
                  <v-text-field
                    v-model="studentEntity.cpf"
                    placeholder="Informe o número do CPF"
                    variant="outlined"
                    :disabled="edit"
                    density="compact"
                    :rules="[rules.cpf]"

                    single-line
                  ></v-text-field>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeStudentForm">
        CANCELAR
      </v-btn>
      <v-btn color="blue darken-1" text @click="save()"> SALVAR </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "@/axiosConfig";

export default {
  props: {
    edit: Boolean,
    student: Object,
  },
  watch: {
    student(val) {
      this.studentEntity = { ...val };
    },
  },
  data: () => ({
    rules: {
       required: (value) => !!value || "Required.",
    cpf: (value) => {
      if (!value) return true;
     const cpfRegex = /^(\d{3})?(\d{3})?(\d{3})?(\d{2})$/;

      return cpfRegex.test(value) || "Invalid CPF format.";
    },
    email: (value) => {
      if (!value) return true;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value) || "Invalid email format.";
    },
    },
    studentEntity: {
      id: null,
      name: "",
      cpf: "",
      ra: "",
      emial: "",
    },
  }),
  methods: {
    closeStudentForm() {
      this.studentEntity = {};
      this.$emit('closeFormStudent')
    },
    async save() {
      try {
        if (this.studentEntity.id) {
          // If student ID exists, it's an edit
          await axios.put(`/${this.student.id}`, {
            name: this.studentEntity.name,
            email: this.studentEntity.email,
          });
          // Logic for handling update after edit
          this.$emit("snackbar", {
            show: true,
            text: "Student updated successfully!",
            color: "success",
          });
        } else {
          await axios.post(`/`, {
            name: this.studentEntity.name,
            cpf: this.studentEntity.cpf,
            ra: "dsadsa",
            email: this.studentEntity.email,
          });
          this.$emit("snackbar", {
            show: true,
            text: "A student was created successfully.",
            color: "success",
          });
          this.$emit("updateList");
          this.$emit("closeFormStudent");
        }
      } catch (error) {
        this.$emit("snackbar", {
          show: true,
          text: error.response.data.error,
          color: "error",
        });
      }
    },
  },
};
</script>
