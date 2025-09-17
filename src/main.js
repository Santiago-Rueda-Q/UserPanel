import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import KeyFilter from 'primevue/keyfilter'

import 'primeicons/primeicons.css'
import './style.css';
import App from './App.vue';

import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'


const app = createApp(App);
app.use(PrimeVue, {
    unstyled: true,            
});
app.directive('keyfilter', KeyFilter)
app.mount('#app');