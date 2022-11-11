<template>
    <div class="play-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <div class="play-type" @click="setType">
                <img src="@/assets/imgs/icon_play_order.png" v-show="playType == 0">
                <img src="@/assets/imgs/icon_play_random.png" v-show="playType == 1">
                <img src="@/assets/imgs/icon_play_single.png" v-show="playType == 2">
            </div>
            <span>播放列表&nbsp;&nbsp;{{songList?.length}}</span>
        </nav>
        <main>
            <song-list-item :songlists="songList" :isPlayList="true"/>
        </main>
        <div class="mask"></div>
    </div>
</template>
<script>
import SongListItem from './SongListItem.vue'
import {mapState} from 'vuex'
import { Toast } from 'vant'
export default {
    components: {
        SongListItem
    },
    data() {
        return {
            playTypeText: ['顺序播放','随机播放','单曲循环'],
        }
    },
    props: {
        playType: Number
    },
    methods: {
        setType() {
            this.$emit('setPlayType',(this.playType + 1) % 3)
            this.$nextTick(() => {
                Toast(this.playTypeText[this.playType])
            })
        }
    },
    computed: {
        ...mapState(['songList'])
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    ::-webkit-scrollbar {
        display: none;
    }
    .play-list {
        color: #fff;
        z-index: 800;
        width: 100vw;
        box-sizing: border-box;
        position: relative;
        padding: 20rem 20rem 65rem 20rem;
        backdrop-filter: blur(20rem);
        background-color: rgba(38, 38, 38, 0.4);
        nav {
            display: flex;
            align-items: center;
            .play-type {
                background-color: rgba(89, 84, 72,.3);
                padding: 0 15rem;
                border-radius: 20rem;
                img {
                    display: block;
                    margin: 0 auto;
                    width: 30rem;
                }
                
            }
            span {
                margin-left: 10rem;
                font-size: 14rem;
            }
        }
        main {
            margin-top: 20rem;
            max-height: 350rem;
            overflow-y: auto;
        }
        .mask {
            position: absolute;
            bottom: 65rem;
            left: 0;
            width: 100%;
            height: 30rem;
        }
    }
</style>