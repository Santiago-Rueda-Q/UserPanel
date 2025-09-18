import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import Aura from '@primeuix/themes/aura'

import InputText from 'primevue/inputtext'
import Dropdown  from 'primevue/dropdown'
import Calendar  from 'primevue/calendar'
import Button    from 'primevue/button'
import CascadeSelect from 'primevue/cascadeselect'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import KeyFilter from 'primevue/keyfilter'

import 'primeicons/primeicons.css'
import './style.css'

import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,                 
        options: {
        darkModeSelector: false,    
        cssLayer: false             
        }
    },
    ripple: false
})

app.component('InputText', InputText)
app.component('Dropdown',  Dropdown)
app.component('Calendar',  Calendar)
app.component('PvButton',  Button)
app.component('CascadeSelect', CascadeSelect)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)

app.directive('keyfilter', KeyFilter)

app.mount('#app')