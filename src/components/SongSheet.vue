<template>
    <div class="song-sheet">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <img src="@/assets/Icons/ic_arrow_back.png" alt="" @click="setSongSheetSta(!songSheetSta)">
                <img src="@/assets/Icons/icon_more.png" alt="">
            </nav>
        </header>
        <main>
            <div class="search-box">
                <img src="@/assets/Icons/search-icon.png" alt="">
                <input type="text" placeholder="搜索歌单内歌曲">
            </div>
            <section class="sec1">
                <!-- 这里差个小的音乐图标 -->
                <img src="@/assets/Icons/music-logo.png" class="music-logo">
                <img :src="detailData.coverImgUrl || detailData.album?.picUrl" alt="" class="cover-img" v-lazy="detailData.coverImgUrl || detailData.album?.picUrl">
                <span class="create-time" v-if="detailData.updateTime>0">更新于 {{updateTime}}</span>
                <div class="info">
                    <div class="left">
                        <p>{{detailData.name || detailData.album?.name}}</p>
                        <div class="avatar">
                            <img v-if="detailData.creator?.avatarUrl" :src="detailData.creator?.avatarUrl" v-lazy="detailData.creator?.avatarUrl">
                            <div v-if="isAlbum">
                                <div 
                                    v-for="(item,index) in artistPic" :key="index"
                                    class="singnal" :style="{'background-image': `url(${item?.picUrl})`}">
                                </div>
                            </div>
                            <span :class="{many: isAlbum && artistPic?.length>1}">{{avatarName}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <img :src="localIsHave? heart.unlike:heart.like" @click="likeSongSheet">
                        <!-- 这里差个评论数量（detailData.commentCount）comment.png -->
                        <span class="comment" v-if="detailData.commentCount || detailData.album?.info.commentCount">{{(detailData.commentCount || detailData.album?.info.commentCount)>999? 999+'+':(detailData.commentCount || detailData.album?.info.commentCount)}}</span>
                        <img :src="(detailData?.commentCount || detailData.album?.info.commentCount)>0? comment.have:comment.no" alt="">
                    </div>
                </div>
                <span class="description">{{detailData.description || detailData.album?.description}}</span>
                <span class="description d2" v-if="detailData.playCount">播放 {{detailData.playCount}}</span>
                <span class="description d2" v-if="detailData.subscribers?.length">喜欢 {{detailData.subscribers?.length}}</span>
                <!-- shareCount -->
                <span class="description d2" v-if="detailData.album?.info.shareCount>0">歌单被分享{{detailData.album?.info.shareCount}}次</span>
            </section>
            <div class="song-sheetcontrol">
                <div class="left">
                    <img :src="audioPlayStatus && isHave? btn.play:btn.paused" @click="beginList">
                    <span>{{detailData.trackCount || detailData.album?.size}}</span>
                </div>
                <img src="@/assets/Icons/icon_select.png" alt="">
            </div>
            <section @click="changeLi">
                <SongListItem :isPlayList="false" :songlists="detailData.tracks || detailData.songs"/>
            </section>
        </main>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import {SongSheetDetail, AlbumDetail} from '@/apis/component'
import {format} from '@/apis/util'
import SongListItem from '@/components//Home/SongListItem.vue';
import { Toast } from 'vant';

export default {
    props: {
        
    },
    data() {
        return {
            detailData: {},
            updateTime: 0,
            btn: {
                play: require('@/assets/imgs/pause_big.png'),
                paused: require('@/assets/imgs/icon_play_yellow.png')
            },
            comment: {
                no: require('@/assets/Icons/icon_comment_inactive.png'),
                have: require('@/assets/Icons/comment.png')
            },
            heart: {
                unlike: require('@/assets/Icons/icon_like.png'),
                like: require('@/assets/Icons/icon_like_selected.png')
            },
            likeSongSheets: []
        }
    },
    methods: {
        ...mapMutations(['setSongSheetSta','setSongList','setAudioPlayStatus','setPlayingMusic']),
        async getDetail(id) {
            Toast.loading({
                message: '努力加载中...',
                forbidClick: true,
                duration: 0
            })
            if(!this.isAlbum) {
                this.detailData = await SongSheetDetail(id)
            }else {
                this.detailData = await AlbumDetail(id)
            }
            if(Object.values(this.detailData).length == 0) {
                Toast.clear()
                Toast.fail('网络错误，请刷新！')
            }
            this.$nextTick(() => {
                Toast.clear()
            })
            let time = new Date(this.detailData.updateTime)
            this.updateTime = format(time,'yyyy-MM-dd')
            console.log(this.updateTime);
        },
        beginList() {
            this.setSongList(this.detailData?.tracks || this.detailData?.songs)
            if(!this.isHave) {
                if(!this.isAlbum) {
                    this.setPlayingMusic(this.detailData?.tracks[0])
                }else {
                    this.setPlayingMusic(this.detailData?.songs[0])
                }
                
                this.$store.commit('setradioStation',null)
                this.setAudioPlayStatus(true)
            }
            else {
                this.setAudioPlayStatus(!this.audioPlayStatus)
            }
        },
        changeLi() {
            this.$store.commit('setradioStation',null)
            if(this.detailData.tracks) {
                this.setSongList(this.detailData.tracks)
            }else if(this.detailData.songs) {
                this.setSongList(this.detailData.songs)
            }
            
        },
        likeSongSheet() {
            let find = this.likeSongSheets.findIndex(v => v == this.songSheetId)
            // console.log(find,this.likeSongSheets);
            if(find  == -1) {
                this.likeSongSheets.push(this.songSheetId)
            }else {
                this.likeSongSheets.splice(find,1)
            }
            localStorage.likeSongSheets = JSON.stringify(this.likeSongSheets)
        }
    },
    components: { SongListItem },
    computed: {
        ...mapState(['songSheetSta','songSheetId','playingMusic','audioPlayStatus','radioStation','isAlbum']),
        isHave() {
            if(!this.isAlbum) {
                return this.detailData?.tracks?.findIndex( v => v.id == this.playingMusic.id) != -1
            }
            return this.detailData?.songs?.findIndex( v => v.id == this.playingMusic.id) != -1
        },
        avatarName() {
            return this.detailData.creator?.nickname || this.detailData.album?.artists.map(v => v.name).join(' / ')
        },
        artistPic() {
            return this.detailData.album?.artists
        },
        localIsHave() {
            return this.likeSongSheets.findIndex(v => v == this.songSheetId) == -1
        }
    },
    watch: {
        // songSheetSta(newv) {
        //     if(!newv) {

        //     }
        // },
        songSheetId(newv,oldv) {
            if(newv != oldv) {
                // console.log(newv,oldv);
                this.detailData = {}
                this.getDetail(this.songSheetId)
            } 
        }
    },
    created() {
        this.likeSongSheets = localStorage.likeSongSheets? JSON.parse(localStorage.likeSongSheets):[]
        this.getDetail(this.songSheetId)
    }
}
</script>
<style lang="scss" scoped>
    .song-sheet {
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        background-color: #1a1a1a;
        position: relative;
        padding: 20rem 15rem;
        overflow: auto;
        z-index: 2022;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #1a1a1a;
        width: 100%;
        box-sizing: border-box;
        padding: 20rem 15rem;
        z-index: 500;
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            img {
                width: 35rem;
            }
        }
    }
    main {
        margin-top: 55rem;
        padding-bottom: 55rem;
    }
    .search-box {
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
    .sec1 {
        position: relative;
        .music-logo {
            position: absolute;
            right: 82rem;
            top: 157rem;
            width: 30rem;
        }
        .cover-img {
            width: 55%;
            display: block;
            margin: 20rem auto 30rem;
            border-radius: 7rem;
        }
        .info {
            padding-top: 12rem;
            display: flex;
            .left {
                width: calc(100% - 33rem);
                overflow: hidden;
                color: #f4f4f4;
                p {
                    font-size: 22rem;
                    font-weight: bold;
                    width: 95%;
                    margin-top: 0;
                    margin-bottom: 18rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .avatar {
                    display: flex;
                    align-items: center;
                    span {
                        font-size: 13rem;
                        margin-left: 8rem;
                    }
                    img {
                        width: 30rem;
                        border-radius: 50%;
                    }
                    .singnal {
                        border-radius: 50%;
                        width: 35rem;
                        height: 35rem;
                        background-size: cover;
                        position: relative;
                        &:nth-of-type(n+2) {
                            left: -17.5rem;
                        }
                    }
                    .many {
                        position: relative;
                        left: -17.5rem;
                    }
                }   
            }
            .right {
                flex: none;
                width: 32rem;
                position: relative;
                img {
                    display: block;
                    margin-bottom: 10rem;
                    // height: 40rem;
                    width: 100%;
                }
                .comment {
                    position: absolute;
                    top: 33rem;
                    display: inline-block;
                    padding: 2rem;
                    min-width: 17rem;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #fff;
                    left: 49%;
                    color: #000;
                }
            } 
        }
        .description {
            display: block;
            margin: 15rem 0;
            font-size: 13rem;
            color: #8a8a8a;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 8;
            -webkit-box-orient: vertical;
        }
        .d2 {
            margin-top: 0;
            display: inline-block;
            padding-right: 15rem;
        }
        .create-time {
            color: #7d7d7d;
        }
    }
    .song-sheetcontrol {
        position: sticky;
        top: 55rem;
        width: 101%;
        display: flex;
        justify-content: space-between;
        background-color: #1a1a1a;
        z-index: 10;
        color: #8d8d8d;
        padding: 15rem 0 20rem;
        .left {
            display: flex;
            align-items: center;
            span {
                margin-left: 15rem;
                font-size: 14rem;
            }
        }
        img {
            outline: none;
            height: 35rem;
        }
    }
</style>