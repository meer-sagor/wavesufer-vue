import type { WaveSurferEvents } from 'wavesurfer.js'

export const waveServerEventsEmitter: Array<keyof WaveSurferEvents> = ['audioprocess', 'click', 'dblclick', 'decode', 'drag', 'finish', 'init', 'interaction', 'load', 'loading', 'pause', 'play', 'ready', 'redraw', 'redrawcomplete', 'scroll', 'seeking', 'timeupdate', 'zoom'];