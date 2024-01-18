<script setup lang="ts">
import { ref } from 'vue'
import { useWaveSurfer } from '@/composables/useWaveSurfer'
const containerRef = ref<HTMLElement | null>(null)
const options = ref({
  height: 48,
  waveColor: 'gray',
  progressColor: 'red',
  barGap: 5,
  barWidth: 5,
  barRadius: 8,
  duration: 80,
  url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
})

const {waveSurfer, currentTime, totalDuration} = useWaveSurfer({containerRef, options: options.value})

const formatTime = (seconds: number):string => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
</script>

<template>
  <main>
    <h1>WaveSurferPlayer Using Composeable Method </h1>
    <div ref="containerRef"></div>
    <p>currentTime: {{formatTime(currentTime)}}</p>
    <p>totalDuration:{{formatTime(totalDuration)}}</p>
    <button @click="waveSurfer?.playPause()" :style="{ minWidth: '5em' }">
      Play
    </button>
  </main>
</template>

