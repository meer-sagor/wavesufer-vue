import { type WaveSurferOptions } from 'wavesurfer.js'
import type { Ref } from 'vue'
import type { useWaveSurferInstance } from '../composables/useWaveSurferInstance'
import type { useWaveSurferState } from '../composables/useWaveSurferState'

export type PartialWaveSurferOptions = Omit<WaveSurferOptions, 'container'>

export type WaveSurferIns = {
  containerRef: Ref<HTMLElement | null>
  options: Partial<PartialWaveSurferOptions>
}

export type UseWaveSurfer = ReturnType<typeof useWaveSurferInstance> &
  ReturnType<typeof useWaveSurferState>
