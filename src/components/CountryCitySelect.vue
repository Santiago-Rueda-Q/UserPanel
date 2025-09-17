<template>
  <div class="space-y-2">
    <label class="text-sm font-medium text-gray-700">{{ label || 'País / Ciudad' }}</label>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseSelect
        v-model="countryModel"
        :options="countries"
        :placeholder="'Country'"
        :icon="'pi pi-globe'"
        :clearable="true"
        :neutral="true"
        :withFlags="true"
      />
      <BaseSelect
        v-model="cityModel"
        :options="cities"
        :placeholder="'City'"
        :icon="'pi pi-map-marker'"
        :clearable="true"
        :neutral="true"
      />
    </div>
    <p v-if="errors?.country" class="text-xs text-red-600">{{ errors.country }}</p>
    <p v-if="errors?.city" class="text-xs text-red-600">{{ errors.city }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseSelect from '@/UI/BaseSelect.vue'

const props = defineProps({
  country:[String,Number,Object], city:[String,Number,Object],
  countries:{ type:Array, default:()=>[] }, citiesByCountry:{ type:Function, default:()=>[] },
  errors:{ type:Object, default:()=>({}) }, label:String
})
const emit = defineEmits(['update:country','update:city'])
const countryModel = computed({ get:()=>props.country, set:v=>emit('update:country',v) })
const cityModel    = computed({ get:()=>props.city,    set:v=>emit('update:city',v) })
const cities       = computed(()=> props.citiesByCountry?.(countryModel.value) ?? [])
</script>
