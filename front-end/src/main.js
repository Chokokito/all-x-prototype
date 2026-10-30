import { createApp } from 'vue'
import App from './App.vue'
import { vParallax } from './parallax'
import './style.css'
import './bits.css'

createApp(App).directive('parallax', vParallax).mount('#app')
