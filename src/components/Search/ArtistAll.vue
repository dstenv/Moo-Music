<template>
    <div class="artist-all">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <img src="@/assets/Icons/ic_arrow_back.png" @click="$emit('backArtist',false)">
                <h4>歌曲</h4>
                <div></div>
            </nav>
            <div class="control">
                <div class="left">
                    <img :src="audioPlayStatus && isHave? btn.play:btn.paused" @click="beginList">
                    <span>{{size}}首</span>
                </div>
                <div class="right">
                    <span :class="{active: isHot}" @click="isHot = true">最热</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span :class="{active: !isHot}" @click="isHot = false">最新</span>
                    <img src="@/assets/Icons/icon_select.png" alt="">
                </div>
            </div>
        </header>
        <main @click="changeList">
            <song-list-item :isPlayList="false" :songlists="listData"/>
        </main>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import SongListItem from '../Home/SongListItem.vue'
export default {
    components: { SongListItem },
    data() {
        return {
            btn: {
                paused: require('@/assets/imgs/icon_play_yellow.png'),
                play: require('@/assets/imgs/pause_big.png')
            },
            isHot: true
        }
    },
    props: {
        listData: Array,
        size: Number
    },
    methods: {
        ...mapMutations(['setSongList','setPlayingMusic','setAudioPlayStatus']),
        beginList() {
            this.setSongList(this.listData)
            if(!this.isHave) {
                this.setPlayingMusic(this.listData[0])
                this.$store.commit('setradioStation',null)
                this.setAudioPlayStatus(true)
            }
            else {
                this.setAudioPlayStatus(!this.audioPlayStatus)
            }
        },
        changeList() {
            this.$store.commit('setradioStation',null)
            this.setSongList(this.listData)
        }
    },
    computed: {
        ...mapState(['audioPlayStatus','playingMusic']),
        isHave() {
            if(!this.playingMusic.id) {
                return this.listData?.findIndex( v => v.id == this.playingMusic.privilege?.id) != -1
            }
            return this.listData?.findIndex( v => v.id == this.playingMusic.id) != -1
        },
    },
    watch: {
        
    },
    created() {
        
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
    .artist-all {
        color: #ffffff;
        overflow: hidden;
        background-color: #1a1a1a;
        width: 100vw;
        height: 100vh;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        background-color: #1a1a1a;
        width: 100vw;
        box-sizing: border-box;
        padding: 20rem;
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                height: 30rem;
            }
            h4 {
                margin: 0;
                font-size: 16rem;
                font-weight: bold;
            }
            div {
                width: 30rem;
                height: 30rem;
            }
        }
    }
    .control {
        padding-top: 20rem;
        display: flex;
        justify-content: space-between;
        .left,
        .right {
            display: flex;
            align-items: center;
            font-size: 14rem;
            color: #848484;
        }
        .left {
            span {
                margin-left: 15rem;
            }
            img {
                height: 32rem;
            }
        }
        .right {
            img {
                margin-left: 15rem;
                height: 30rem;
            }
            .active {
                color: #ffffff;
            }
        }
    }
    main {
        box-sizing: border-box;
        padding: 0 20rem;
        margin-top: 122.03rem;
        max-height: calc(100vh - 122.03rem - 65rem);
        overflow: auto;
    }
</style>