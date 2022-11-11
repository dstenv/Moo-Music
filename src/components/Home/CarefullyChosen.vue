<template>
    <div class="carefully-chosen">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <van-popup
            lazy-render
            :value="isAllSongs" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <div class="pop-head">
                <img src="@/assets/Icons/ic_arrow_back.png" @click="setIsAllSongs(false)">
                <h4>精选歌单</h4>
                <div></div>
            </div>
            <chosen-list :list="list.data" :isAll="true"/>
        </van-popup>
        <nav>
            <h4>{{list.title}}</h4>
            <img src="@/assets/Icons/arrow.png" @click="setIsAllSongs(true)">
        </nav>
        <chosen-list :list="listData"/>
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import ChosenList from '@/components/Home/ChosenList.vue'

export default {
    data() {
        return {
            
        }
    },
    components: { ChosenList },
    props: {
        list: Object
    },
    methods: {
        ...mapMutations(['setSongSheetSta','setSongSheetId','setIsAllSongs']),
        
    },
    computed: {
        ...mapState(['songSheetSta','isAllSongs']),
        listData() {
            return this.list.data?.slice(0,10)
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
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>img {
            height: 17rem;
        }
    }
    .carefully-chosen {
        margin-top: 10rem;
        overflow: hidden;
        // height: 300rem;
        h4 {
            color: #8d8d8d;
            font-size: 16rem;
        }
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