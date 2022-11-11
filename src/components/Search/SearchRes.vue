<template>
    <div class="search-res">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <h4>最佳匹配</h4>
            <div class="songer-info">
                <div class="left" :style="{'background-image': `url(${res[0].artists[0].img1v1Url})`}"></div>
                <div class="right">
                    <p>{{res[0].artists[0].name}}</p>
                    <span>歌曲:{{songCount}}&nbsp;&nbsp;专辑:{{albumList?.length}}</span>
                </div>
            </div>
        </nav>
        <main>
            <div class="song-nav">
                <h4>歌曲</h4>
                <img src="@/assets/Icons/arrow.png" alt="">
            </div>
            <div @click="changeList">
                <song-list-item :songlists="list" :isPlayList="false" :isSearch="true"/>
            </div>
            <div>
                <div class="song-nav">
                    <h4>专辑</h4>
                    <img src="@/assets/Icons/arrow.png" alt="">
                </div>
                <search-album :listData="albumList" :songName="res[0].artists[0].name"/>
            </div>
        </main>
    </div>
</template>
<script>
import SongListItem from '@/components/Home/SongListItem.vue';
import { mapMutations } from 'vuex';
import SearchAlbum from './SearchAlbum.vue';
export default {
    data() {
        return {
            
        }
    },
    components: {SongListItem, SearchAlbum},
    props: {
        res: Array,
        songCount: Number
    },
    methods: {
        ...mapMutations(['setSongList','setradioStation']),
        changeList() {
            this.$store.commit('setradioStation',null)
            this.setSongList(this.res)
        }
    },
    computed: {
        albumList() {
            let arr = []
            this.res.forEach(v => {
                let find = arr.filter(value => value.id == v.album.id).length == 0
                if(find) {
                    arr.push(v.album)
                }
                
            })
            // console.log(arr);
            return arr
        },
        list() {
            return this.res?.slice(0,10)
        }
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    .search-res {
        margin-top: 62.5rem;
        padding-top: 20rem;
        padding-bottom: 60rem;
        color: #fff;
    }
    nav,
    .song-nav {
        overflow: hidden;
        h4 {
            margin: 15rem 0;
            color: #888888;
            font-size: 16rem;
            font-weight: bold;
        }
    }
    .songer-info {
        display: flex;
        .left {
            width: 65rem;
            height: 65rem;
            border-radius: 50%;
            background-size: cover;
        }
        .right {
            padding-left: 20rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            p {
                font-size: 15rem;
                margin: 0;
            }
            span {
                color: #797979;
            }
        }
    }
    .song-nav {
        padding-top: 15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>img {
            height: 17rem;
        }
    }
</style>