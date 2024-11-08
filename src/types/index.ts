import { type WaveSurferOptions } from 'wavesurfer.js'
import type { Ref } from 'vue'
import type { useWaveSurferInstance } from '../composables/useWaveSurferInstance'
import type { useWaveSurferState } from '../composables/useWaveSurferState'

export type PartialWaveSurferOptions = Partial<Omit<WaveSurferOptions, 'container'>>

export type WaveSurferIns = {
  containerRef: Ref<HTMLElement | null>
  options: PartialWaveSurferOptions
}

export type UseWaveSurfer = ReturnType<typeof useWaveSurferInstance> &
  ReturnType<typeof useWaveSurferState>
