<template>
    <div class="mt-4">
        <!-- Botón debajo con icono QR -->
        <Button
        severity="danger"
        size="small"
        class="w-full flex items-center justify-center gap-2 rounded-xl"
        @click="openDialog"
        :disabled="!canGenerate"
        aria-label="Generar código QR del perfil"
        >
        <i class="pi pi-qrcode text-base"></i>
        <span>Mostrar QR del perfil</span>
        </Button>

        <!-- Dialog flotante -->
        <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        :closable="true"
        :dismissableMask="true"
        class="max-w-[92vw] w-[520px]"
        :pt="{ header: { class: 'px-6 py-4 border-b border-gray-200' },
                content: { class: 'px-6 py-5' },
                footer: { class: 'px-6 py-4 border-t border-gray-200' } }"
        >
        <template #header>
            <div class="flex items-center gap-3">
            <i class="pi pi-qrcode text-red-600"></i>
            <h2 class="text-lg font-semibold">QR de contacto</h2>
            </div>
        </template>

        <div class="grid gap-4">
            <!-- Vista previa QR -->
            <div class="grid place-items-center">
            <canvas
                ref="qrCanvas"
                class="rounded-xl border border-gray-200 shadow-sm p-3 bg-white"
                :width="qrSize"
                :height="qrSize"
                aria-label="Código QR con los datos del perfil"
            />
            </div>

            <!-- Datos (lectura rápida) -->
            <div class="text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div class="font-medium text-gray-700 mb-1">Información codificada</div>
            <pre class="text-xs text-gray-700 whitespace-pre-wrap break-all">{{ payloadString }}</pre>
            </div>
        </div>

        <template #footer>
            <div class="w-full flex flex-wrap gap-2 justify-center md:justify-end">
            <Button
                size="small"
                outlined
                @click="copyPayload"
                :label="copied ? 'Copiado' : 'Copiar JSON'"
                :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
            />
            <Button
                size="small"
                outlined
                icon="pi pi-refresh"
                label="Regenerar"
                @click="renderQr()"
            />
            <Button
                size="small"
                icon="pi pi-download"
                label="Descargar PNG"
                @click="downloadPng"
            />
            <Button
                size="small"
                severity="secondary"
                label="Cerrar"
                @click="visible=false"
            />
            </div>
        </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import QRCode from 'qrcode'

const props = defineProps({
    fullName: { type: String, default: '' },
    documentNumber: { type: [String, Number], default: '' },
    email: { type: String, default: '' },
})

const visible = ref(false)
const qrCanvas = ref(null)
const qrSize = 280
const copied = ref(false)

const canGenerate = computed(() =>
    String(props.fullName || '').trim() &&
    String(props.documentNumber || '').trim() &&
    String(props.email || '').trim()
)

const payload = computed(() => ({
    name: props.fullName,
    document_number: String(props.documentNumber),
    email: props.email,
    ts: new Date().toISOString()
}))
const payloadString = computed(() => JSON.stringify(payload.value))

async function renderQr () {
    copied.value = false
    const canvas = qrCanvas.value
    if (!canvas) return

    await QRCode.toCanvas(canvas, payloadString.value, {
        errorCorrectionLevel: 'M',
        width: qrSize,
        margin: 2,
        color: {
        dark: '#111111',
        light: '#FFFFFF'
        }
    })
}

async function openDialog () {
    visible.value = true
    await nextTick()
    await renderQr()
}

function downloadPng () {
    const canvas = qrCanvas.value
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `qr-perfil-${props.documentNumber || 'usuario'}.png`
    a.click()
}

async function copyPayload () {
    try {
        await navigator.clipboard.writeText(payloadString.value)
        copied.value = true
        setTimeout(() => (copied.value = false), 1500)
    } catch (e) {
        copied.value = false
    }
}
</script>
