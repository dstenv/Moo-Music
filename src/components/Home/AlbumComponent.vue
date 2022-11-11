<template>
    <div class="album-component">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <van-popup
            lazy-render
            :value="isAllAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <div class="pop-head">
                <img src="@/assets/Icons/ic_arrow_back.png" @click="setIsAllAlbum(false)">
                <h4>专辑推荐</h4>
                <div></div>
            </div>
            <album-list :list="albumRecommend.data" :isDetail="true"/>
        </van-popup>
        <nav>
            <h4>{{albumRecommend.title}}</h4>
            <img src="@/assets/Icons/arrow.png" @click="setIsAllAlbum(true)">
        </nav>
        <main>
            <album-list :list="listData"/>
        </main>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import AlbumList from './AlbumList.vue'

export default {
    components: { AlbumList },
    data() {
        return {
        }
    },
    props: {
        albumRecommend: Object
    },
    methods: {
        ...mapMutations(['setIsAllAlbum']),
        // showAll() {
        //     this.setIsAllAlbum(true)
        // }
    },
    computed: {
        ...mapState(['isAllAlbum']),
        listData() {
            return this.albumRecommend.data?.slice(0,3)
        }
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
    .album-component {
        margin-top: 10rem;
        color: #fff;
        // height: 400rem;
        h4 {
            margin-bottom: 0;
            margin-right: 8rem;
            color: #8d8d8d;
            font-size: 16rem;
        }
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>img {
            height: 17rem;
        }
    }
    main {
        padding-top: 30rem;
        width: 100%;
        overflow: auto;
    }

    .pop-head {
        background-color: #1a1a1a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rem 15rem 10rem;
        border-bottom: none;
        img {
            width: 30rem;
        }
        h4 {
            color: #fff;
            font-weight: bold;
            margin-top: 0;
            margin-bottom: 0;
        }
        div {
            width: 30rem;
            height: 30rem;
        }
    }
    
</style>