<template>
    <div id="app">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <keep-alive>
		<router-view v-if="$route.meta.keep"/>
        </keep-alive>
        <transition :name="transitionName">
            <router-view v-if="!$route.meta.keep"/>
        </transition>
        

        <van-popup
            lazy-render
            :value="songSheetSta && !isAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <SongSheet />
        </van-popup>

        <van-popup
            lazy-render
            :value="songItemStatus" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <song-item :currentT="currentT" :durationT="durationT" @setAudioTime="setAudioTime"/>
        </van-popup>
        <transition name="playcontrol-move">
            <play-control v-show="!songItemStatus && !isBeginSearch && !$route.meta.hiddenCol" :class="{showlist: playListStatus || songSheetSta || isAllAlbum || isAllSongs || isMoveControl || $route.meta.hidden}"/>
        </transition>
        <!-- https://music.163.com/song/media/outer/url?id=id.mp3 -->
        <audio ref="audio" 
            @canplay="getTime"
            @timeupdate="getCurrentTime"
            @error="getErr"
            @ended="musicEnd"
            :src="`https://music.163.com/song/media/outer/url?id=${this.playingMusic?.id}.mp3`"
        ></audio>
		<transition name="tabbar-move">
            <van-tabbar v-model="active" fixed route active-color="#fff" :border="false" v-show="!playListStatus && !songSheetSta && !isBeginSearch && !isMoveControl && !$route.meta.hidden">
                <van-tabbar-item v-for="(item,index) in tabbarIcons" :key="index" :to="item.path">
                    <template #icon="props">
                        <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
        <van-popup 
            lazy-render
            :value="playListStatus" position="bottom" round @click-overlay="$store.commit('setPlayListStatus',!playListStatus)"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        > 
            <play-list :playType="playType" @setPlayType="setPlayType"/>
        </van-popup>
    </div>
