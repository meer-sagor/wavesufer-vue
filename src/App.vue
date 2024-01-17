<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useWaveSurfer } from '@/composables/useWaveSurfer'
import WaveSurferPlayer from './components/WaveSurferPlayer.vue';
const containerRef = ref<HTMLElement | null>(null)


const options = ref({
  height: 80,
  waveColor: 'gray',
  progressColor: 'red',
  barGap: 5,
  barWidth: 5,
  barRadius: 8,
  duration: 80,
  // cursorWidth: 0,
  url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
})



// const { wavesurfer } = useWaveSurfer({
//   containerRef, options: options.value
// })


const clickHandler = (args:any)=>{
  // console.log('you Click x', x);
  // console.log('your click y', y);
  console.log('args',args);
  
  
}


</script>

<template>
  <main>
    <h1>Hello world</h1>
    <!-- <div ref="containerRef"></div> -->
    <!-- <p>getDuration: {{ wavesurfer?.getDuration() }} </p>

    <p>getCurrentTime: {{ wavesurfer?.getCurrentTime() }}</p>

    <p>isPlaying: {{ wavesurfer?.isPlaying() }}</p>


    <button @click="() => wavesurfer?.playPause()" :style="{ minWidth: '5em' }">
      Play
    </button> -->

    <br>
    <WaveSurferPlayer 
      :options="options"
      @click="(args)=>clickHandler(args)"
      />
  </main>
</template>

