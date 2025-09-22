<<template>
    <div
        :class="wrapperClass"
        :style="{'--wave-h': height + 'px'}"
    >
        <svg class="w-full block"
            :style="{height: 'var(--wave-h)'}"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto"
            :class="[position === 'top' ? 'rotate-180' : '']">
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" :fill="rgba(secondary, .70)"/>
            <use xlink:href="#gentle-wave" x="48" y="3" :fill="rgba(primary,   .85)"/>
            <use xlink:href="#gentle-wave" x="48" y="5" :fill="rgba(primary,   1.00)"/>
        </g>
        </svg>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    position:  { type: String, default: 'top' },      
    height:    { type: Number, default: 84 },         
    absolute:  { type: Boolean, default: true },     
    fixed:     { type: Boolean, default: false },     
    primary:   { type: String, default: '#E7000B' },
    secondary: { type: String, default: '#FB2C36' }
})

const wrapperClass = computed(() => {
    const posTop = props.position === 'top'
    if (props.fixed)    return ['pointer-events-none z-0 fixed inset-x-0', posTop ? 'top-0' : 'bottom-0']
    if (props.absolute) return ['pointer-events-none z-0 absolute inset-x-0', posTop ? 'top-0' : 'bottom-0']
    return 'pointer-events-none z-0 w-full' 
})

const hexToRgb = (hex) => {
    const s = hex.replace('#','')
    const n = parseInt(s.length===3 ? s.split('').map(c=>c+c).join('') : s, 16)
    return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 }
}
const rgba = (hex, a=1) => {
    const {r,g,b} = hexToRgb(hex)
    return `rgba(${r}, ${g}, ${b}, ${a})`
}
</script>

<style scoped>
.parallax > use { animation: move-forever 18s cubic-bezier(.55,.5,.45,.5) infinite; }
.parallax > use:nth-child(1){ animation-delay:-2s;  animation-duration:7s;  }
.parallax > use:nth-child(2){ animation-delay:-3s;  animation-duration:11s; }
.parallax > use:nth-child(3){ animation-delay:-4s;  animation-duration:17s; }
@keyframes move-forever { 0%{ transform: translate3d(-90px,0,0); } 100%{ transform: translate3d(85px,0,0); } }
</style>
>