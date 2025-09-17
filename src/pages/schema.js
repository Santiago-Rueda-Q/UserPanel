// src/pages/schema.js
export const profileSchema = [
  { key:'first_name', label:'Nombre', component:'BaseInput',  props:{ icon:'pi pi-user' } },
  { key:'last_name',  label:'Apellido', component:'BaseInput', props:{ icon:'pi pi-user' } },

  { key:'email', label:'Email', component:'BaseInput',
    props:{ icon:'pi pi-at', autocomplete:'email', neutral:true } },

  { key:'document_type_id', label:'Tipo de documento', component:'BaseSelect',
    props:{ optionsKey:'documentTypes', icon:'pi pi-id-card' } },

  // === Fila de 3 ===
  { key:'gender_id', label:'Género', component:'BaseSelect', col:'1/3',
    props:{ optionsKey:'genders', icon:'pi pi-users' } },
  { key:'modality', label:'Modalidad', component:'BaseSelect', col:'1/3',
    props:{ optionsKey:'modalities', icon:'pi pi-desktop' } },
  { key:'birthdate', label:'Fecha de nacimiento', component:'BaseDate', col:'1/3',
    props:{ neutral:true } },

  // País / Ciudad
  { key:'country', label:'País / Ciudad', component:'CountryCitySelect', col:'full' },
]
