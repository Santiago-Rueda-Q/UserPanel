<template>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-4">
        <div
        v-for="it in schema"
        :key="it.key"
        :class="colClass(it.col)"
        >
        <FieldRenderer :item="it" :model="model" :errors="errors" :deps="deps" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import FieldRenderer from './FieldRenderer.vue'

const props = defineProps({ schema:Array, modelValue:Object, errors:Object, deps:Object })
const emit = defineEmits(['update:modelValue'])

const model = reactive({ ...props.modelValue })
watch(model, v => emit('update:modelValue', { ...v }), { deep:true })
watch(() => props.modelValue, v => Object.assign(model, v || {}), { deep:true })

function colClass (col) {
  // Soporta: 'full' | '1/2' (default) | '1/3' | '2/3'
    switch (col) {
        case 'full': return 'md:col-span-12'
        case '1/3':  return 'md:col-span-4'
        case '2/3':  return 'md:col-span-8'
        default:     return 'md:col-span-6'
    }
}
</script>
