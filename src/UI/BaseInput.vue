<template>
  <div :class="['relative', error ? 'input-group-error' : '']">
    <!-- Con ícono -->
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
        v-model="inner"
        :placeholder="placeholder"
        :type="type"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        v-keyfilter="keyfilter"
        class="flex-1"
        :pt="{
          root: { 
            class: 'bg-white border-0 h-11 w-full rounded-none outline-none focus:outline-none focus:ring-0'
          }
        }"
      />
    </InputGroup>

    <!-- Sin ícono -->
    <div v-else :class="['field', error ? 'field--error' : 'field--neutral']">
      <InputText
        v-model="inner"
        :placeholder="placeholder"
        :type="type"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        v-keyfilter="keyfilter"
        class="field-input w-full"
        :pt="{
          root: { 
            class: 'bg-white rounded-xl border-0 h-11 w-full px-3 text-base text-gray-900 outline-none focus:outline-none focus:ring-0' 
          }
        }"
      />
    </div>

    <!-- Botón -->
    <button 
      v-if="clearable && inner && inner.length > 0" 
      type="button" 
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
      @click="clearValue"
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
  modelValue: [String, Number, null],
  placeholder: String,
  type: { type: String, default: 'text' },
  icon: String,
  maxlength: Number,
  autocomplete: String,
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  keyfilter: [String, RegExp],
  error: [String, Boolean]
})

const emit = defineEmits(['update:modelValue'])
const inner = ref(props.modelValue ?? '')

watch(() => props.modelValue, v => inner.value = v ?? '')
watch(inner, v => emit('update:modelValue', v))

function clearValue() {
  inner.value = ''
}
</script>