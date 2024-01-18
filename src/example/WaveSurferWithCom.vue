<script setup lang="ts">
import { ref } from 'vue'
import type WaveSurfer from 'wavesurfer.js'

import WaveSurferPlayer from '@/components/WaveSurferPlayer.vue';

const options = ref({
  height: 48,
  waveColor: 'gray',
  progressColor: 'red',
  barGap: 5,
  barWidth: 5,
  barRadius: 8,
  duration: 80,
  // cursorWidth: 0,
  url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
})

const currentTime = ref<string>('00:00')
const totalDuration = ref<string>('00:00')
const waveSurfer = ref<WaveSurfer | null>(null)

const formatTime = (seconds: number):string => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

const timeUpdateHandler = (time: number)=>{
  currentTime.value = formatTime(time)
}
const readyHandler = (duration: any)=>{
  totalDuration.value = formatTime(duration)
}
const readyWaveSurferHandler= (ws:WaveSurfer)=>{
  waveSurfer.value = ws
}
</script>

<template>
  <main>
    <h1>WaveSurferPlayer Using Components </h1>
    <WaveSurferPlayer
      :options="options"
      @timeupdate="(time:number)=>timeUpdateHandler(time)"
      @ready="(duration:number)=>readyHandler(duration)"
      @waveSurfer="(ws:WaveSurfer)=>readyWaveSurferHandler(ws)"
    />
    <p> currentTime: {{currentTime}}</p>
    <p>totalDuration:{{totalDuration}}</p>
    <button @click="waveSurfer?.playPause()" :style="{ minWidth: '5em' }">
      Play
    </button>
  </main>
</template>

