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
      
      <Dropdown
        v-model="inner"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="placeholder"
        :filter="filter"
        :showClear="false"
        class="flex-1"
        :pt="{
          root: { 
            class: 'bg-white border-0 h-11 w-full rounded-none'
          },
          input: { 
            class: 'h-11 leading-[2.75rem] px-3 text-base'
          },
          label: { 
            class: 'h-11 leading-[2.75rem] px-3 text-base text-gray-900 cursor-pointer'
          },
          panel: { 
            class: 'bg-white border-2 border-[#FB2C36] rounded-xl shadow-lg z-[2000] mt-1' 
          },
          list: { 
            class: 'bg-white rounded-xl overflow-hidden'
          },
          item: { 
            class: 'bg-white hover:bg-red-50 px-4 py-3 text-gray-900 cursor-pointer transition-all duration-200 border-b border-gray-100 hover:border-l-4 hover:border-l-[#FB2C36] hover:pl-3'
          },
          itemGroup: { 
            class: 'bg-gray-50 px-4 py-2 text-gray-700 font-medium text-sm border-b border-gray-200'
          },
          emptyMessage: { 
            class: 'bg-white px-4 py-3 text-gray-500 text-center'
          },
          header: { 
            class: 'bg-white border-b border-gray-200 p-3'
          },
          filterInput: { 
            class: 'w-full p-2 border border-gray-300 rounded-md text-sm focus:border-[#FB2C36] focus:ring-1 focus:ring-[#FB2C36]'
          },
          filterIcon: {
            class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm'
          }
        }"
      />
    </InputGroup>

    <!-- Sin ícono - select simple -->
    <div v-else :class="['field', error ? 'field--error' : 'field--neutral']">
      <Dropdown
        v-model="inner"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="placeholder"
        :filter="filter"
        :showClear="false"
        class="w-full"
        :pt="{
          root: { 
            class: 'bg-white rounded-xl border-0 h-11 w-full' 
          },
          input: { 
            class: 'h-11 leading-[2.75rem] px-3 text-base'
          },
          label: { 
            class: 'h-11 leading-[2.75rem] px-3 text-base text-gray-900 cursor-pointer'
          },
          panel: { 
            class: 'bg-white border-2 border-[#FB2C36] rounded-xl shadow-lg z-[2000] mt-1' 
          },
          list: { 
            class: 'bg-white rounded-xl overflow-hidden'
          },
          item: { 
            class: 'bg-white hover:bg-red-50 px-4 py-3 text-gray-900 cursor-pointer transition-all duration-200 border-b border-gray-100 hover:border-l-4 hover:border-l-[#FB2C36] hover:pl-3'
          },
          itemGroup: { 
            class: 'bg-gray-50 px-4 py-2 text-gray-700 font-medium text-sm border-b border-gray-200'
          },
          emptyMessage: { 
            class: 'bg-white px-4 py-3 text-gray-500 text-center'
          },
          header: { 
            class: 'bg-white border-b border-gray-200 p-3'
          },
          filterInput: { 
            class: 'w-full p-2 border border-gray-300 rounded-md text-sm focus:border-[#FB2C36] focus:ring-1 focus:ring-[#FB2C36] pl-8'
          },
          filterIcon: {
            class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm'
          }
        }"
      />
    </div>

    <!-- Botón personalizado de limpiar -->
    <button 
      v-if="clearable && inner !== null && inner !== ''" 
      type="button" 
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
      @click="clearValue"
      aria-label="Limpiar selección"
    >
      <i class="pi pi-times text-sm"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const props = defineProps({
  modelValue: [String, Number, Object, null],
  options: { type: Array, default: () => [] },
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
  placeholder: String,
  icon: String,
  filter: { type: Boolean, default: true },
  clearable: { type: Boolean, default: true },
  error: [String, Boolean]
})

const emit = defineEmits(['update:modelValue'])
const inner = ref(props.modelValue ?? null)

watch(() => props.modelValue, v => inner.value = v)
watch(inner, v => emit('update:modelValue', v))

function clearValue() {
  inner.value = null
}
</script>