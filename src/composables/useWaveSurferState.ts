import type { Ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'
import { onMounted, onUnmounted, ref } from 'vue'

export const useWaveSurferState = (wavesurfer: Ref<WaveSurfer | null>) => {
  const isReady = ref<boolean>(false)
  const isPlaying = ref<boolean>(false)
  const currentTime = ref<number>(0)
  const totalDuration = ref<number>(0)

  const handleLoad = () => {
    isReady.value = false
    isPlaying.value = false
    currentTime.value = 0
  }

  const handleReady = (duration: number) => {
    isReady.value = true
    isPlaying.value = false
    currentTime.value = 0
    totalDuration.value = duration
  }

  const handlePlay = () => {
    isPlaying.value = true
  }

  const handlePause = () => {
    isPlaying.value = false
  }

  const handleTimeUpdate = () => {
    if (wavesurfer.value) currentTime.value = wavesurfer.value.getCurrentTime()
  }

  const handleDestroy = () => {
    isReady.value = false
    isPlaying.value = false
  }

  onMounted(() => {
    if (!wavesurfer.value) return
    wavesurfer.value.on('load', handleLoad)
    wavesurfer.value.on('ready', handleReady)
    wavesurfer.value.on('play', handlePlay)
    wavesurfer.value.on('pause', handlePause)
    wavesurfer.value.on('timeupdate', handleTimeUpdate)
    wavesurfer.value.on('destroy', handleDestroy)
  })

  onUnmounted(() => {
    if (wavesurfer.value) {
      wavesurfer.value.unAll()
      // wavesurfer.value.un('load', handleLoad);
      // wavesurfer.value.un('ready', handleReady);
      // wavesurfer.value.un('play', handlePlay);
      // wavesurfer.value.un('pause', handlePause);
      // wavesurfer.value.un('timeupdate', handleTimeUpdate);
      // wavesurfer.value.un('destroy', handleDestroy);
    }
  })
  return {
    isReady,
    isPlaying,
    currentTime,
    totalDuration
  }
}
