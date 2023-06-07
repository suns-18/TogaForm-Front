// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'
import pageTheme from '../ts/pageTheme';

export default createVuetify({
		theme: {
			defaultTheme: 'pageTheme',
			themes: {pageTheme}
		}
	}
	// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
