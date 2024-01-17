<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import WaveSurfer, { type WaveSurferEvents, type WaveSurferOptions } from 'wavesurfer.js'


type PartialWaveSurferOptions = {
  options: Omit<WaveSurferOptions, "container">
}
const props = defineProps<PartialWaveSurferOptions>()

const containerRef = ref<HTMLElement | null>(null)
const wavesurfer = ref<WaveSurfer | null>(null)
  const instance = getCurrentInstance();
  
const eventsToHandle: Array<keyof WaveSurferEvents> = ['audioprocess', 'click', 'dblclick', 'decode', 'drag', 'finish', 'init', 'interaction', 'load', 'loading', 'pause', 'play', 'ready', 'redraw', 'redrawcomplete', 'scroll', 'seeking', 'timeupdate', 'zoom'];


const createWaveSurfer = () => {
  if (containerRef.value) {
    wavesurfer.value = WaveSurfer.create({
      container: containerRef.value,
      ...props.options,
    });
     // Iterate through the manually defined events and dynamically emit them
     eventsToHandle.forEach((eventName) => {
      wavesurfer.value?.on(eventName, (...args)=>{
        // console.log('args ======', ...args);
        
        instance?.emit(eventName, ...args)
      })
    });
    
  }
};

const destroyWaveSurfer = () => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
    wavesurfer.value = null;
  }
};

onMounted(() => {
  createWaveSurfer()
})
onUnmounted(() => {
  destroyWaveSurfer()
})

</script>

<template>
  <div ref="containerRef"></div>
</template>