import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import { defineComponent, h } from 'vue'
import { useMyPlugin } from '../src/composables/useMyPlugin'

interface TestComponentInstance {
  prefix?: string
  count?: number
  doubleCount?: number
  increment?: () => void
  decrement?: () => void
  reset?: () => void
}

describe('useMyPlugin', () => {
  it('returns default prefix when not provided', () => {
    const TestComponent = defineComponent({
      setup() {
        const { prefix } = useMyPlugin()
        return { prefix }
      },
      render() {
        return h('div', this.prefix)
      },
    })

    const app = createApp(TestComponent)
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance
    expect(mounted.prefix).toBe('Default')
  })

  it('returns custom prefix when provided by plugin', () => {
    const TestComponent = defineComponent({
      setup() {
        const { prefix } = useMyPlugin()
        return { prefix }
      },
      render() {
        return h('div', this.prefix)
      },
    })

    const app = createApp(TestComponent)
    app.provide('myPluginPrefix', 'Custom')
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance
    expect(mounted.prefix).toBe('Custom')
  })

  it('count starts at 0', () => {
    const TestComponent = defineComponent({
      setup() {
        const { count } = useMyPlugin()
        return { count }
      },
      render() {
        return h('div', String(this.count))
      },
    })

    const app = createApp(TestComponent)
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance
    expect(mounted.count).toBe(0)
  })

  it('increment increases count', () => {
    const TestComponent = defineComponent({
      setup() {
        const { count, increment } = useMyPlugin()
        return { count, increment }
      },
      render() {
        return h('div', String(this.count))
      },
    })

    const app = createApp(TestComponent)
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance

    expect(mounted.count).toBe(0)
    mounted.increment?.()
    expect(mounted.count).toBe(1)
    mounted.increment?.()
    expect(mounted.count).toBe(2)
  })

  it('decrement decreases count', () => {
    const TestComponent = defineComponent({
      setup() {
        const { count, increment, decrement } = useMyPlugin()
        return { count, increment, decrement }
      },
      render() {
        return h('div', String(this.count))
      },
    })

    const app = createApp(TestComponent)
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance

    mounted.increment?.()
    mounted.increment?.()
    expect(mounted.count).toBe(2)
    mounted.decrement?.()
    expect(mounted.count).toBe(1)
  })

  it('reset sets count to 0', () => {
    const TestComponent = defineComponent({
      setup() {
        const { count, increment, reset } = useMyPlugin()
        return { count, increment, reset }
      },
      render() {
        return h('div', String(this.count))
      },
    })

    const app = createApp(TestComponent)
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance

    mounted.increment?.()
    mounted.increment?.()
    mounted.increment?.()
    expect(mounted.count).toBe(3)
    mounted.reset?.()
    expect(mounted.count).toBe(0)
  })

  it('doubleCount returns count * 2', () => {
    const TestComponent = defineComponent({
      setup() {
        const { count, doubleCount, increment } = useMyPlugin()
        return { count, doubleCount, increment }
      },
      render() {
        return h('div', String(this.doubleCount))
      },
    })

    const app = createApp(TestComponent)
    const mounted = app.mount(document.createElement('div')) as TestComponentInstance

    expect(mounted.doubleCount).toBe(0)
    mounted.increment?.()
    expect(mounted.doubleCount).toBe(2)
    mounted.increment?.()
    expect(mounted.doubleCount).toBe(4)
  })
})
