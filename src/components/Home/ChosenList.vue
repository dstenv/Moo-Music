<template>
    <div class="chosen-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="song-list" :class="{'all-song':isAll}">
            <li v-for="item in list" :key="item.id" @click="getSongSheetList(item.id)">
                <div class="top">
                    <img :src="item.coverImgUrl" alt="" class="cover" v-lazy="item.coverImgUrl">
                    <img src="@/assets/Icons/music-logo.png" alt="" class="logo">
                    <div class="avatar">
                        <img :src="item.creator.avatarUrl" alt="">
                        <span>{{item.creator.nickname}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <span>{{item.name}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations(['setSongSheetSta','setSongSheetId','setIsAlbum']),
        getSongSheetList(id) {
            this.setSongSheetSta(!this.songSheetSta)
            this.setSongSheetId(id)
            this.setIsAlbum(false)
        }
    },
    props: {
        list: Array,
        isAll: {
            type: Boolean,
            default: false,
            require: false
        }
    },
    computed: {
        ...mapState(['isAllSongs','songSheetSta'])
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
    .chosen-list {
        background-color: #1a1a1a;  
    }
    .song-list {
        width: 100%;
        overflow: auto;
        display: flex;
        &>li {
            flex: none;
            margin-right: 10rem;
        }
        .top {
            border-radius: 8rem;
            position: relative;
            .cover {
                border-radius: 8rem;
                width: 120rem;
            }
            .logo {
                right: 5rem;
                bottom: 6rem;
                width: 24rem;
                position: absolute;
            }
            .avatar {
                position: absolute;
                left: 0;
                bottom: -3rem;
                height: 30rem;
                border-radius: 25rem;
                backdrop-filter: blur(10rem);
                display: flex;
                align-items: center;
                &>img {
                    border-radius: 50%;
                    width: 25rem;
                    margin-left: 2rem;
                }
                span {
                    display: inline-block;
                    padding: 0 3rem 0 5rem;
                    width: 50rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #fff;
                }
            }
        }
        .bottom {
            padding-top: 8rem;
            color: #fff;
            &>span {
                // display: block;
                width: 120rem;
                font-size: 14rem;
                // font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                -webkit-box-orient: vertical; 
            }
        }
    }
    .all-song {
        margin-top: -2rem;
        width: 100vw;
        height: calc(100vh - 60rem);
        padding: 15rem 15rem 50rem;
        overflow: auto;
        display: flex;
        box-sizing: border-box;
        flex-wrap: wrap;
        &>li {
            width: calc((100% - 2.5%)/2);
            margin-bottom: 60rem;
            background-color: #1a1a1a;  
            margin-bottom: 25rem;
            .top {
                .cover {
                    width: 100%;
                }
            }
            &:nth-of-type(2n+1) {
                margin-right: 2.5%;
            }
            &:nth-of-type(2n) {
                margin-right: 0;
            }
        }
        .bottom {
            &>span {
                width: 100%;
            }
        }
    }
</style>