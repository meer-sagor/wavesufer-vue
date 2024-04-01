import type { WaveSurferIns } from '../types'
import WaveSurfer from 'wavesurfer.js'
import { onMounted, onUnmounted, ref } from 'vue'

export const useWaveSurferInstance = ({containerRef, options}:WaveSurferIns) => {
    const waveSurfer = ref<WaveSurfer | null>(null)
    const createWaveSurfer = () => {
      if (containerRef.value) {
        waveSurfer.value = WaveSurfer.create({
          container: containerRef.value,
          ...options,
        });
      }
    };
    const destroyWaveSurfer = () => {
      if (waveSurfer.value) {
        waveSurfer.value.destroy();
        waveSurfer.value = null;
      }
    };
  
    onMounted(() => {
      createWaveSurfer()
    })
    onUnmounted(() => {
      destroyWaveSurfer()
    })
    return { waveSurfer }
  }