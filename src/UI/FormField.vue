<template>
    <div class="space-y-1">
        <label v-if="label" :for="forId" class="text-sm font-medium text-gray-700">
        {{ label }}
        </label>
        <slot />
        <p v-if="help" class="text-xs text-gray-500">{{ help }}</p>
        <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    forId: String,
    help: String,
    error: [String, Boolean]
})
</script>