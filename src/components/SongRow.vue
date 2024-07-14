<script setup>
import { ref, toRefs, onMounted } from "vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import { useSongStore } from "../stores/song";
import { storeToRefs } from "pinia";

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);

const isHover = ref(false);
const isTrackTime = ref(null);

const props = defineProps({
  track: Object,
  index: Number,
});
const { track, index } = toRefs(props);

onMounted(() => {
  const audio = new Audio(track.value.path);
  audio.addEventListener("loadedmetadata", function () {
    const duration = audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTime.value = minutes + ":" + seconds.toString().padStart(2, "0");
  });
});
</script>

<template>
  <li
    class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex items-center w-full py-1.5">
      <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
        <Play
          v-if="!isPlaying"
          fillColor="#FFFFFF"
          :size="25"
          @click="useSong.playOrPauseThisSong(album, track)"
        />
        <Play
          v-else-if="isPlaying && currentTrack.name !== track.name"
          fillColor="#FFFFFF"
          :size="25"
          @click="useSong.loadSong(album, track)"
        />
        <Pause
          v-else
          fillColor="#FFFFFF"
          :size="25"
          @click="useSong.playOrPauseSong()"
        />
      </div>
      <div v-else class="text-gray-400 font-semibold w-[40px] ml-5">
        <span
          :class="{
            'text-green-500': currentTrack && currentTrack.name === track.name,
          }"
        >
          {{ index }}
        </span>
      </div>

      <div class="flex items-center">
        <img width="60" :src="track.image" />
        <div class="ml-3">
          <div class="text-white font-semibold hover:underline cursor-pointer">
            <span
              :class="{
                'text-green-500':
                  currentTrack && currentTrack.name === track.name,
              }"
              >{{ track.name }}</span
            >
          </div>
          <div
            class="text-sm font-semibold text-gray-400 hover:underline hover:text-white cursor-pointer"
          >
            {{ track.singer }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <button type="button" v-if="isHover">
        <Heart fillColor="#1BD760" :size="22" />
      </button>
      <div v-if="isTrackTime" class="text-sm mx-5 text-gray-400">
        {{ isTrackTime }}
      </div>
    </div>
  </li>
</template>
