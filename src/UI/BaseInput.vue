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
      @click="focusInput"
    >
      <i v-if="icon" :class="['field-icon-left', icon]"></i>

      <InputText
        ref="inputRef"
        :id="id"
        v-model="inner"
        v-keyfilter="keyfilter"
        :invalid="!!error"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? id + '-error' : null"
        class="field-input pr-10"
      />
      <button
        v-if="clearable && !!inner"
        type="button"
        class="field-clear"
        @click.stop="inner = ''"
        aria-label="Limpiar" title="Limpiar"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>

    <p v-if="error" :id="id + '-error'" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'

const props = defineProps({
  modelValue:[String,Number],
  id:String, label:String, error:String,
  keyfilter:[String,RegExp,Object],
  autocomplete:{ type:String, default:'off' },
  labelMode:{ type:String, default:'top' },
  icon:{ type:String, default:'' },
  clearable:{ type:Boolean, default:true },
  neutral:{ type:Boolean, default:false }
})
const emit = defineEmits(['update:modelValue'])
const inner = computed({ get:()=>props.modelValue, set:v=>emit('update:modelValue',v) })
const inputRef = ref(null)
function focusInput(){ inputRef.value?.$el?.querySelector('input')?.focus?.() }
</script>
