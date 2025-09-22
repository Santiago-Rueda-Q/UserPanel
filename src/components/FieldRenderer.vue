<template>
    <!-- Paises-->
    <div v-if="item.component === 'CountryCitySelect'">
        <CountryCitySelect
        v-model:country="model.country"
        v-model:city="model.city"
        :countries="deps?.countries || []"
        :citiesByCountry="deps?.citiesByCountry"
        :errors="{ country: errors?.country, city: errors?.city }"
        :label="item.label"                      
        />
    </div>

    <!-- Resto de campos -->
    <component
        v-else
        :is="map[item.component]"
        v-bind="binds"
        v-model="model[item.key]"
    />
</template>

<script setup>
import { computed } from 'vue'
import BaseInput from '@/UI/BaseInput.vue'
import BaseSelect from '@/UI/BaseSelect.vue'
import BaseDate from '@/UI/BaseDate.vue'
import CountryCitySelect from './CountryCitySelect.vue'

const props = defineProps({ item:Object, model:Object, errors:Object, deps:Object })
const map = { BaseInput, BaseSelect, BaseDate, CountryCitySelect }

const binds = computed(() => {
    const { item, errors, deps } = props
    const common = { id:item.key, label:item.label, error:errors?.[item.key], labelMode:'top', ...(item.props||{}) }

    if (item.component === 'BaseSelect') {
        return { ...common, options: deps?.[item.props?.optionsKey] || [], withFlags:item.props?.withFlags }
    }
    if (item.component === 'BaseInput' && item.props?.keyfilter) {
        return { ...common, keyfilter:item.props.keyfilter }
    }
    return common
})
</script>
