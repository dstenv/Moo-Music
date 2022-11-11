<template>
    <div class="search-album">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <van-popup
            lazy-render
            :value="songSheetSta && isAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <SongSheet />
        </van-popup>
        <ul class="list">
            <li v-for="item in listData" :key="item.id" @click="getSongSheetList(item.id)">
                <div class="left" :style="{'background-image': `url(${item.artist?.img1v1Url})`}"></div>
                <div class="right">
                    <p>{{item.name}}</p>
                    <span>{{songName}}</span>
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
    components: {SongSheet},
    props: {
        listData: Array,
        songName: String
    },
    methods: {
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
    .search-album {
        color: #eaeaea;
    }
    .list {
        &>li {
            margin-bottom: 10rem;
            display: flex;
            .left {
                border-radius: 6rem;
                width: 64rem;
                height: 64rem;
                background-size: cover;
            }
            .right {
                box-sizing: border-box;
                width: calc(100% - 65rem);
                padding-left: 20rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                p {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0;
                    font-size: 14rem;
                }
                span {
                    color: #838383;
                }
            }
        }
    }
</style>