</template>
<script>
import PlayControl from './components/Home/PlayControl.vue';
import {mapState,mapActions, mapMutations} from 'vuex'
import PlayList from './components/Home/PlayList.vue';
import SongItem from './components/SongItem.vue';
import SongSheet from './components/SongSheet.vue';
import { Toast } from 'vant';
export default {
    components: { PlayControl, PlayList, SongItem,SongSheet },
    data() {
        return {
			active: 0,
            tabbarIcons: [
                {
                    path: '/home',
                    name: 'home',
                    text: '首页',
                    activeIcon: require('./assets/Icons/home-active.png'),
                    inactiveIcon: require('./assets/Icons/home-inactive.png')
                },
                // {
                //     path: '/discover',
                //     name: 'discover',
                //     text: '发现',
                //     activeIcon: require('./assets/Icons/discover-active.png'),
                //     inactiveIcon: require('./assets/Icons/discover-inactive.png')
                // },
                {
                    path: '/discover',
                    name: 'discover',
                    text: '首页',
                    activeIcon: require('./assets/Icons/discover-active.png'),
                    inactiveIcon: require('./assets/Icons/discover-inactive.png')
                },
                {
                    path: '/search',
                    name: 'search',
                    text: '搜索',
                    activeIcon: require('./assets/Icons/search-active.png'),
                    inactiveIcon: require('./assets/Icons/search-inactive.png')
                },
                {
                    path: '/my',
                    name: 'my',
                    text: '我的',
                    activeIcon: require('@/assets/Icons/My-active.png'),
                    inactiveIcon: require('@/assets/Icons/My-inactive.png')
                },
            ],
            currentT: '',
            durationT: '',
            transitionName: '',
            playType: 0
		};
    },
    methods: {
        ...mapActions(['setSongs']),
        ...mapMutations(['setDuration','setCurrentTime','setAudioPlayStatus','setPlayingMusic']),
        formatTime(time) {
            let m = ( Math.floor(time / 60) + 100 + '').slice(1)
            let s = ( Math.floor(time % 60) + 100 + '').slice(1)
            return `${m}:${s}`
        },
        getTime() {
            this.durationT = this.formatTime(this.$refs.audio.duration)
            this.setDuration(this.$refs.audio.duration)
            this.getCurrentTime()
        },
        getCurrentTime() {
            this.setCurrentTime(this.$refs.audio.currentTime)
            this.currentT = this.formatTime(this.$refs.audio.currentTime)
        },
        setAudioTime(value) {
            this.$refs.audio.currentTime = value
        },
        getErr() {
            console.log('error!!!');
            this.setAudioPlayStatus(!this.audioPlayStatus)
            Toast.fail('音频资源加载失败！请切换')
            // this.$refs.audio.load()
        },
        changeTainsiton(value) {
            console.log('修改transitionName',value);
            this.transitionName = value
        },
        setPlayType(value){
            this.playType = value
        },
        musicEnd() {
            console.log('播放结束');
            // 切换下一首,需要判断当前播放模式，动态的更新下一首的下标
            if(this.playType == 0) {
                // 顺序播放
                this.$refs.audio.loop = false
                let findIndex = this.songList.findIndex(v => v.id == this.playingMusic.id)
                if(findIndex == this.songList.length - 1) {
                    // 已播放完最后一首 播放状态设置false 提示用户
                    this.setAudioPlayStatus(false)
                    Toast('列表播放完毕')
                    return 
                }
                this.setPlayingMusic(this.songList[findIndex + 1])
            }
            else if(this.playType == 1) {
                // 随机播放  
                this.$refs.audio.loop = false
                let ranIndex = Math.floor(Math.random() * this.songList.length)
                this.setPlayingMusic(this.songList[ranIndex])
            }
            else {
                // 单曲循环
                this.$refs.audio.loop = true
                this.$refs.audio.load()
                setTimeout(() => {
                    this.$refs.audio.play()
                }, 4);
            }
        }
    },
    computed: {
        ...mapState(
            ['songList','playListStatus','playingMusic','audioPlayStatus','songItemStatus',
            'songSheetSta','isAlbum','isAllAlbum','isAllSongs','isBeginSearch','isMoveControl']
            )
    },
    watch: {
        audioPlayStatus(val) {
            // console.log(val);
            if(val) {
                if(this.playingMusic.id == this.songList[this.songList.length - 1].id) {
                    this.$refs.audio.load()
                    setTimeout(() => {
                        this.$refs.audio.play()
                    }, 4);
                }else {
                    this.$refs.audio.play()
                }
            }else {
                this.$refs.audio.pause()
            }
        },
        playingMusic() {
            if(this.audioPlayStatus) {
                console.log('切换音乐');
                this.$refs.audio.load()
                this.setCurrentTime(0)
                setTimeout(() => {
                    this.$refs.audio.play()
                }, 4);
                // this.$nextTick(() => {
                //     this.$refs.audio.play()
                // })
            }
        },
        $route(to,from) {
            console.log(to,from);
            if(to.name == 'mv' && from.name != null || from.name == 'search' && to.name=="artist"){
                // console.log(to);
                this.transitionName = 'mvfade'
            }else {
                this.transitionName = ''
            }
            
        }
    },
    created() {
        this.setSongs()
	},
};
</script>
<style lang="scss" scoped>

$tabbar-height: 60rem;

#app {
    height: 100vh;
    background-color: #1a1a1a;
    .van-tabbar {
        height: $tabbar-height;
        background-color: #1a1a1a;
    }
    .van-tabbar-item--active {
        background-color: #1a1a1a;
    }
    .van-tabbar-item__icon img {
        height: 30rem;
    }
    .van-popup {
        // z-index: 2002;
        background-color: transparent;
    }
    .showlist {
        transform: translateY(55rem);
    }
    .tabbar-move-enter,
    .tabbar-move-leave-to {
        transform: translateY(60rem);
    }
    .tabbar-move-enter-active {
        transition: all 0s linear .3s;
    }
    .tabbar-move-to,
    .tabbar-move-leave {
        transform: translateY(0);
    }
    .tabbar-move-leave-active {
        transition: all 0s linear;
    }
    .playcontrol-move-enter,
    .playcontrol-move-leave-to {
        transform: translateY(110rem);
    }

    .playcontrol-move-enter-active,
    .playcontrol-move-leave-active {
        transition: all 0.1s linear;
    }
    .playcontrol-move-to,
    .playcontrol-move-leave {
        transform: translateY(0);
    }

    .mvfade-enter{
        transform: translateX(100%);
    }
    .mvfade-enter-active{
        transition: all .3s ease-in-out;
    }
    .mvfade-enter-to {
        transform: translateX(0);
    }

}
</style>