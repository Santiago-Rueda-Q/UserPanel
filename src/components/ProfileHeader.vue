<template>
    <header class="relative w-full bg-white border-b border-red-100 overflow-hidden">
        <!-- Ola superior -->
        <DecorativeWave position="top" :height="64" :absolute="true" />

        <!-- Contenido -->
        <div class="px-4 md:px-10 py-2 pt-9 flex items-center gap-4 relative z-10">
            <div class="min-w-0">
                <h1 class="py-5 text-2xl font-semibold leading-tight">Perfil de usuario</h1>
            </div>

            <!-- Botón home a la derecha -->
            <button
            class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow
                    hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 pulse-badge--inline"
            @click="$emit('go-dashboard')"
            title="Volver al dashboard"
            aria-label="Volver al dashboard"
            >
            <i class="pi pi-home text-xl"></i>
            </button>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import DecorativeWave from './DecorativeWave.vue'
const props = defineProps({ user: { type:Object, default:() => ({}) } })
defineEmits(['go-dashboard'])
const fullName = computed(() => [props.user.first_name, props.user.last_name].filter(Boolean).join(' '))
</script>
