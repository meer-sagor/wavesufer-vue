import { type WaveSurferOptions } from 'wavesurfer.js'
import type { Ref } from 'vue'
import type { useWaveSurferInstance } from '../composables/useWaveSurferInstance'
import type { useWaveSurferState } from '../composables/useWaveSurferState'
import type { RecordPluginOptions } from 'wavesurfer.js/dist/plugins/record'
import type { ZoomPluginOptions } from 'wavesurfer.js/dist/plugins/zoom'
import type { TimelinePluginOptions } from 'wavesurfer.js/dist/plugins/timeline'
import type { HoverPluginOptions } from 'wavesurfer.js/dist/plugins/hover'
import type { SpectrogramPluginOptions } from 'wavesurfer.js/dist/plugins/spectrogram'
import type { EnvelopePluginOptions } from 'wavesurfer.js/dist/plugins/envelope'
import type { MinimapPluginOptions } from 'wavesurfer.js/dist/plugins/minimap'

export type PartialWaveSurferOptions = Partial<Omit<WaveSurferOptions, 'container'>>

export type WaveSurferIns = {
  containerRef: Ref<HTMLElement | null>
  options: PartialWaveSurferOptions
}

export type UseWaveSurfer = ReturnType<typeof useWaveSurferInstance> &
  ReturnType<typeof useWaveSurferState>

export type Plugins = {
  regions: any
  timeline: TimelinePluginOptions
  zoom: ZoomPluginOptions
  minimap: MinimapPluginOptions
  envelope: EnvelopePluginOptions
  spectrogram: SpectrogramPluginOptions
  hover: HoverPluginOptions
}

export type UseWaveSurferRecorder = WaveSurferIns & {
  recordPluginOptions?: RecordPluginOptions
}
