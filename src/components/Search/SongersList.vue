<template>
    <div class="songer-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <li v-for="item in hotSonger" :key="item.id" @click="artistId = item.id">
                <!-- :style="{'background-image': `url(${item.picUrl})`}" -->
                <div class="img"  v-lazy:background-image="item.picUrl"></div>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            artistId: 0,
        }
    },
    props: {
        hotSonger: Array
    },
    methods: {
        ...mapMutations(['setIsMoveControl'])
    },
    computed: {
        ...mapState(['isMoveControl'])
    },
    watch: {
        artistId(newv) {
            this.setIsMoveControl(true)
            this.$router.push({path: '/search/artist',query: {id:newv}})
        }
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    ::-webkit-scrollbar {
        display: none;
    }
    .list {
        display: flex;
        width: 100%;
        overflow: auto;
        padding-bottom: 30rem;
        &>li {
            margin-right: 15rem;
            .img {
                border-radius: 50%;
                width: 80rem;
                height: 80rem;
                background-size: cover;
            }
            span {
                display: block;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 10rem;
                color: #6f6f6f;
            }
        }
    }
</style>