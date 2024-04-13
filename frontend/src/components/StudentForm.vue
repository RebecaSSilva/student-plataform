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
                    v-model="name"
                    placeholder="Informe o nome completo"
                    variant="outlined"
                    density="compact"
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
                    v-model="email"
                    placeholder="Informe apenas um e-mail"
                    variant="outlined"
                    density="compact"
                    single-line
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="d-flex input-group">
                <div style="width: 20%">
                  <div class="d-flex justify-center align-center outline-label">
                    <p>RA</p>
                  </div>
                </div>

                <div style="width: 80%">
                  <v-text-field
                    v-model="ra"
                    placeholder="Informe o registro acadêmico"
                    variant="outlined"
                    density="compact"
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
                    v-model="cpf"
                    placeholder="Informe o número do CPF"
                    variant="outlined"
                    density="compact"
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
      <v-btn color="blue darken-1" text @click="$emit('closeFormStudent')">
        CANCELAR
      </v-btn>
      <v-btn color="blue darken-1" text @click="save"> SALVAR </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from '@/axiosConfig';

export default {
    props: {
        student: Object
    },
    data: () => ({}),
    async save() {
      try {
        if (this.student.id) {
          // If student ID exists, it's an edit
          await axios.put(`/${this.student.id}`, {
            name: this.student.name,
            email: this.student.email
          });
          // Logic for handling update after edit
          console.log('Student updated successfully!');
        } else {
          // If student ID doesn't exist, it's a new student  
          // Check if a student with the same RA already exists
          const existingStudent = await axios.get(`/${this.student.id}`);
          if (existingStudent.data) {
            console.log('A student with the same ID already exists.');
            return; // Exit without creating a new student
          }
          // If no student with the same RA exists, proceed with creating the new student
          await axios.put(`/${this.student.id}`, {
            name: this.student.name,
            cpf: this.student.cpf,
            email: this.student.email
          });
          console.log('A student was been created.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },  
};

</script>
