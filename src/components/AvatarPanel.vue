<template>
  <div class="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">

    <!-- Preview -->
    <div
      class="relative mx-auto rounded-xl overflow-hidden bg-gray-50 grid place-items-center
             w-[clamp(260px,34vw,420px)] h-[clamp(260px,34vw,420px)]"
    >
      <img v-if="preview" :src="preview" alt="Foto de perfil"
           class="w-full h-full object-cover select-none" draggable="false" loading="lazy" />
      <i v-else class="pi pi-user text-[clamp(44px,5vw,64px)] text-gray-400"></i>

      <!-- Botón circular rojo superpuesto -->
      <button
        type="button"
        class="absolute bottom-3 right-3 h-12 w-12 rounded-full grid place-items-center
               bg-[#E7000B] hover:bg-[#FB2C36] text-white shadow-lg ring-4 ring-white
               focus:outline-none focus:ring-2 focus:ring-red-500"
        title="Cambiar foto"
        aria-label="Cambiar foto"
        @click="openPicker"
      >
        <i class="pi pi-camera text-xl"></i>
      </button>

      <!-- FileUpload oculto completamente -->
      <FileUpload
        ref="fu"
        mode="advanced"
        :showUploadButton="false"
        :showCancelButton="false"
        :auto="false"
        :multiple="false"
        name="photo"
        accept="image/*"
        :maxFileSize="maxBytes"
        customUpload
        @select="onFileSelect"
        :pt="{ root: { class: 'hidden' } }"
      />
    </div>

    <!-- Consejo fijo -->
    <div class="rounded-xl bg-[#FFE2E2] text-gray-700 px-4 py-2 border border-red-100">

      <p class="text-sm">Consejo: se recomienda una foto cuadrada (1:1). Tamaño máx. {{ maxMB }} MB.</p>
    </div>

    <!-- Mensaje de error debajo del recuadro -->
    <p v-if="msg" role="alert" class="mt-3 text-sm text-red-600 text-center">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed, onUnmounted, nextTick } from 'vue'
import FileUpload from 'primevue/fileupload'

const props = defineProps({
  photo: { type: String, default: '' },
  maxMB: { type: Number, default: 2 }
})
const emit = defineEmits(['selected'])

const preview = ref(props.photo || '')
watch(() => props.photo, v => (preview.value = v || ''))

const fu = ref(null)
const maxBytes = computed(() => Math.round(props.maxMB * 1024 * 1024))
const msg = ref('')
let lastURL = null

function resetChooser () {
  fu.value?.clear?.()
  const input = fu.value?.$el?.querySelector('input[type="file"]')
  if (input) input.value = ''
}

async function openPicker () {
  // limpiar antes de abrir para permitir re-seleccionar la misma imagen
  resetChooser()
  await nextTick()
  if (fu.value?.choose) fu.value.choose()
  else fu.value?.$el?.querySelector('input[type="file"]')?.click()
}

function onFileSelect (e) {
  msg.value = ''
  const file = e.files?.[0]
  if (!file) return

  // Validación de tamaño
  if (file.size > maxBytes.value) {
    msg.value = `El archivo supera ${props.maxMB} MB.`
    resetChooser()
    return
  }

  // Preview inmediato (llenando el recuadro)
  if (lastURL) URL.revokeObjectURL(lastURL)
  lastURL = URL.createObjectURL(file)
  preview.value = lastURL

  emit('selected', file)

  // Permitir actualización continua (misma/otra imagen)
  queueMicrotask(() => resetChooser())
}

onUnmounted(() => {
  if (lastURL) URL.revokeObjectURL(lastURL)
})
</script>
