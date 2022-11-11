<template>
    <div class="song-listitem">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <li v-for="(s,index) in songlists" :key="index" @click="changeMusic(s)">
                <div>
                    <!-- songlists[0].artists[0].img1v1Url -->
                    <div class="left" :class="{se: s.artists}" :style="{'background-image': `url(${s.artists? s.artists[0].img1v1Url:''})`}">
                        <img v-show="!isSearch && !s.artists" :src="s?.picUrl || s.al?.picUrl" v-lazy="s?.picUrl || s.al?.picUrl">
                    </div>
                    <div class="mid">
                        <div class="name">
                            <span>{{s?.name || s.al.name}}</span>
                            <div 
                                :class="[{signal: playingMusic.id == s.id},{'signal-active': audioPlayStatus}]" 
                                v-if="isPlayList || audioPlayStatus || myShow"
                            >
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        </div>
                        <span>{{artistsName(s)}}</span>
                    </div>
                </div>
                <div class="right">
                    <van-icon name="ellipsis" />
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
            myShow: false
        }
    },
    methods: {
        changeMusic(data) {
            this.myShow = true
            if(data.id != this.playingMusic.id) {
                // console.log('播放');
                this.$store.commit('setAudioPlayStatus',true)
            }else {
                this.$store.commit('setAudioPlayStatus',!this.audioPlayStatus)
            }
            this.$store.commit('setPlayingMusic',data)
        },
        artistsName(data) {
            if(this.isSearch) {
                return data.artists[0].name + '·' +  data.name
            }
            else if(data.song) {
                return data.song?.artists.map(v => v.name).join(' / ')
            }
            else if(data.artists) {
                return data.artists.map(v => v.name).join(' / ')
            }
            return data.ar.map(v => v.name).join(' / ')
        },
    },
    props: {
        songlists: Array,
        isPlayList: Boolean,
        isSearch: {
            type: Boolean,
            require: false
        }
    },
    computed: {
        ...mapState(['playingMusic','audioPlayStatus']),
        
    },
    watch: {
        playingMusic(newv) {
            if(this.songlists?.findIndex(v => v.id == newv.id) != -1) {
                this.myShow = true
            }
        }
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    $signalI1: signalI1;
    $signalI2: signalI2;
    $signalI3: signalI3;
    $signalI4: signalI4;
    @mixin signal-curr($name,$y,$end) {
        @keyframes #{$name} {
            0% {
                transform: scaleY(1);
            }
            25% {
                transform: scaleY($y);
            }
            50% {
                transform: scaleY($end);
            }
            100% {
                transform: scaleY(1);
            }
        }
    }
    
    .list {
        width: 335.2rem;
        flex: none;
    &>li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10rem;
            &>div {
                display: flex;
            }
        }
        .left,
        .se {
            border-radius: 6rem;
            img {
                border-radius: 6rem;
                width: 64rem;
                display: block;
            }
        }
        .se {
            width: 64rem;
            height: 64rem;
            background-size: cover;
        }
        .mid {
            box-sizing: border-box;
            padding-left: 15rem;
            flex: 2;
            min-width: 200rem;
            max-width: 230rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .name {
                display: flex;
                margin-top: 0;
                margin-bottom: 0;
                font-size: 14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                align-items: baseline;
                width: 100%;
                span {
                    display: inline-block;
                    max-width: calc(100% - 40rem);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #fff;
                }
            }
            .signal {
                margin-left: 10rem;
                i {
                    display: inline-block;
                    width: 3rem;
                    background-color: #fff;
                    margin-right: 2rem;
                    transform-origin: center bottom;
                    &:first-of-type {
                        animation: $signalI1 1.2s linear infinite;
                        @include signal-curr($signalI1,2.5,.5);
                        animation-play-state: paused;
                        height: 4rem;
                    }
                    &:nth-of-type(2) {
                        animation: $signalI2 .8s linear .2s infinite;
                        @include signal-curr($signalI2,1.67,0.33);
                        animation-play-state: paused;
                        height: 6rem;
                    }
                    &:nth-of-type(3) {
                        animation: $signalI3 1s linear .4s infinite;
                        @include signal-curr($signalI3,1.25,0.25);
                        animation-play-state: paused;
                        height: 8rem;
                    }
                    &:last-of-type {
                        animation: $signalI4 1.5s linear .6s infinite;
                        @include signal-curr($signalI4,1,0.2);
                        animation-play-state: paused;
                        height: 10rem;
                    }
                }
            }
            .signal-active {
                i {
                    &:nth-of-type(n) {
                        animation-play-state: running;
                    }
                }
            }
            span {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 13rem;
                color: #8d8d8d;
            }
        }
        .right {
            flex: none;
            display: flex;
            justify-content: center;
            align-items: center;
            .van-icon {
                font-size: 24rem;
                color: #8d8d8d;
            }
        }
    }
</style>