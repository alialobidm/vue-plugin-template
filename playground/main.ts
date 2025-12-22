import { createApp } from 'vue'
import App from './App.vue'
import { MyPlugin } from '../src/index'

const app = createApp(App)

// Install the plugin with options
app.use(MyPlugin, {
  prefix: 'Custom',
  globalProperty: true,
})

app.mount('#app')
