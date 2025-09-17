<template>
  <div class="w-full">
    <label v-if="labelMode==='top'" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      :class="[
        'field',
        icon && 'with-left-icon',
        error && 'field--error',
        neutral && 'field--neutral'
      ]"
      @click="openSelect"
    >
      <i v-if="icon" :class="['field-icon-left', icon]"></i>

      <button
        v-if="clearable && inner != null"
        type="button"
        class="field-clear"
        @click.stop="inner = null"
        aria-label="Limpiar selección" title="Limpiar"
      >
        <i class="pi pi-times"></i>
      </button>

      <Select
        ref="selRef"
        :id="id"
        v-model="inner"
        :options="normOptions"
        optionLabel="name"
        optionValue="value"
        :filter="filter"
        :showClear="false"
        :invalid="!!error"
        :placeholder="placeholder"
        class="w-full"
        :pt="{
          root:    'w-full border-0 bg-transparent rounded-xl',
          /* OJO: label en inline-flex para centrar vertical y mantener altura */
          label:   { class: 'p-select-label inline-flex items-center h-11 px-3 pr-10 truncate text-gray-900' },
          trigger: { class: 'px-2' },
          panel:   { class: 'pv-panel-z bg-white border border-gray-200 rounded-lg shadow-sm py-1' },
          option:  { class: 'option-item' }
        }"
      >
        <!-- Valor (placeholder gris cuando no hay) -->
        <template #value="sp">
          <template v-if="withFlags">
            <span v-if="sp.value == null" class="text-gray-400 truncate">{{ placeholder }}</span>
            <span v-else class="inline-flex items-center truncate">
              <img v-if="sp.value?.code" :src="flagUrl(sp.value.code)" class="w-[18px] mr-2" alt="" />
              {{ findLabel(sp.value) }}
            </span>
          </template>
          <template v-else>
            <span v-if="sp.value == null" class="text-gray-400 truncate">{{ placeholder }}</span>
            <span v-else class="truncate">{{ findLabel(sp.value) }}</span>
          </template>
        </template>

        <!-- Opción (con check y bandera opcional) -->
        <template #option="sp">
          <div class="option-item" :aria-selected="sp.selected">
            <div class="flex items-center">
              <img v-if="withFlags && sp.option.code" :src="flagUrl(sp.option.code)" class="w-[18px] mr-2" alt="" />
              <span class="option-label">{{ sp.option.name }}</span>
            </div>
            <i v-if="sp.selected" class="pi pi-check option-check" />
          </div>
        </template>
      </Select>
    </div>

    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Select from 'primevue/select'

const props = defineProps({
  modelValue:[String,Number,Object,null],
  id:String, label:String, error:String,
  options:{ type:Array, default:()=>[] }, // [{name, value, code?}] o primitivos
  placeholder:{ type:String, default:'' },
  labelMode:{ type:String, default:'top' },
  filter:{ type:Boolean, default:true },
  clearable:{ type:Boolean, default:true },
  icon:{ type:String, default:'' }, // ej: 'pi pi-globe'
  neutral:{ type:Boolean, default:false },
  withFlags:{ type:Boolean, default:false }
})
const emit = defineEmits(['update:modelValue'])

const normOptions = computed(() => props.options.map(o =>
  (o && typeof o === 'object' && 'name' in o) ? o : { name:String(o), value:o }
))
const inner = computed({ get:()=>props.modelValue, set:v=>emit('update:modelValue', v) })

const selRef = ref(null)
function openSelect(e){ if (!e.target.closest('.field-clear')) selRef.value?.show?.() }

function findLabel(v){
  const hit = normOptions.value.find(o => (o?.value ?? o) === v || o?.value?.value === v)
  return hit ? hit.name : ''
}
const flagUrl = (code)=>`https://primefaces.org/cdn/primevue/images/flag/flag_${String(code).toLowerCase()}.png`
</script>
