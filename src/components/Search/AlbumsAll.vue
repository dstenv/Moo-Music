<template>
    <div class="albums-all">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <img src="@/assets/Icons/ic_arrow_back.png" @click="$emit('backArtist',false)">
                <h4>作品</h4>
                <div></div>
            </nav>
            <div class="control">
                <div class="left">
                    <span>{{size}}首</span>
                </div>
                <div class="right">
                    <span :class="{active: isHot}" @click="isHot = true">最热</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span :class="{active: !isHot}" @click="isHot = false">最新</span>
                </div>
            </div>
        </header>
        <main>
            <album-all-list :listData="listData"/>
        </main>
    </div>
</template>
<script>
import AlbumAllList from './AlbumAllList.vue'
export default {
    components: { AlbumAllList },
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
        size:Number
    },
    methods: {
        
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    .albums-all {
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
        margin-top: 109.21rem;
    }
</style>