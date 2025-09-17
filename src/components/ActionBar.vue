<template>
    <div :class="wrapperClass">
        <div class="w-full px-0 md:px-0 py-3 flex gap-3 justify-end">
        <Button label="Cancelar" text class="rounded-xl" @click="$emit('cancel')" />
        <Button
            :label="saving ? 'Guardando…' : 'Actualizar'"
            icon="pi pi-save"
            :disabled="!valid || saving || !dirty"
            class="rounded-xl bg-[#E7000B] hover:bg-[#FB2C36] text-white shadow-fesc hover:shadow-fesc-2"
            @click="$emit('save')"
        />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
    dirty: Boolean,
    valid: Boolean,
    saving: Boolean,
    mode: { type: String, default: 'inline' } 
})

const wrapperClass = computed(() =>
    props.mode === 'sticky'
        ? 'sticky left-0 right-0 z-30 w-full bg-white/95 backdrop-blur border-t border-gray-200 bottom-[var(--wave-bottom-h)]'
        : 'relative w-full border-t border-gray-200 mt-6'
)
</script>
