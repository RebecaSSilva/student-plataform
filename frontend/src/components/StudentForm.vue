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
                    v-model="name"
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
                    v-model="name"
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
                    v-model="name"
                    placeholder="Informe o número do documento"
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
        if (this.student) {
          // Se student estiver definido, é uma edição
          await axios.put(`/${this.student.id}`, this.student);
          // Lógica de atualização após a edição
        } else {
          // Se student não estiver definido, é um novo cadastro
          await axios.post('/', this.student);
          // Lógica de atualização após o cadastro
        }
        // Lógica comum para atualizar a lista de estudantes ou outras ações necessárias
      } catch (error) {
        console.error(error);
      }
    },  
};
</script>
