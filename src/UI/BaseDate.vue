<template>
  <div class="w-full">
    <label v-if="labelMode==='top'" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      :class="[
        'field with-left-icon',
        error && 'field--error',
        neutral && 'field--neutral'
      ]"
      @click="openCalendar"
    >
      <i class="field-icon-left pi pi-calendar"></i>

      <button
        v-if="clearable && !!inner"
        type="button"
        class="field-clear"
        @click.stop="inner = null"
        aria-label="Limpiar fecha" title="Limpiar"
      >
        <i class="pi pi-times"></i>
      </button>

      <DatePicker
        ref="dpRef"
        :id="id"
        v-model="inner"
        dateFormat="dd/mm/yy"
        :manualInput="true"
        :showIcon="false"
        :showOnFocus="true"
        :touchUI="false"
        :invalid="!!error"
        class="w-full"
        :pt="{
          root:  'w-full bg-transparent',
          input: { class: 'field-input pr-10' },
          panel: { class: 'pv-panel-z bg-white border border-gray-200 rounded-lg shadow-sm p-2' }
        }"
      />
    </div>

    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DatePicker from 'primevue/datepicker'

const props = defineProps({
  modelValue:[String,Date], id:String, label:String, error:String,
  labelMode:{ type:String, default:'top' },
  clearable:{ type:Boolean, default:true },
  neutral:{ type:Boolean, default:false }
})
const emit = defineEmits(['update:modelValue'])
const inner = computed({ get:()=>props.modelValue, set:v=>emit('update:modelValue',v) })

const dpRef = ref(null)
function openCalendar(e){ if (!e.target.closest('.field-clear')) dpRef.value?.show?.() }
</script>
<template>
  <div class="w-full">
    <label v-if="labelMode==='top'" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      :class="[
        'field with-left-icon',
        error && 'field--error',
        neutral && 'field--neutral'
      ]"
      @click="openCalendar"
    >
      <i class="field-icon-left pi pi-calendar"></i>

      <button
        v-if="clearable && !!inner"
        type="button"
        class="field-clear"
        @click.stop="inner = null"
        aria-label="Limpiar fecha" title="Limpiar"
      >
        <i class="pi pi-times"></i>
      </button>

      <DatePicker
        ref="dpRef"
        :id="id"
        v-model="inner"
        dateFormat="dd/mm/yy"
        :manualInput="true"
        :showIcon="false"
        :showOnFocus="true"
        :touchUI="false"
        :invalid="!!error"
        class="w-full"
        :pt="{
          root:  'w-full bg-transparent',
          input: { class: 'field-input pr-10' },
          panel: { class: 'pv-panel-z bg-white border border-gray-200 rounded-lg shadow-sm p-2' }
        }"
      />
    </div>

    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DatePicker from 'primevue/datepicker'

const props = defineProps({
  modelValue:[String,Date], id:String, label:String, error:String,
  labelMode:{ type:String, default:'top' },
  clearable:{ type:Boolean, default:true },
  neutral:{ type:Boolean, default:false }
})
const emit = defineEmits(['update:modelValue'])
const inner = computed({ get:()=>props.modelValue, set:v=>emit('update:modelValue',v) })

const dpRef = ref(null)
function openCalendar(e){ if (!e.target.closest('.field-clear')) dpRef.value?.show?.() }
</script>
