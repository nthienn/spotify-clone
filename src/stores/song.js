import { defineStore } from 'pinia'
import album from '../album.json'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentAlbum: null,
    currentTrack: null,
  }),

  actions: {
    loadSong(album, track) {
      this.currentAlbum = album
      this.currentTrack = track

      if (this.audio && this.audio.src) {
        this.audio.pause()
        this.isPlaying = false
        this.audio.src = ''
      }

      this.audio = new Audio()
      this.audio.src = track.path

      setTimeout(() => {
        this.isPlaying = true
        this.audio.play()
      }, 200)
    },

    playOrPauseSong() {
      if (this.audio.paused) {
        this.isPlaying = true
        this.audio.play()
      } else {
        this.isPlaying = false
        this.audio.pause()
      }
    },

    playOrPauseThisSong(album, track) {
      if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
        this.loadSong(album, track)
        return
      }
      this.playOrPauseSong()
    },

    prevSong(currentTrack) {
      if (currentTrack.id === 1) {
        const track = album.tracks[album.tracks.length - 1]
        this.loadSong(album, track)
      } else {
        const track = album.tracks[currentTrack.id - 2]
        this.loadSong(album, track)
      }
    },

    nextSong(currentTrack) {
      if (currentTrack.id === album.tracks.length) {
        const track = album.tracks[0]
        this.loadSong(album, track)
      } else {
        const track = album.tracks[currentTrack.id]
        this.loadSong(album, track)
      }
    },

    playFromFirst() {
      this.resetState()
      const track = album.tracks[0]
      this.loadSong(album, track)
    },

    resetState() {
      this.isPlaying = false
      this.audio = null
      this.currentAlbum = null
      this.currentTrack = null
    },
  },
  persist: true
})
