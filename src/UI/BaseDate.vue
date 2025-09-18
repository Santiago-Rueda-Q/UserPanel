<template>
  <div :class="['relative', error ? 'input-group-error' : '']">
    <InputGroup 
      :class="[
        'input-group-field',
        error ? 'input-group-field--error' : ''
      ]"
    >
      <InputGroupAddon class="input-group-addon">
        <i class="pi pi-calendar"></i>
      </InputGroupAddon>
      
      <Calendar
        v-model="inner"
        :inputId="id"
        dateFormat="dd/mm/yy"
        :manualInput="true"
        :showIcon="false"
        class="flex-1"
        :pt="{
          root: { 
            class: 'w-full h-11 rounded-none border-0',
            style: 'border: none !important; box-shadow: none !important;'
          },
          pcInput: { 
            class: 'w-full h-11 px-3 border-0 outline-none bg-transparent rounded-none',
            style: 'border: none !important; box-shadow: none !important; outline: none !important;'
          },
          input: { 
            class: 'w-full h-11 px-3 border-0 outline-none bg-transparent text-base rounded-none',
            style: 'border: none !important; box-shadow: none !important; outline: none !important;'
          },
          panel: { 
            class: 'bg-white border-2 border-[#FB2C36] rounded-xl shadow-lg z-[2000]'
          },
          header: { 
            class: 'bg-white border-b border-gray-200 p-3 flex items-center justify-between'
          },
          title: { 
            class: 'text-gray-900 font-medium'
          },
          table: { 
            class: 'w-full'
          },
          tableHeaderCell: { 
            class: 'p-2 text-center text-gray-600 text-sm font-medium'
          },
          day: { 
            class: 'w-10 h-10 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50 rounded transition-colors'
          },
          dayLabel: { 
            class: 'w-full h-full flex items-center justify-center'
          },
          otherMonthDay: { 
            class: 'text-gray-400'
          },
          today: { 
            class: 'bg-[#FB2C36] text-white rounded hover:bg-[#E7000B]'
          }
        }"
      />
    </InputGroup>

    <!-- Botón de limpiar personalizado para fechas -->
    <button 
      v-if="inner" 
      type="button" 
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
      @click="clearDate" 
      aria-label="Limpiar fecha"
    >
      <i class="pi pi-times text-sm"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Calendar from 'primevue/calendar'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = defineProps({
  modelValue: [Date, String, null],
  id: String,
  error: [String, Boolean]
})

const emit = defineEmits(['update:modelValue'])
const inner = ref(props.modelValue ?? null)

watch(() => props.modelValue, v => inner.value = v)
watch(inner, v => emit('update:modelValue', v))

function clearDate() {
  inner.value = null
}
</script>