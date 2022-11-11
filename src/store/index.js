import Vue from 'vue'
import Vuex from 'vuex'
import {Myaxios} from '../apis/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://apis.netstart.cn/music',
    songList: [],
    playingMusic: null,
    audioPlayStatus: false,
    radioStation:null,
    playListStatus: false,
    currentTime: 0,
    duration: 0,
    songItemStatus: false,
    // 歌单组件
    songSheetSta: false,
    // 歌单id
    songSheetId: 0,
    // 是否是专辑详情
    isAlbum: false,
    // 是否展示全部专辑
    isAllAlbum: false,
    // 是否展示全部精选歌单
    isAllSongs: false,
    // 是否惦记了搜索框
    isBeginSearch: false,
    // 是否应该让音乐控制器下移
    isMoveControl: false
  },
  getters: {
  },
  mutations: {
    setPlayingMusic(state,music) {
      state.playingMusic = music
    },
    setAudioPlayStatus(state,status) {
      state.audioPlayStatus = status
    },
    setradioStation(state,radio) {
      state.radioStation = radio
    },
    setSongList(state,songList) {
      state.songList = songList
    },
    setPlayListStatus(state,isShow) {
      state.playListStatus = isShow
    },
    setSongItemStatus(state,status) {
      state.songItemStatus = status
    },
    setCurrentTime(state,time) {
      state.currentTime = time
    },
    setDuration(state,longTime) {
      state.duration = longTime
    },
    setSongSheetSta(state,status) {
      state.songSheetSta = status
    },
    setSongSheetId(state,id) {
      state.songSheetId = id
    },
    setIsAlbum(state,sta) {
      state.isAlbum = sta
    },
    setIsAllAlbum(state,status) {
      state.isAllAlbum = status
    },
    setIsAllSongs(state,status) {
      state.isAllSongs = status
    },
    setIsBeginSearch(state,status) {
      state.isBeginSearch = status
    },
    setIsMoveControl(state,status) {
      state.isMoveControl = status
    }
  },
  actions: {
    async setSongs({commit,state}) {
      let localsongs = localStorage.songlist
      if(localsongs) {
        localsongs = JSON.parse(localsongs)
      }else {
        let {data} = await Myaxios('/personalized/newsong', {limit: 12})
        localsongs = data.result
        localStorage.songlist = JSON.stringify(localsongs)
      }
      commit('setSongList',localsongs)
      // 判断是否已经有正在播的歌
      if (!state.playingMusic) {
        commit('setPlayingMusic', localsongs[0])
      }
    }
  },
  modules: {
  }
})
