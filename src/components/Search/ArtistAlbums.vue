<template>
    <div class="artist-albums">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <li v-for="item in listData" :key="item.id" @click="getSongSheetList(item.id)">
                <img :src="item.blurPicUrl" v-lazy="item.blurPicUrl">
                <p>{{item.name}}</p>
                <span>{{publishTime(item.publishTime)}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapMutations,mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    props: {
        listData: Array
    },
    methods: {
        ...mapMutations(['setSongSheetSta','setSongSheetId','setIsAlbum']),
        formatTime(time) {
            let y = time.getFullYear()
            let m = (time.getMonth() + 1 + 100 + '').slice(1)
            let d = (time.getDate() + 100 + '').slice(1)
            return y + '-' + m + '-' + d
        },
        publishTime(time) {
            return this.formatTime(new Date(time))
        },
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
    .list {
        display: flex;
        flex-wrap: wrap;
        &>li {
            width: calc(50% - 4rem);
            border-radius: 8rem;
            margin-bottom: 10rem;
            img {
                border-radius: 8rem;
                width: 100%;
                display: block;
            }
            p {
                color: #d2d2d2;
                margin-bottom: 5rem;
                font-size: 14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                -webkit-box-orient: vertical; 
            }
            &:nth-of-type(2n-1) {
                margin-right: 8rem;
            }
        }
    }
</style>