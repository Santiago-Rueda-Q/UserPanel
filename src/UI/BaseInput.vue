<template>
  <div :class="['relative', error ? 'input-group-error' : '']">
    <InputGroup 
      v-if="icon"
      :class="[
        'input-group-field',
        error ? 'input-group-field--error' : ''
      ]"
    >
      <InputGroupAddon class="input-group-addon">
        <i class="pi" :class="icon"></i>
      </InputGroupAddon>
      
      <InputText
        :id="id"
        v-model="inner"
        :placeholder="placeholder"
        class="flex-1"
        :aria-invalid="!!error"
        :autocomplete="autocomplete"
      />
    </InputGroup>

    <!-- Sin ícono - input simple -->
    <div v-else :class="['field', error ? 'field--error' : 'field--neutral']">
      <InputText
        :id="id"
        v-model="inner"
        :placeholder="placeholder"
        class="field-input p-inputtext w-full"
        :aria-invalid="!!error"
        :autocomplete="autocomplete"
      />
    </div>

    <!-- Botón de limpiar -->
    <button 
      v-if="clearable && inner && inner.length > 0" 
      type="button" 
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
      @click="clearInput" 
      aria-label="Limpiar campo"
    >
      <i class="pi pi-times text-sm"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = defineProps({
  modelValue: [String, Number],
  id: String,
  placeholder: String,
  icon: String,            
  error: [String, Boolean],
  clearable: { type: Boolean, default: true },
  autocomplete: { type: String, default: 'off' }
})

const emit = defineEmits(['update:modelValue'])
const inner = ref(props.modelValue ?? '')

watch(() => props.modelValue, v => inner.value = v)
watch(inner, v => emit('update:modelValue', v))

function clearInput() {
  inner.value = ''
}
</script>