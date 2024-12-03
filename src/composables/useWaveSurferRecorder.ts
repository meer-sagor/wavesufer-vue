import {computed, onMounted, ref} from "vue";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.js"
import {useWaveSurferInstance} from "./useWaveSurferInstance";
import type { UseWaveSurferRecorder } from '../types'


export const useWaveSurferRecorder = ({ containerRef, options, recordPluginOptions }: UseWaveSurferRecorder) => {
    const { waveSurfer } = useWaveSurferInstance({ containerRef, options })
    const waveSurferRecorder = ref<RecordPlugin | null>(null)
    const recordingTime = ref<number>(0)

    const isRecording = ref<boolean>(false)
    const isPaused = ref<boolean>(false)

    const currentTime = computed<string>(() => {
        // time will be in milliseconds, convert it to mm:ss format
        return [
            Math.floor((recordingTime.value % 3600000) / 60000), // minutes
            Math.floor((recordingTime.value % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? "0" + v : v))
            .join(":")
    })
    const isPauseResume = computed<boolean>(() => isRecording.value || !isPaused.value)
    

    const recordProcessStart = () => {
        if (waveSurferRecorder.value) {
            waveSurferRecorder.value?.on("record-progress", (time) => {
                recordingTime.value = time
            })
        }
    }

    const startRecording = () => {
        if (waveSurferRecorder.value?.isRecording() || waveSurferRecorder.value?.isPaused()) {
            waveSurferRecorder.value?.stopRecording()
            isRecording.value = false
            isPaused.value = true
            return
        }
        waveSurferRecorder.value?.startRecording()
        isRecording.value = true
        isPaused.value = false
        recordProcessStart()
    }
    const stopRecording = (): Promise<Blob> => {
        return new Promise((resolve) => {
            let blob: Blob
            if (waveSurferRecorder.value?.isRecording() || waveSurferRecorder.value?.isPaused()) {
                waveSurferRecorder.value?.stopRecording()
                isRecording.value = false
                isPaused.value = false
            }
            waveSurferRecorder.value?.on("record-end", (b: Blob) => {
                blob = b
                resolve(blob)
            })
        })
    }

    const pauseRecording = () => {
        if (waveSurferRecorder.value?.isPaused()) {
            waveSurferRecorder.value?.resumeRecording()
            isRecording.value = true
            isPaused.value = false
            return
        }
        isRecording.value = false
        isPaused.value = true
        waveSurferRecorder.value?.pauseRecording()
    }

    onMounted(() => {
        const recordIns = waveSurfer.value?.registerPlugin(RecordPlugin.create({
            renderRecordedAudio: false,
            ...recordPluginOptions
        }))
        if (recordIns) {
            waveSurferRecorder.value = recordIns
        }
    })
    return {
        waveSurfer,
        waveSurferRecorder,
        currentTime,
        startRecording,
        stopRecording,
        pauseRecording,
        isRecording,
        isPaused,
        isPauseResume,
    }
}
