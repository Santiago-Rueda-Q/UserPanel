<template>
    <div class="w-full">
        <div class="field-shell">
        <FileUpload
            mode="basic"
            chooseLabel="Seleccionar"
            :accept="accept"
            :maxFileSize="max"
            customUpload
            @uploader="e => $emit('select', e.files?.[0])"
            class="field-input !px-0"
        />
        </div>
        <p v-if="hint" class="mt-1 text-xs text-gray-500">{{ hint }}</p>
    </div>
</template>
<script setup>
import FileUpload from 'primevue/fileupload'
defineProps({ accept:String, max:Number, hint:String })
</script>
