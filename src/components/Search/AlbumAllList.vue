<template>
    <div class="album-all-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <van-popup
            lazy-render
            :value="songSheetSta && isAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <SongSheet />
        </van-popup>
        <ul class="list">
            <li v-for="(item,index) in listData" :key="index" @click="getSongSheetList(item.id)">
                <div class="left">
                    <img :src="item.blurPicUrl" v-lazy="item.blurPicUrl">
                </div>
                <div class="right">
                    <p>{{item.name}}</p>
                    <span>{{item.size}}首&nbsp;·&nbsp;{{publishTime(item.publishTime)}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import SongSheet from '@/components/SongSheet.vue';
import { mapState,mapMutations } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    components: {SongSheet},
    props: {
        listData: Array
    },
    methods: {
        ...mapMutations(['setSongSheetSta','setSongSheetId','setIsAlbum']),
        getSongSheetList(id) {
            this.setSongSheetSta(!this.songSheetSta)
            this.setSongSheetId(id)
            this.setIsAlbum(true)
        },
        formatTime(time) {
            let y = time.getFullYear()
            let m = (time.getMonth() + 1 + 100 + '').slice(1)
            let d = (time.getDate() + 100 + '').slice(1)
            return y + '-' + m + '-' + d
        },
        publishTime(time) {
            return this.formatTime(new Date(time))
        },
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
    .album-all-list {
        color: #ffffff;
        .list {
            max-height: calc(100vh - 109.21rem - 65rem);
            overflow: auto;
            padding: 0 20rem;
            &>li {
                margin-bottom: 10rem;
                display: flex;
            }
            .left {
                border-radius: 8rem;
                flex: none;
                img {
                    border-radius: 8rem;
                    width: 64rem;
                }
            }
            .right {
                width: calc(100% - 65rem);
                box-sizing: border-box;
                padding-left: 15rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                p {
                    margin-top: 0;
                    font-size: 15rem;
                    margin-bottom: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                    -webkit-box-orient: vertical; 
                }
                span {
                    color: #848484;
                }
            }
        }
    }
</style>