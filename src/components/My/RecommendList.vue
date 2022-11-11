<template>
    <div class="recommend-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <!-- <van-popup
            lazy-render
            :value="songSheetSta && !isAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <SongSheet />
        </van-popup> -->
        <ul class="list">
            <li v-for="item in DailyList" :key="item.id" @click="getSongSheetList(item.id)">
                <div class="left">
                    <img :src="item.picUrl" alt="" v-lazy="item.picUrl">
                </div>
                <div class="right">
                    <p>{{item.name}}</p>
                    <span>{{item.trackCount}}首</span>
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
        DailyList: Array
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
        ...mapState(['isAlbum','songSheetSta'])
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    .list {
        padding-top: 10rem;
        color: #e1e1e1;
        &>li {
            width: 100%;
            display: flex;
            margin-bottom: 12rem;
        }
        .left {
            flex: none;
            border-radius: 7rem;
            img {
                border-radius: 7rem;
                width: 70rem;
            }
        }
        .right {
            width: calc(100% - 81rem);
            box-sizing: border-box;
            padding-left: 15rem;
            p {
                margin-top: 12rem;
                margin-bottom: 10rem;
                font-size: 13.5rem;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span {
                color: #7e7e7e;
            }
        }
    }
</style>