import { createApp } from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'

const app = createApp(App)

app.use(Vuetify)

app.mount('#app')

