<template>
    <div class="artist-view">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <van-popup
            lazy-render
            :value="songSheetSta && isAlbum" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <SongSheet />
        </van-popup>
        <van-popup
            lazy-render
            :value="isShowAll" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <artist-all :listData="artistData.songs" :size="artistData.musicSize" @backArtist="backArtist"/>
        </van-popup>
        <van-popup
            lazy-render
            :value="ShowAlbumAll" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <albums-all :listData="artistData.album" :size="artistData.albumSize" @backArtist="backArtist"/>
        </van-popup>
        <van-popup
            lazy-render
            :value="showMvs" position="right" :duration="0.2" :close-on-click-overlay="false"
            :overlay-style="{'background-color': 'rgba(0,0,0,0)','z-index': 2000}"
        >
            <mvs-all :listData="artistData.mvs" :size="artistData.mvSize" @backArtist="backArtist"/>
        </van-popup>

        


        <header>
            <nav>
                <img src="@/assets/Icons/ic_arrow_back.png" @click="$router.back(-1)">
                <img src="@/assets/Icons/icon_more.png" alt="">
            </nav>
        </header>
        <main ref="main">
            <section>
                <div class="artist-card">
                    <div class="top">
                        <div class="l">
                            <img :src="artistData.picUrl" v-lazy="artistData.picUrl">
                        </div>
                        <p>{{artistData.name}}</p>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <span>关注</span>{{artistData.followCount}}
                            <span>粉丝</span>{{artistData.Fans}}
                        </div>
                        <span class="guanzhu">关注</span>
                    </div>
                </div>
            </section>
            <div class="tabs">
                <span :class="{active: tabsIndex == 0}" @click="tabsIndex = 0">主页</span>
                <span :class="{active: tabsIndex == 1}" @click="tabsIndex = 1">作品</span>
                <div class="tabs-slide" :style="{transform: `translate(${tabsIndex * 167.6}rem)`}"></div>
            </div>
            <section class="sec2" :style="{transform: `translate(${-tabsIndex * 100}vw)`}">
                <div class="left">
                    <div class="info">
                        <p>关于</p>
                        <div class="mask" :style="{'background-image': `url(${artistData.picUrl})`}" v-lazy:background-image="artistData.picUrl">
                            <div class="btm">
                                <h4>{{artistData.name}}</h4>
                                <p>{{artistData.briefDesc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rights">
                    <section>
                        <div class="songs-nav">
                            <div class="lf">
                                <h4>歌曲&nbsp;{{artistData.musicSize}}</h4>
                                <img :src="audioPlayStatus && isHave? btn.play:btn.paused" @click="beginList">
                            </div>
                            <img src="@/assets/Icons/ic_arrow_more.png" @click="isShowAll = true">
                        </div>
                        <MySkeleton :row="6" v-if="loading"></MySkeleton>
                        <div @click="changeList" v-if="!loading">
                            <song-list-item :songlists="listData" :isPlayList="false"/>
                        </div>
                    </section>
                    <section>
                        <div class="songs-nav">
                            <div class="lf">
                                <h4>专辑&nbsp;{{artistData.albumSize}}</h4>
                            </div>
                            <img src="@/assets/Icons/ic_arrow_more.png" @click="ShowAlbumAll = true">
                        </div>
                        <MySkeleton :row="4" :isAlbum="true" v-if="loadAlbum"></MySkeleton>
                        <artist-albums v-if="!loadAlbum" :listData="albumsData"/>
                    </section>
                    <section>
                        <div class="songs-nav">
                            <div class="lf">
                                <h4>视频&nbsp;{{artistData.mvSize}}</h4>
                            </div>
                            <img src="@/assets/Icons/ic_arrow_more.png" @click="showMvs = true">
                        </div>
                        <div class="mv">
                            <router-link :to="'/search/artist/mv/' + mvId">
                                <div class="mv-img">
                                    <img :src="mvPic" v-lazy="mvPic">
                                    <div class="open">
                                        <div class="sanjiao"></div>
                                    </div>
                                    <span class="dur">{{formatDur}}</span>
                                </div>
                            </router-link>
                            <p>{{mvName}}</p>
                        </div>
                    </section>
                </div>
            </section>
            
        </main>
    </div>
</template>
<script>
import { getSongByArtist,getAlbumByArtist,getMvByArtist } from '@/apis/search'
import { mapMutations, mapState } from 'vuex'
import SongSheet from '@/components/SongSheet.vue';
import SongListItem from '@/components/Home/SongListItem.vue'
import ArtistAlbums from '@/components/Search/ArtistAlbums.vue'
import { Toast } from 'vant'
import ArtistAll from '@/components/Search/ArtistAll.vue';
import AlbumsAll from '@/components/Search/AlbumsAll.vue';
import MvsAll from '@/components/Search/MvsAll.vue';
export default {
    components: { SongListItem, ArtistAlbums,SongSheet, ArtistAll, AlbumsAll, MvsAll },
    data() {
        return {
            id: 0,
            artistData: {},
            tabsIndex: 1,
            btn: {
                paused: require('@/assets/imgs/icon_play_yellow.png'),
                play: require('@/assets/imgs/pause_big.png')
            },
            mvPic: '',
            mvName: '',
            mvId: 0,
            mvDuration: 0,
            isShowAll: false,
            ShowAlbumAll: false,
            showMvs: false,
            loading: true,
            loadAlbum: true
        }
    },
    methods: {
        ...mapMutations(['setIsMoveControl','setSongList','setPlayingMusic','setAudioPlayStatus','setSongSheetSta','setSongSheetId','setIsAlbum','setradioStation']),
        async getInit(id) {
            // Toast.loading({
            //     message: '加载中...',
            //     forbidClick: true,
            //     duration: 0
            // })
            await getSongByArtist(id).then(res => {
                let obj = {
                    name: res.artist.name,
                    picUrl: res.artist.img1v1Url,
                    musicSize:res.artist.musicSize,
                    albumSize:res.artist.albumSize,
                    mvSize:res.artist.mvSize,
                    briefDesc: res.artist.briefDesc,
                    followCount: 0,
                    Fans: 999
                }
                this.artistData = {...this.artistData,...obj}
                this.$set(this.artistData,'songs',res.hotSongs)
                this.loading = false
            }).catch(() => {
                // Toast.clear()
                Toast.fail('网络错误,请刷新！')
            })
            await getAlbumByArtist(id).then(res => {
                this.$set(this.artistData,'album',res.hotAlbums)
                this.loadAlbum = false
            }).catch(() => {
                // Toast.clear()
                Toast.fail('网络错误,请刷新！')
            })
            await getMvByArtist(id).then(res => {
                this.$set(this.artistData,'mvs',res)
            }).catch(() => {
                // Toast.clear()
                Toast.fail('网络错误,请刷新！')
            })
            // console.log(this.artistData.mvs[0]);
            this.mvPic = this.artistData.mvs[0].imgurl
            this.mvId = this.artistData.mvs[0].id
            this.mvName = this.artistData.mvs[0].name
            this.mvDuration = this.artistData.mvs[0].duration
            // console.log(this.mvPic);
            // console.log(Object.keys(this.artistData));
            Toast.clear()
        },
        beginList() {
            this.setSongList(this.listData)
            if(!this.isHave) {
                this.setPlayingMusic(this.listData[0])
                this.$store.commit('setradioStation',null)
                this.setAudioPlayStatus(true)
            }
            else {
                this.setAudioPlayStatus(!this.audioPlayStatus)
            }
        },
        backArtist() {
            this.showMvs = false
            this.ShowAlbumAll = false
            this.isShowAll = false
        },
        changeList() {
            this.$store.commit('setradioStation',null)
            this.setSongList(this.listData)
        },
    },
    computed: {
        ...mapState(['isMoveControl','audioPlayStatus','playingMusic','songSheetSta','isAlbum']),
        listData() {
            return this.artistData.songs?.slice(0,6)
        },
        albumsData() {
            return this.artistData.album?.slice(0,4)
        },
        isHave() {
            return this.listData?.findIndex( v => v.id == this.playingMusic.id) != -1
        },
        formatDur() {
            let time = Math.floor(this.mvDuration / 1000)
            let m = (Math.floor(time / 60) + 100 + '').slice(1)
            let s = (Math.floor(time % 60) + 100 + '').slice(1)
            return m + ':' + s
        }
    },
    watch: {
        tabsIndex(newv) {
            if(newv == 0) {
                // console.log(this.$refs.main.scrollTop );
                this.$refs.main.scrollTop = 0
            }
        },
    },
    created() {
        this.id = this.$route.query?.id
        if(this.id && this.id != 0) {
            // console.log(this.id);
            this.getInit(this.id)
        }
    },
    // beforeRouteLeave(to,from) {
    //     console.log(to,from);
    // },
    beforeDestroy() {
        this.setIsMoveControl(false)
    }
}
</script>
<style lang="scss" scoped>
    ::-webkit-scrollbar {
        display: none;
    }
    .artist-view {
        width: 100vw;
        overflow: hidden;
        color: #ffffff;
        background-color: #1a1a1a;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: #1a1a1a;
        width: 100vw;
        box-sizing: border-box;
        padding: 20rem 20rem 30rem;
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            img {
                height: 30rem;
            }
        }
    }
    main {
        width: 100vw;
        background-color: #1a1a1a;
        box-sizing: border-box;
        padding: 0 20rem 20rem;
        margin-top: 80.3rem;
        max-height: calc(100vh - 80.3rem - 55rem);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .artist-card {
        margin-top: 20rem;
        background-color: #000000;
        border-radius: 8rem;
        padding: 0 15rem 10rem;
        margin-bottom: 20rem;
        .top {
            display: flex;
            align-items: center;
            position: relative;
            top: -20rem;
            z-index: 101;
            .l {
                
                img {
                    border-radius: 50%;
                    width: 100rem;
                }
            }
            p {
                width: 120rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 15rem;
                font-size: 16rem;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            font-size: 14rem;
            align-items: center;
            .left {
                span {
                    color: #808080;
                    margin-right: 8rem;
                    &:nth-of-type(2) {
                        margin-left: 15rem;
                    }
                }
            }
            .guanzhu {
                color: #000000;
                background-color: #ffe131;
                display: inline-block;
                padding: 7rem 25rem;
                border-radius: 20rem;
            }
        }
    }
    .tabs {
        width: 100%;
        position: sticky;
        background-color: #1a1a1a;
        z-index: 101;
        top: -1rem;
        left: 0;
        display: flex;
        justify-content: space-between;
        .tabs-slide {
            transition: all .3s;
            position: absolute;
            bottom: 0;
            left: 16rem;
            width: 40%;
            height: 2rem;
            background-color: #fff;
        }
        &>span {
            width: 50%;
            text-align: center;
            font-size: 14rem;
            color: #848484;
            padding: 10rem 0;
        }
        .active {
            color: #ffffff;
        }
    }
    .sec2 {
        width: 200vw;
        display: flex;
        transition: all .3s;
        .left,
        .rights {
            height: 100%;
            flex: none;
            width: 100vw;
            box-sizing: border-box;
            padding-right: 40rem;
        }
        .rights {
            
        }
        color: #8d8d8d;
        .info {
            // height: 800rem;
            font-size: 14rem;
            font-weight: bold;
            padding-bottom: 40rem;
        }
        .mask {
            border-radius: 10rem;
            width: 100%;
            height: 400rem;
            background-size: cover; 
            position: relative;
            .btm {
                position: absolute;
                width: 101%;
                box-sizing: border-box;
                padding: 5rem 15rem;
                bottom: -1rem;
                left: 0;
                border-radius: 0 0 10rem 10rem;
                // background-color: #324545;
                backdrop-filter: blur(60rem);
                // box-shadow: 0 -5rem 10rem 4rem rgb(60, 60, 60);
                h4 {
                    font-size: 18rem;
                    margin: 0 0 15rem;
                    color: #ffffff;
                }
                p {
                    color: #fefefe;
                    font-weight: normal;
                    font-size: 14rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3; /* 设置显示文本的行数 */
                    -webkit-box-orient: vertical; 
                } 
            }
            
            
        }
        .songs-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                height: 20rem;
            }
            .lf {
                display: flex;
                align-items: center;
                h4 {
                    font-size: 15rem;
                    margin-right: 8rem;
                }
                img {
                    height: 30rem;
                }
            }
        }
        .mv {
            position: relative;
            border-radius: 8rem 8rem 0 0;
            .dur {
                color: #ffffff;
                font-size: 14rem;
                position: absolute;
                right: 15rem;
                bottom: 10rem;
            }
            .mv-img {
                position: relative;
            }
            img {
                border-radius: 8rem;
                display: block;
                width: 100%;
            }
            p {
                color: #e1e1e1;
                font-size: 16rem;
                letter-spacing: 1rem;
            }
            .open {
                position: absolute;
                left: 0;
                right: 0;
                width: 17rem;
                height: 24rem;
                top: 50%;
                transform: translateY(-50%);
                margin: 0 auto;
                border-radius: 50%;
                padding: 10rem 14rem;
                background-color: rgba(0,0,0,.3);
            }
            .sanjiao {
                position: relative;
                left: 2rem;
                display: inline-block;
                box-sizing: border-box;
                width: 0;
                height: 0;
                border-right: 12rem solid transparent;
                border-left: 18rem solid #ffe131;
                border-top: 12rem solid transparent;
                border-bottom: 12rem solid transparent;
            }
        }
    }
    
    


</style>