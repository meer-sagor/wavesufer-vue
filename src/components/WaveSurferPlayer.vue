<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'
import type { PartialWaveSurferOptions } from '../types'
import { useWaveSurfer } from '../composables/useWaveSurfer'
import { waveServerEventsEmitter } from '../eventsEmitter'

const props = defineProps<{
  options: PartialWaveSurferOptions
}>()

const containerRef = ref<HTMLElement | null>(null)
const { waveSurfer } = useWaveSurfer({ containerRef, options: props.options })
const instance = getCurrentInstance();

onMounted(() => {
  // Iterate through the manually defined eventsEmitter and dynamically emit them
  waveServerEventsEmitter.forEach((eventName) => {
    waveSurfer.value?.on(eventName, (...args) => {
      instance?.emit(eventName, ...args)
    })
  });
  instance?.emit('waveSurfer', waveSurfer.value)
})
</script>

<template>
  <div ref="containerRef"></div>
</template>