<template>
    <div class="search">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header :class="{'head2': isBeginSearch || isShowRes}">
            <nav v-show="!isBeginSearch && !isShowRes">
                <h3>搜索</h3>
            </nav>
            <div class="search-box" :class="{'search-box-s': isBeginSearch || isShowRes}">
                <img src="@/assets/Icons/search-icon.png">
                <input v-model="searvalue" type="text" :placeholder="isBeginSearch? '':'搜索歌曲/专辑/歌单/音乐人'" @focus="inpfcs">
                <img @click="cleanvalue" v-show="isBeginSearch && searvalue.trim()" src="@/assets/Icons/icon_close.png" class="close">
                <span @click="back" v-show="isBeginSearch || isShowRes">取消</span>
            </div>
        </header>
        <suggest-search 
            v-show="isBeginSearch && searvalue.trim() && !isShowRes"
            :suggestList="suggestSearch"
            @changeShowRes="changeShowRes"
        />
        <search-res 
            v-show="isShowRes"
            :res="searchResult?.songs" :songCount="searchResult?.songCount"
        />
        <main v-show="!isBeginSearch && !isShowRes">
            <section>
                <div class="sec1-songe">
                    <h4>热门歌手</h4>
                    <img src="@/assets/Icons/arrow.png" alt="">
                </div>
                <songers-list :hotSonger="hotSonger"/>
            </section>
            <section>
                <div class="sec1-songe">
                    <h4>热门搜索</h4>
                </div>
                <hot-search :hotSearch="hotSearch"/>
            </section>
            <section>
                <div class="sec1-songe">
                    <h4>流派歌单推荐</h4>
                </div>
                <song-list-type :typeList="type"/>
            </section>
        </main>
    </div>
</template>
<script>
import {getHotSonger, getHotSearch, getHotListType, getSearchSuggest,getSearchResult } from '@/apis/search'
import { chineseAndEnglish } from '@/Mydata/ChineseAndEng'
import SongersList from '@/components/Search/SongersList.vue'
import HotSearch from '@/components/Search/HotSearch.vue'
import SongListType from '@/components/Search/SongListType.vue'
import SuggestSearch from '@/components/Search/SuggestSearch.vue'
import SearchRes from '@/components/Search/SearchRes.vue'
import { mapMutations, mapState } from 'vuex'
import {Toast} from 'vant'

export default {
    components: { SongersList, HotSearch, SongListType, SuggestSearch,SearchRes },
    data() {
        return {
            hotSonger: [],
            hotSearch: [],
            type: [],
            searvalue:'',
            suggestSearch: [],
            timer: null,
            isShowRes: false,
            searchResult: []
        }
    },
    methods: {
        ...mapMutations(['setIsBeginSearch']),
        getHotSongListType(key,obj) {
            this.type.push({
                type: key,
                eng: obj[key].eng,
                color: obj[key].color
            })
        },
        cleanvalue() {
            this.searvalue = ''
            this.suggestSearch = []
        },
        inpfcs() {
            this.setIsBeginSearch(true)
            this.isShowRes = false
        },
        back() {
            this.cleanvalue()
            this.setIsBeginSearch(false)
            this.isShowRes = false
        },
        async search() {
            let value = this.searvalue.trim()
            if(value) {
                // console.log(event.target.value);
                Toast.loading({
                    message: '努力加载中...',
                    forbidClick: true,
                    duration: 0
                })
                this.suggestSearch = await getSearchSuggest(value)
                await this.$nextTick()
                Toast.clear()
                console.log(this.suggestSearch);
            }
        },
        async searchRes() {
            Toast.loading({
                message: '努力加载中...',
                forbidClick: true,
                duration: 0
            })
            this.searchResult = await getSearchResult(this.searvalue)
            await this.$nextTick()
            Toast.clear()
            // console.log(this.searchResult);
        },
        changeShowRes(keyword) {
            this.searvalue = keyword
            this.isShowRes = true
            this.setIsBeginSearch(false)
            this.searchRes()
        }
    },
    computed: {
        ...mapState(['isBeginSearch'])
    },
    watch: {
        searvalue(newv) {
            // console.log(newv);
            if(this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                if(!newv.trim()) {
                    // console.log(newv);
                    this.cleanvalue()
                }else {
                    this.search()
                }
            }, 300);
        }
    },
    created() {
        getHotSonger().then(res => {
            this.hotSonger = res
            console.log('热门歌手 --> ', this.hotSonger);
        })
        getHotSearch().then(res => {
            this.hotSearch = res.slice(0,10)
            console.log('热门搜索 --> ', this.hotSearch);
        })
        getHotListType().then(res => {
            res.forEach(v => {
                this.getHotSongListType(v.name,chineseAndEnglish)
            })
            console.log('热门歌单分类 --> ',this.type);
        })
    }
}
</script>
<style lang="scss" scoped>
    ::-webkit-input-placeholder {
        color: #989898;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .search {
        background-color: #1a1a1a;
        width: 100vw;
        height: calc(100vh - 59rem);
        overflow: auto;
        padding: 0 20rem 0;
        box-sizing: border-box;
        header {
            width: calc(100vw - 40rem);
            position: fixed;
            background-color: #1a1a1a;
            padding-top: 20rem;
            padding-bottom: 20rem;
            top: 0;
            left: 20rem;
            z-index: 999;
            // overflow: hidden;
        }
        .head2 {
            left: 0;
            width: 100%;
        }
        nav {
            overflow: hidden;
        }
        nav>h3 {
            margin-top: 0;
            margin-bottom: 20rem;
            font-size: 23rem;
            font-weight: bold;
            color: #fff;
        }
        .search-box,
        .search-box-s {
            position: relative;
            img {
                height: 22rem;
                position: absolute;
                left: 10rem;
                top: 0;
                display: block;
                bottom: 0;
                margin: auto 0;
            }
            input {
                font-size: 13.5rem;
                color: #fff;
                width: calc(100% - 46rem);
                height: 35rem;
                padding-left: 45rem;
                border-radius: 25rem;
                outline: none;
                border: none;
                background-color: #000000;
            }
        }
        .search-box-s {
            width: 100%;
            animation: search-box .2s linear 1;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            img {
                left: 25rem;
            }
            .close {
                height: 30rem;
                left: 273rem;
            }
            input {
                font-size: 15rem;
                width: calc(100% - 120rem);
                height: 40rem;
            }
            span {
                color: #fff;
                font-weight: bold;
                font-size: 14rem;
            }
        }
        @keyframes search-box {
            from{
                transform: translateY(70rem);
            }
            to {
                transform: translateY(0);
            }
        }
    }
    main {
        overflow: auto;
        padding-bottom: 45rem;
        margin-top: 120rem;
    }
    .sec1-songe {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>img {
            height: 17rem;
        }
        h4 {
            color: #8d8d8d;
            font-size: 16rem;
        }
    }
</style>