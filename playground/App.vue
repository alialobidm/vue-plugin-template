<template>
  <div id="app">
    <header>
      <h1>🎨 Vue Plugin Template Playground</h1>
      <p>Test your plugin in action!</p>
    </header>

    <main>
      <section class="section">
        <h2>1. Global Component (with custom prefix)</h2>
        <CustomComponent
          title="Custom Prefixed Component"
          message="This component was registered with a custom prefix using plugin options"
          button-text="Test Click"
          @click="handleComponentClick"
        />
      </section>

      <section class="section">
        <h2>2. Direct Component Import</h2>
        <MyComponent
          title="Directly Imported Component"
          message="This component was imported directly, not through the plugin"
          button-text="Direct Click"
          @click="handleComponentClick"
        />
      </section>

      <section class="section">
        <h2>3. Global Property</h2>
        <div class="card">
          <p>Global property test: {{ globalPropertyTest }}</p>
          <button @click="testGlobalProperty">Test Global Property</button>
        </div>
      </section>

      <section class="section">
        <h2>4. Composable Usage</h2>
        <div class="card">
          <p>
            Prefix from plugin: <strong>{{ prefix }}</strong>
          </p>
          <p>
            Count: <strong>{{ count }}</strong>
          </p>
          <p>
            Double Count: <strong>{{ doubleCount }}</strong>
          </p>
          <div class="button-group">
            <button @click="increment">Increment</button>
            <button @click="decrement">Decrement</button>
            <button @click="reset">Reset</button>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>5. Event Log</h2>
        <div class="card">
          <div v-if="events.length === 0" class="empty-state">No events yet</div>
          <ul v-else class="event-list">
            <li v-for="(event, index) in events" :key="index">{{ event }}</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { MyComponent, useMyPlugin } from '../src/index'

const events = ref<string[]>([])
const globalPropertyTest = ref('')

const { prefix, count, doubleCount, increment, decrement, reset } = useMyPlugin()

const handleComponentClick = (message: string) => {
  events.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (events.value.length > 10) {
    events.value.pop()
  }
}

const testGlobalProperty = () => {
  const instance = getCurrentInstance()
  if (instance?.appContext.config.globalProperties.$myPlugin) {
    globalPropertyTest.value =
      instance.appContext.config.globalProperties.$myPlugin.greet('Developer')
  }
}
</script>

<style scoped>
#app {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #213547;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  font-size: 2.5rem;
  color: #42b883;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.2rem;
  color: #666;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-top: 0;
  color: #35495e;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.card {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.card p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

button:hover {
  background-color: #35a372;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}

.event-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-list li {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #42b883;
  font-size: 0.9rem;
  font-family: 'Monaco', 'Courier New', monospace;
}

.empty-state {
  text-align: center;
  color: #999;
  font-style: italic;
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }

  header h1 {
    font-size: 2rem;
  }

  .section {
    padding: 1rem;
  }
}
</style>
