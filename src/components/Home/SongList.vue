<template>
    <div class="song-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul>
            <!-- 唱片 https://s2.music.126.net/style/web2/img/coverall.png?07ddd97c068cca474df796099520491e -->
            <li class="song-item" 
                v-for="item in list" :key="item.id" v-lazy:background-image="item.picUrl"
                @click="getSongSheetList(item.id)"
            >
                <div class="mask">
                    <div class="sl">
                        <img src="@/assets/Icons/music-logo.png" alt=""><span>歌单</span>
                    </div>
                    <img :src="item.picUrl" alt="" v-lazy="item.picUrl">
                    <h3 class="sl-info">{{item.name}}</h3>
                </div>
                <div class="disk-box">
                    <img src="@/assets/Icons/disk.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
// import SongSheet from '@/components/SongSheet.vue';
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    // components: { SongSheet },
    props: {
        list: Array
    },
    methods: {
        ...mapMutations(['setSongSheetSta','setSongSheetId','setIsAlbum']),
        getSongSheetList(id) {
            this.setSongSheetSta(!this.songSheetSta)
            this.setSongSheetId(id)
            this.setIsAlbum(false)
        }
    },
    computed: {
        ...mapState(['songSheetSta','isAlbum'])
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
    .song-list {
        margin-top: 10rem;
        color: #fff;
        ul {
            overflow: auto;
            display: flex;
        }
    }
    .song-item {
        position: relative;
        border-radius: 8rem;
        margin-right: 10rem;
        flex: none;
        // width: 220rem;
        background-size: cover;
        span,
        h3 {
            font-size: 14rem;
            font-weight: bold;
        }
        .mask {
            border-radius: 8rem;
            padding: 40rem 55rem 55rem;
            position: relative;
            backdrop-filter: blur(10rem);
            img {
                display: block;
                margin: 0 auto;
                // border-radius: 8rem;
                width: 130rem;
                position: relative;
                z-index: 2;
                border-radius: 5rem;
            }
            .sl {
                display: flex;
                position: absolute;
                top: 8rem;
                left: 15rem;
                img {
                    width: 24rem;
                }
                span {
                    margin-left: 8rem;
                    line-height: 26rem;
                }
            }
            .sl-info {
                width: 180rem;
                position: absolute;
                margin-bottom: 0;
                margin-top: 0;
                padding:10rem 15rem;
                bottom: 0;
                left: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .disk-box {
            position: absolute;
            right: 23.7px;
            top: 50rem;
            bottom: 0;
            width: 32rem;
            height: 110rem;
            overflow: hidden;
            z-index: 1;
            img {
                width: 110rem;
                position: relative;
                left: -81rem;
            }
        }
        
    }
</style>