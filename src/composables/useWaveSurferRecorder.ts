import {computed, onMounted, ref} from "vue";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.js"
import type {WaveSurferIns} from "@/types";
import {useWaveSurferInstance} from "@/composables/useWaveSurferInstance";


export const useUseWaveSurferRecorder = ({ containerRef, options }: WaveSurferIns) => {
    const { waveSurfer } = useWaveSurferInstance({ containerRef, options })
    const waveSurferRecorder = ref<RecordPlugin | null>(null)
    const recordingTime = ref<number>(0)

    const currentTime = computed(() => {
        // time will be in milliseconds, convert it to mm:ss format
        return [
            Math.floor((recordingTime.value % 3600000) / 60000), // minutes
            Math.floor((recordingTime.value % 60000) / 1000), // seconds
        ]
            .map((v) => (v < 10 ? "0" + v : v))
            .join(":")
    })
    const isPaused = computed(() => waveSurferRecorder.value?.isPaused())
    const isRecording = computed(() => waveSurferRecorder.value?.isRecording())

    const startRecording = () => {
        if (waveSurferRecorder.value?.isRecording() || waveSurferRecorder.value?.isPaused()) {
            waveSurferRecorder.value?.stopRecording()
            return
        }
        waveSurferRecorder.value?.startRecording()
        if (waveSurferRecorder.value) {
            waveSurferRecorder.value?.on("record-progress", (time) => {
                recordingTime.value = time
            })
        }
    }
    const stopRecording = (): Promise<Blob> => {
        return new Promise((resolve) => {
            let blob: Blob
            if (waveSurferRecorder.value?.isRecording() || waveSurferRecorder.value?.isPaused()) {
                waveSurferRecorder.value?.stopRecording()
            }
            waveSurferRecorder.value?.on("record-end", (b: Blob) => {
                blob = b
                resolve(blob)
            })
        })
    }

    const resumeRecording = () => {
        if (waveSurferRecorder.value?.isPaused()) {
            waveSurferRecorder.value?.resumeRecording()
            return
        }
        waveSurferRecorder.value?.pauseRecording()
    }

    onMounted(() => {
        const recordIns = waveSurfer.value?.registerPlugin(RecordPlugin.create({ renderRecordedAudio: false }))
        if (recordIns) {
            waveSurferRecorder.value = recordIns
        }
    })
    return {
        waveSurfer,
        waveSurferRecorder,
        currentTime,
        isPaused,
        isRecording,
        startRecording,
        stopRecording,
        resumeRecording,
    }
}
