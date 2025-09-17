<template>
  <div
    class="relative min-h-screen grid grid-rows-[auto_1fr_auto] overflow-x-hidden"
    :style="{'--bottom-wave-h': bottomWaveH + 'px'}"
  >
    <!-- HEADER -->
    <ProfileHeader :user="user" @change-photo="openPhoto = true" @go-dashboard="goDash" />

    <!-- MAIN -->
    <main class="relative z-10 px-4 md:px-10 pb-[calc(var(--bottom-wave-h)+env(safe-area-inset-bottom))]">
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
            />
          </div>
        </aside>

        <!-- DERECHA -->
        <section class="lg:col-span-8 flex">
          <div class="flex-1 rounded-2xl bg-white border border-gray-200 shadow-sm p-6 flex flex-col">
            <div class="flex-1">
              <ProfileForm :schema="schema" v-model="form" :errors="errors" :deps="deps" />
            </div>

            <!-- Botonera -->
            <ActionBar
              mode="inline"
              :dirty="dirty"
              :valid="valid"
              :saving="saving"
              @save="save"
              @cancel="reset"
            />
          </div>
        </section>
      </div>
    </main>

    <!-- FOOTER -->
    <footer
      class="relative z-10 bg-white/70 backdrop-blur border-t border-gray-200 overflow-hidden"
      :style="{'--footer-wave-h': footerWaveH + 'px'}"
    >
      <!-- Contenido del footer -->
      <div
        :style="{
          paddingBottom: 'var(--footer-wave-h)',
          paddingTop: 'env(safe-area-inset-top)'
        }"
      ></div>

      <!-- borde inferior del footer -->
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
import { reactive, ref, computed, onMounted } from 'vue'
import { profileSchema as schema } from './schema'
import ProfileHeader from '@/components/ProfileHeader.vue'
import ProfileForm from '@/components/ProfileForm.vue'
import ActionBar from '@/components/ActionBar.vue'
import SkeletonBlock from '@/UI/SkeletonBlock.vue'
import DecorativeWave from '@/components/DecorativeWave.vue'
import AvatarPanel from '@/components/AvatarPanel.vue'

const tempPhotoFile = ref(null)
const loading = ref(true)
const saving  = ref(false)
const errors  = ref({})
const user = ref({ first_name:'', last_name:'', email:'', phone:'' })
const form = reactive({ ...user.value, country:null, city:null, birthdate:null, gender_id:null, document_type_id:null, modality:null })
const footerWaveH = 72

const deps = {
  genders:[{ name:'Masculino', value:1 },{ name:'Femenino', value:2 }],
  documentTypes:[{ name:'CC', value:1 },{ name:'TI', value:2 }],
  modalities:[{ name:'Presencial', value:'P' },{ name:'Virtual', value:'V' }],
  countries:[{ name:'Colombia', value:'CO', code:'CO' },{ name:'Venezuela', value:'VE', code:'VE' }],
  citiesByCountry:(country)=> country?.value==='CO'
    ? [{ name:'Cúcuta', value:'Cucuta' },{ name:'Bogotá', value:'Bogota' }]
    : [{ name:'Caracas', value:'Caracas' }]
}

const dirty = computed(()=> JSON.stringify(form) !== JSON.stringify(user.value))
const valid = computed(()=> !!form.first_name && !!form.last_name && !!form.email)
onMounted(()=> setTimeout(()=> loading.value=false, 600))

function save(){ saving.value=true; setTimeout(()=>{ saving.value=false }, 900) }
function reset(){ Object.assign(form, user.value) }
function goDash(){ /* router.push('/dashboard') */ }

function onPhotoUploaded(payload) {
  if (payload?.url) user.photo_url = payload.url
}
</script>
