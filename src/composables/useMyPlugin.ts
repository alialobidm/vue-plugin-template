import { inject, ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

export interface UseMyPluginReturn {
  prefix: string
  count: Ref<number>
  doubleCount: ComputedRef<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useMyPlugin(): UseMyPluginReturn {
  const prefix = inject<string>('myPluginPrefix', 'Default')
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  const reset = () => {
    count.value = 0
  }

  return {
    prefix,
    count,
    doubleCount,
    increment,
    decrement,
    reset,
  }
}
