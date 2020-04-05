import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1C9CF6',
                secondary: '#19C3FB',
                accent: '#FFCD00',
                error: '#FF6161',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
            }
        }
    },
    icons: {
        iconfont: "mdi"
    }
});
