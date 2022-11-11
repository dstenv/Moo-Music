<template>
    <div class="album-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <van-popup
            lazy-render
            :value="songSheetSta && isAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <SongSheet />
        </van-popup>
        <ul class="album-list-ul" :class="{isblock: isDetail}">
            <li v-for="item in list" :key="item.id" @click="getSongSheetList(item.id)">
                <div class="top">
                    <div class="img">
                        <img :src="item.picUrl" alt="" v-lazy="item.picUrl">
                        <img src="@/assets/imgs/daily_album_bg.png" alt="">
                        <span class="type">#{{item.type}}</span>
                    </div>
                    <div class="info">
                        <p>{{item.name}}</p>
                        <span>{{item.artist.name}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <p>{{item.info}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import SongSheet from '@/components/SongSheet.vue';
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    components: { SongSheet },
    props: {
        list: Array,
        isDetail: {
            type: Boolean,
            require: false
        }
    },
    methods: {
        // AlbumDetail
        ...mapMutations(['setSongSheetSta','setSongSheetId','setIsAlbum']),
        getSongSheetList(id) {
            this.setSongSheetSta(!this.songSheetSta)
            this.setSongSheetId(id)
            this.setIsAlbum(true)
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
    .album-list {
        background-color: #1a1a1a;
    }
    .album-list-ul {
        display: flex;
        width: calc(345.2rem * 3);
        &>li {
            background-color: #252525;
            border-radius: 8rem;
            flex: none;
            
            margin-right: 10rem;
            box-sizing: border-box;
            padding: 0 15rem;
            width: calc(100vw - 40rem);
        }
        .top {
            display: flex;
            .img {
                flex: none;
                position: relative;
                top: -15rem;
                margin: 0 auto;
                width: 120rem;
                border-radius: 8rem;
                position: relative;
                img {
                    border-radius: 8rem;
                    display: block;
                    width: 100%;
                    position: relative;
                    z-index: 3;
                    &:nth-of-type(2) {
                        position: absolute;
                        width: 120rem;
                        top: 0;
                        right: -22px;
                        z-index: 2;
                    }
                }
                .type {
                    display: inline-block;
                    padding: 8rem 15rem;
                    border-radius: 20rem;
                    position: absolute;
                    left: 0;
                    bottom: -7rem;
                    z-index: 3;
                    font-weight: bold;
                    background-color: #ffe131;
                    color: #000;
                }
            }
        }
        .info {
            width: 100%;
            box-sizing: border-box;
            padding: 20rem 20rem 10rem 40rem;
            overflow: hidden;
            p {
                font-size: 15rem;
                font-weight: bold;
                width: 100%;
                margin-bottom: 10rem;
                margin-top: 5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                -webkit-box-orient: vertical; 
            }
            span {
                color: #929292;
                font-size: 13rem;
            }
        }
        .bottom {
            overflow: hidden;
            p {
                margin-top: 8rem;
                color: #929292;
                font-size: 13.5rem;
                line-height: 150%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3; /* 设置显示文本的行数 */
                -webkit-box-orient: vertical; 
            }
        }
    }
    .isblock {
        margin-top: -2rem;
        width: 100vw;
        height: calc(100vh - 60rem);
        padding: 50rem 0 0;
        overflow-y: auto;
        overflow-x: hidden;
        display: block;
        box-sizing: border-box;
        &>li {
            width: 100%;
            margin-bottom: 60rem;
            background-color: #1a1a1a;  
        }
    }
</style>