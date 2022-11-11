<template>
    <div class="play-control">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="box">
            <div class="left">
                <div @click="toggleItem">
                    <img src="@/assets/imgs/daily_album_bg.png" :class="{'disc-active': audioPlayStatus}" class="disc">
                    <img :src="playingMusic.picUrl || playingMusic.al?.picUrl || playingMusic.artists[0].img1v1Url" class="music" :class="{'disc-active': audioPlayStatus}">
                </div>
                <span>{{playingMusic.name}} - {{artistsName(playingMusic.artists) || artistsName(playingMusic.song?.artists)}}</span>
            </div>
            <div class="right">
                <van-icon name="play" v-show="!audioPlayStatus" @click="$store.commit('setAudioPlayStatus',true)"/>
                <van-icon name="pause" v-show="audioPlayStatus" @click="$store.commit('setAudioPlayStatus',false)"/>
                <van-icon name="bars" @click="$store.commit('setPlayListStatus',!playListStatus)"/>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations(['setSongItemStatus','setPlayListStatus']),
        artistsName(data) {
            return data?.map(v => v.name).join(' / ')
        },
        toggleItem() {
            this.setPlayListStatus(false)
            this.$nextTick(() => {
                this.setSongItemStatus(!this.songItemStatus)
            })
        }
    },
    computed: {
        ...mapState(['playingMusic','audioPlayStatus','playListStatus','songItemStatus'])
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    @keyframes discActive {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .play-control {
        position: fixed;
        bottom: 65rem;
        box-sizing: border-box;
        width: 100vw;
        padding: 0 20rem;
        z-index: 2048;
        transition: all .3s linear;
        .box {
            display: flex;
            justify-content: space-between;
            border-radius: 25rem;
            width: 100%;
            box-sizing: border-box;
            padding: 8rem 15rem 8rem 0;
            background-color: rgba(77, 77, 77,.9);
            // height: 50rem;
            .left {
                display: flex;
                align-items: center;
                position: relative;
                box-sizing: border-box;
                padding-left: 60rem;
                width: calc(100% - 75rem);
                &>div {
                    flex: none;
                    position: absolute;
                    top: -17rem;
                    left: -4rem;
                }
                .disc {
                    animation: discActive 5s linear infinite;
                    animation-play-state: paused;
                    height: 60rem;
                }
                .music {
                    animation: discActive 5s linear infinite;
                    animation-play-state: paused;
                    position: absolute;
                    left: 18.5rem;
                    border-radius: 50%;
                    height: 24rem;
                    width: 24rem;
                    top: 18rem;
                }
                .disc-active {
                    animation-play-state: running;
                }
                span {
                    flex: 1;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 14rem;
                    margin-left: 5rem;
                    color: #f0e8e8;
                }
            }
            .right {
                display: flex;
                align-items: center;
                .van-icon {
                    margin-right: 10rem;
                    font-size: 25rem;
                    color: #ffffff;
                }
                .van-icon::before {
                    margin-top: 2rem;
                }
            }
        }
    }
</style>