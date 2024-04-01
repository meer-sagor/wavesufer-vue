<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWaveSurferRecorder } from '@meersagor/wavesurfer-vue'
const showAudioRecordButton = ref<boolean>(true)
const containerRef = ref<HTMLDivElement | null>(null)

const options = computed(() => ({
    height: 48,
    waveColor: "#66667D",
    progressColor: "#6A24FF",
    barGap: 5,
    barWidth: 5,
    barRadius: 8,
    cursorWidth: 0,
    url: "https://revews-bucket.s3.ap-southeast-1.amazonaws.com/a06mmMU3sgnzuUkH4OiHvyuUgCFdLSnJaDLBao7y.webm",
}))

const { pauseRecording, startRecording, stopRecording, currentTime, isPauseResume } = useWaveSurferRecorder({
    containerRef,
    options: options.value,
})

const startAudioRecordHandler = () => {
    startRecording()
    showAudioRecordButton.value = false
}

const stopHandler = async () => {
    const blob = await stopRecording()
    console.log('blob =====', blob);
    showAudioRecordButton.value = true
}
</script>

<template>
    <div>
        <div>
            <div ref="containerRef"></div>
        </div>
        <p>{{ currentTime }}</p>
        <button v-if="showAudioRecordButton" @click="startAudioRecordHandler"> Start Recording </button>
        <div v-else>
            <button @click="pauseRecording">{{ isPauseResume ? 'pause' : 'resume' }}</button>
            <button @click="stopHandler">Stop</button>
        </div>
    </div>
</template>