import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import WaveSurfer, { type WaveSurferEvents, type WaveSurferOptions } from 'wavesurfer.js'


type WavesurferEventHandler<T extends unknown[]> = (wavesurfer: WaveSurfer, ...args: T) => void

type OnWavesurferEvents = {
  [K in keyof WaveSurferEvents as `on${Capitalize<K>}`]?: WavesurferEventHandler<WaveSurferEvents[K]>
}
type PartialWavesurferOptions = Omit<WaveSurferOptions, "container">
export type WavesurferProps = PartialWavesurferOptions & OnWavesurferEvents

type WaveSurferIns = {
  containerRef: Ref<HTMLElement | null>,
  options: Partial<PartialWavesurferOptions>
}

const useWavesurferInstance = ({containerRef, options}:WaveSurferIns) => {
  const wavesurfer = ref<WaveSurfer | null>(null)
  const createWaveSurfer = () => {
    if (containerRef.value) {
      wavesurfer.value = WaveSurfer.create({
        container: containerRef.value,
        ...options,
      });
    }
  };

  const destroyWaveSurfer = () => {
    if (wavesurfer.value) {
      wavesurfer.value.destroy();
      wavesurfer.value = null;
    }
  };

  onMounted(() => {
    createWaveSurfer()
  })
  onUnmounted(() => {
    destroyWaveSurfer()
  })
  return { wavesurfer }
}

// const useWaveSurferState = (wavesurfer:Ref<WaveSurfer>)=> {
//   const isReady = ref<boolean>(false);
//   const isPlaying = ref<boolean>(false);
//   const currentTime = ref<number>(0);

//   const handleLoad = () => {
//     isReady.value = false;
//     isPlaying.value = false;
//     currentTime.value = 0;
//   };

//   const handleReady = () => {
//     isReady.value = true;
//     isPlaying.value = false;
//     currentTime.value = 0;
//   };

//   const handlePlay = () => {
//     isPlaying.value = true;
//   };

//   const handlePause = () => {
//     isPlaying.value = false;
//   };

//   const handleTimeUpdate = () => {
//     currentTime.value = wavesurfer.value.getCurrentTime();
//   };

//   const handleDestroy = () => {
//     isReady.value = false;
//     isPlaying.value = false;
//   };

//   onMounted(() => {
//     if (!wavesurfer.value) return;
//     wavesurfer.value.on('load', handleLoad);
//     wavesurfer.value.on('ready', handleReady);
//     wavesurfer.value.on('play', handlePlay);
//     wavesurfer.value.on('pause', handlePause);
//     wavesurfer.value.on('timeupdate', handleTimeUpdate);
//     wavesurfer.value.on('destroy', handleDestroy);
//   });

//   onUnmounted(() => {
//     if (wavesurfer.value) {
//       wavesurfer.value.un('load', handleLoad);
//       wavesurfer.value.un('ready', handleReady);
//       wavesurfer.value.un('play', handlePlay);
//       wavesurfer.value.un('pause', handlePause);
//       wavesurfer.value.un('timeupdate', handleTimeUpdate);
//       wavesurfer.value.un('destroy', handleDestroy);
//     }
//   });

//     // Watch for changes in wavesurfer to handle reactivity
//     watch(wavesurfer, (newWavesurfer) => {
//       if (newWavesurfer) {
//         // Cleanup previous wavesurfer events
//         handleDestroy();
  
//         // Attach events to the new wavesurfer instance
//         newWavesurfer.on('load', handleLoad);
//         newWavesurfer.on('ready', handleReady);
//         newWavesurfer.on('play', handlePlay);
//         newWavesurfer.on('pause', handlePause);
//         newWavesurfer.on('timeupdate', handleTimeUpdate);
//         newWavesurfer.on('destroy', handleDestroy);
//       }
//     });

//   return {
//     isReady,
//     isPlaying,
//     currentTime,
//   };
// }

// const EVENT_PROP_RE = /^on([A-Z])/;
// const isEventProp = (key: string) => EVENT_PROP_RE.test(key);
// const getEventName = (key: string) => key.replace(EVENT_PROP_RE, (_, $1) => $1.toLowerCase()) as keyof WaveSurferEvents;

/**
 * Parse props into wavesurfer options and events
 */
// function useWavesurferProps(props: WavesurferProps): [ComputedRef<PartialWavesurferOptions>, ComputedRef<OnWavesurferEvents>] {
//   const allOptions = ref<PartialWavesurferOptions>({ ...props });
//   const allEvents = ref<OnWavesurferEvents>({ ...props });

//   for (const key in allOptions.value) {
//     if (isEventProp(key)) {
//       delete allOptions.value[key as keyof WavesurferProps];
//     } else {
//       delete allEvents.value[key as keyof WavesurferProps];
//     }
//   }

//   // Computed properties for reactive results
//   const options = computed(() => allOptions.value);
//   const events = computed(() => {
//     const result: OnWavesurferEvents = {};
//     for (const key in allEvents.value) {
//       const eventName = getEventName(key);
//       result[eventName] = allEvents.value[key];
//     }
//     return result;
//   });

//   return [options, events];
// }





export const useWaveSurfer = ({containerRef, options}:WaveSurferIns): ReturnType<typeof useWavesurferInstance>=>{
  const {wavesurfer} = useWavesurferInstance({containerRef, options})
  // const state = useWaveSurferState(wavesurfer)

  // console.log('currentTime ======', state.currentTime.value);
  // console.log('state ======', state);
  
  return {
    wavesurfer,
  }
}

