<template>
  <div
    class="relative min-h-screen grid grid-rows-[auto_1fr_auto] overflow-x-hidden"
    :style="{'--footer-wave-h': footerWaveH + 'px'}"
  >
    <!-- HEADER -->
    <ProfileHeader :user="user" @change-photo="openPhoto = true" @go-dashboard="goDash" />

    <!-- MAIN -->
    <main class="relative z-10 px-4 md:px-10 pb-[calc(var(--footer-wave-h)+env(safe-area-inset-bottom))]">
      <div v-if="loading" class="mt-6">
        <SkeletonBlock />
      </div>

      <div v-else class="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- IZQUIERDA -->
        <aside class="lg:col-span-4 flex">
          <div class="flex-1">
            <AvatarPanel
              :photo="user.photo_url"
              :maxMB="2"
              @selected="file => tempPhotoFile = file"
              @uploaded="onPhotoUploaded"
            />
          </div>
        </aside>

        <!-- DERECHA -->
        <section class="lg:col-span-8 flex">
          <div class="flex-1 rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <!-- El formulario ahora se autogestiona (estado/validación/botones). -->
            <ProfileForm />
          </div>
        </section>
      </div>
    </main>

    <!-- FOOTER -->
    <footer
      class="relative z-10 bg-white/70 backdrop-blur border-t border-gray-200 overflow-hidden"
      :style="{'--footer-wave-h': footerWaveH + 'px'}"
    >
      <div
        :style="{
          paddingBottom: 'var(--footer-wave-h)',
          paddingTop: 'env(safe-area-inset-top)'
        }"
      ></div>

      <DecorativeWave
        position="bottom"
        :height="footerWaveH"
        :absolute="true"
        :primary="'#E7000B'"
        :secondary="'#FB2C36'"
      />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import ProfileForm from '@/components/ProfileForm.vue'
import SkeletonBlock from '@/UI/SkeletonBlock.vue'
import DecorativeWave from '@/components/DecorativeWave.vue'
import AvatarPanel from '@/components/AvatarPanel.vue'

const openPhoto = ref(false)
const tempPhotoFile = ref(null)
const loading = ref(true)

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  photo_url: null
})

const footerWaveH = 72

onMounted(() => {
  // Simulación de carga inicial
  setTimeout(() => (loading.value = false), 600)
})

function goDash() {
  // router.push('/dashboard')
}

function onPhotoUploaded(payload) {
  if (payload?.url) user.value.photo_url = payload.url
}
</script>