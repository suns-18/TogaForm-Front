import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './ts/router';
import pinia from './ts/store'

loadFonts()

createApp(App)
	.use(vuetify)
	.use(router)
	.use(pinia)
	.mount('#app')
