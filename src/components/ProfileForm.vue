<template>
    <form class="grid grid-cols-12 gap-4" @submit.prevent="onSubmit">
    <!-- Nombre -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Nombre" for-id="first_name" :error="errors.first_name">
        <BaseInput id="first_name" v-model="model.first_name" icon="pi-user" :error="errors.first_name" />
        </FormField>
    </div>

    <!-- Apellido -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Apellido" for-id="last_name" :error="errors.last_name">
        <BaseInput id="last_name" v-model="model.last_name" icon="pi-user" :error="errors.last_name" />
        </FormField>
    </div>

    <!-- Email (full) -->
    <div class="col-span-12">
        <FormField label="Email" for-id="email" :error="errors.email">
        <BaseInput id="email" v-model="model.email" icon="pi-at" :error="errors.email" autocomplete="email" />
        </FormField>
    </div>

    <!-- Tipo de documento (50%) -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Tipo de documento" for-id="doc_type" :error="errors.doc_type">
        <BaseSelect id="doc_type" v-model="model.doc_type" :options="deps.docTypes" placeholder="Selecciona" icon="pi-id-card" :error="errors.doc_type" />
        </FormField>
    </div>

    <!-- Fecha de nacimiento (50%) -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Fecha de nacimiento" for-id="birthdate" :error="errors.birthdate">
        <BaseDate id="birthdate" v-model="model.birthdate" :error="errors.birthdate" />
        </FormField>
    </div>

    <!-- Género (50%) -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Género" for-id="gender" :error="errors.gender">
        <BaseSelect id="gender" v-model="model.gender" :options="deps.genders" placeholder="Selecciona" icon="pi-users" :error="errors.gender" />
        </FormField>
    </div>

    <!-- Modalidad (50%) -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Modalidad" for-id="modality" :error="errors.modality">
        <BaseSelect id="modality" v-model="model.modality" :options="deps.modalities" placeholder="Selecciona" icon="pi-desktop" :error="errors.modality" />
        </FormField>
    </div>

    <!-- País (50%) -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="País" for-id="country" :error="errors.country">
        <BaseSelect id="country" v-model="model.country"
                    :options="deps.countries"
                    placeholder="Selecciona país"
                    icon="pi-globe"
                    :error="errors.country" />
        </FormField>
    </div>

    <!-- Ciudad (50%) -->
    <div class="col-span-12 md:col-span-6">
        <FormField label="Ciudad" for-id="city" :error="errors.city">
        <BaseSelect id="city" v-model="model.city"
                    :options="citiesForCountry"
                    placeholder="Selecciona ciudad"
                    icon="pi-map-marker"
                    :error="errors.city" />
        </FormField>
    </div>

    <!-- Acciones -->
    <div class="col-span-12 flex items-center justify-end gap-3 pt-2">
        <button type="button" class="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50">Cancelar</button>
        <PvButton type="submit" class="rounded-xl px-4 py-2 fesc-primary text-white hover:opacity-95">
        <i class="pi pi-refresh mr-2"></i> Actualizar
        </PvButton>
    </div>
    </form>
</template>

<script setup>
import { computed, reactive } from 'vue'
import FormField  from '@/UI/FormField.vue'
import BaseInput  from '@/UI/BaseInput.vue'
import BaseSelect from '@/UI/BaseSelect.vue'
import BaseDate   from '@/UI/BaseDate.vue'

// Modelo del formulario
const model = reactive({
    first_name: '',
    last_name: '',
    email: '',
    doc_type: null,
    gender: null,
    modality: null,
    birthdate: null,
    country: null,
    city: null
})

// Dependencias (mock)
const deps = {
    docTypes: [
        { label: 'Cédula', value: 'CC' },
        { label: 'Tarjeta de Identidad', value: 'TI' },
        { label: 'Pasaporte', value: 'PA' }
    ],
    genders: [
        { label: 'Masculino', value: 'M' },
        { label: 'Femenino',  value: 'F' },
        { label: 'No binario', value: 'NB' },
    ],
    modalities: [
        { label: 'Presencial', value: 'P' },
        { label: 'Virtual',    value: 'V' },
        { label: 'Mixta',      value: 'M' }
    ],
    countries: [
        { label: 'Colombia', value: 'CO' },
        { label: 'Venezuela', value: 'VE' },
        { label: 'USA', value: 'US' }
    ],
    cities: {
        CO: [{ label: 'Cúcuta', value: 'Cúcuta' }, { label: 'Bogotá', value: 'Bogotá' }],
        VE: [{ label: 'San Cristóbal', value: 'San Cristóbal' }, { label: 'Caracas', value: 'Caracas' }],
        US: [{ label: 'Miami', value: 'Miami' }, { label: 'New York', value: 'New York' }]
    }
}

// Errores de UI
const errors = reactive({
    first_name: null, last_name: null, email: null, doc_type: null,
    gender: null, modality: null, birthdate: null, country: null, city: null
})

const citiesForCountry = computed(() => {
    return model.country ? (deps.cities[model.country] ?? []) : []
})

function onSubmit () {

}
</script>