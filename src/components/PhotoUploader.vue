<template>
    <Dialog v-model:visible="visible" :modal="true" :draggable="false" :closable="true"
            header="Actualizar foto de perfil" class="w-full md:w-[520px]" @hide="onClose">
        <div class="space-y-4">
        <!-- Zona de selección -->
        <FileUpload
            mode="basic"
            customUpload
            chooseLabel="Seleccionar imagen"
            :maxFileSize="maxBytes"
            :auto="false"
            accept="image/png,image/jpeg,image/webp"
            @uploader="onUploader"
            class="w-full"
        />
        <p class="text-xs text-gray-500">Formatos: JPG, PNG, WEBP • Máx: {{ maxMB }}MB • Recomendado: 1:1</p>

        <!-- Preview -->
        <div class="rounded-2xl border border-gray-200 p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
            <p class="text-sm font-medium mb-2">Actual</p>
            <div class="aspect-square rounded-xl overflow-hidden bg-gray-50 grid place-items-center">
                <img v-if="initial" :src="initial" class="w-full h-full object-cover" alt="Foto actual" />
                <i v-else class="pi pi-user text-4xl text-gray-400"></i>
            </div>
            </div>
            <div>
            <p class="text-sm font-medium mb-2">Nueva</p>
            <div class="aspect-square rounded-xl overflow-hidden bg-gray-50 grid place-items-center">
                <img v-if="preview" :src="preview" class="w-full h-full object-cover" alt="Previsualización" />
                <span v-else class="text-xs text-gray-500">Sin seleccionar</span>
            </div>
            </div>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <!-- Acciones -->
        <div class="flex justify-end gap-3 pt-2">
            <Button label="Cancelar" text @click="onClose" />
            <Button
            :disabled="!preview || saving"
            :label="saving ? 'Guardando…' : 'Guardar'"
            icon="pi pi-check"
            class="bg-[#E7000B] hover:bg-[#FB2C36] text-white rounded-xl shadow-fesc hover:shadow-fesc-2"
            @click="doSave"
            />
        </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'

const props = defineProps({
    open: { type: Boolean, default: false },     
    initial: { type: String, default: '' },      
    maxMB: { type: Number, default: 2 }
})
const emit = defineEmits(['update:open','uploaded'])

const visible = ref(props.open)
watch(() => props.open, v => visible.value = v)
watch(visible, v => emit('update:open', v))

const maxBytes = computed(() => props.maxMB * 1024 * 1024)
const preview = ref('')
const fileRef = ref(null)
const error = ref('')
const saving = ref(false)

function onUploader(e) {
    error.value = ''
    const file = e.files?.[0]
    if (!file) return
    if (!/image\/(png|jpeg|webp)/.test(file.type)) {
        error.value = 'Formato no permitido (use JPG, PNG o WEBP).'
        return
    }
    if (file.size > maxBytes.value) {
        error.value = `La imagen supera ${props.maxMB}MB.`
        return
    }
    fileRef.value = file
    const fr = new FileReader()
    fr.onload = () => { preview.value = String(fr.result || '') }
    fr.readAsDataURL(file)
}

function doSave() {
    if (!preview.value) return
    saving.value = true
    setTimeout(() => {
        emit('uploaded', { url: preview.value, file: fileRef.value })
        visible.value = false
        saving.value = false
    }, 300)
}

function onClose(){ visible.value = false; error.value = '' }
</script>
