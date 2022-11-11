<template>
    <div class="song-item">
        <!-- vue简化开发 将template配置选项改为标签 -->
            <header>
                <div class="navmask"></div>
                <nav>
                <!-- ic_arrow_more.png   player-share-icon.png -->
                    <img src="@/assets/Icons/ic_arrow_more.png" @click="setSongItemStatus(!songItemStatus)">
                    <img src="@/assets/Icons/player-share-icon.png" alt="">
                </nav>
            </header>
            <main>
                <van-swipe style="height: 100vh;" ref="swiper"
                    vertical @change="onChange" :initial-swipe="musicIndex"
                    :show-indicators="false" :lazy-render="true" :duration="2000"
                >
                    <!-- :style="{'background-image': `url(${data.picUrl || data.al?.picUrl || data.artists[0].img1v1Url})`}" -->
                    <van-swipe-item 
                        
                        v-for="data in songList" :key="data.id"
                    >
                    <div class="maskbox">
                        <div class="swipemask">
                            <img 
                                :src="data.picUrl || data.al?.picUrl || data.artists[0].img1v1Url" 
                                v-lazy="data.picUrl || data.al?.picUrl || data.artists[0].img1v1Url"
                            />
                        </div>
                    </div>
                    <transition name="lyric-animate">
                        <LyricList :list-data="lyRic" :currentRic="currentRic" :id="data.id" v-show="lyricIndexArr.includes(data.id)" 
                            @spliceId="spliceId" @setlyric="setlyric"
                        />
                    </transition>
                    <div class="box" v-cloak v-show="!lyricIndexArr.includes(data.id)">
                        <section class="sec1" @click="setAudioPlayStatus(!audioPlayStatus)">
                            <!-- <img :src="data.picUrl || data.al?.picUrl || data.artists[0].img1v1Url"> -->
                            <div class="img" :style="{'background-image': `url(${data.picUrl || data.al?.picUrl || data.artists[0].img1v1Url})`}"></div>
                            <div class="mask" v-show="!audioPlayStatus">
                                <img src="@/assets/Icons/icon_mini_bar_play.png" alt="">
                            </div>
                        </section>
                        <section class="sec2">
                            <div class="s-name">
                                <p>{{data.name}}</p>
                                <!-- icon_like_selected.png -->
                                <img :src="isHaveMusic? heartPic.unlike:heartPic.like" @click="like">
                            </div>
                            <div class="s-artists">
                                <div class="left">
                                    <div 
                                        v-for="(item,index) in artistPic[0].picUrl? artistPic:{}" :key="index"
                                        class="singnal" :style="{'background-image': `url(${item?.picUrl})`,left: `${-index * 15}rem`}">
                                    </div>
                                    <span :class="{many: artistPic.length>1 && artistPic[0].picUrl}" :style="{left: `${-(artistPic.length - 1) * 15}rem`}">{{artistName}}</span>
                                </div>
                                <img src="@/assets/Icons/player-more.png" alt="">
                            </div>
                            <div class="s-lyric">
                                <p>{{lyRic[currentRic]?.text}}</p>
                                <img src="@/assets/Icons/lyric.png" @click="showLyricPage(data.id)">
                            </div>
                        </section>
                        <section class="sec3">
                            <!-- @change="onChange"  -->
                            <span>{{currentT}}</span>
                            <span>{{durationT}}</span>
                        </section>
                        <section class="sec4" @touchstart.stop @touchmove.stop @touchend.stop>
                            <van-slider 
                                active-color="#ffffff" :button-size="'15rem'"
                                v-model="currentValue"
                            />
                        </section>
                    </div>
                    </van-swipe-item>
                </van-swipe>
            </main>
        <footer>
            <div class="bottommask"></div>
        </footer>
        
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import {getLyric} from '@/apis/component'
import LyricList from './LyricList.vue'

export default {
    data() {
        return {
            heartPic: {
                like: require("@/assets/Icons/icon_like_selected.png"),
                unlike: require("@/assets/Icons/like_gray.png")
            },
            likeSongs: [],
            startY: 0,
            hasMove: 0,
            musicIndex: 0,
            lyRic: [],
            currentLyric: "",
            lyricIndexArr: []
        };
    },
    props: {
        currentT: String,
        durationT: String,
    },
    methods: {
        ...mapMutations(["setSongItemStatus", "setCurrentTime", "setAudioPlayStatus", "setPlayingMusic"]),
        like() {
            let find = this.likeSongs.findIndex(v => v.id == this.playingMusic.id);
            console.log(find, this.likeSongs);
            if (find == -1) {
                this.likeSongs.push(this.playingMusic);
            }
            else {
                this.likeSongs.splice(find, 1);
            }
            localStorage.likeSongs = JSON.stringify(this.likeSongs);
        },
        onChange(index) {
            this.musicIndex = index;
            this.setPlayingMusic(this.songList[this.musicIndex]);
            this.setAudioPlayStatus(true);
        },
        async getLyricBySong() {
            let res = await getLyric(this.playingMusic.id);
            this.lyRic = res.lyric.split("\n");
            // console.log('歌词1 -->',this.lyRic);
            let reg = /\[(\d*):(\d+\.\d*)\]\s*([䌀-龥].*|[A-Za-z].*)/;
            let arr = [];
            for (let i = 0; i < this.lyRic.length; i++) {
                if (reg.test(this.lyRic[i])) {
                    let time = parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2);
                    // console.log(RegExp.$3);
                    arr.push({
                        time,
                        text: RegExp.$3
                    });
                }
            }
            this.lyRic = arr;
            console.log("修改结构后歌词 -->", this.lyRic);
        },
        showLyricPage(id) {
            // this.lyricIndexArr.splice(this.lyricIndexArr.findIndex(v => v == id),1)
            this.lyricIndexArr.push(id)
            console.log(this.lyricIndexArr);
        },
        spliceId(id) {
            this.lyricIndexArr.splice(this.lyricIndexArr.findIndex(v => v == id),1)
            console.log(this.lyricIndexArr);
        },
        setlyric(value) {
            this.$emit("setAudioTime", value);
        }
    },
    computed: {
        ...mapState(["playingMusic", "songList", "songItemStatus", "duration", "currentTime", "audioPlayStatus"]),
        artistName() {
            if (this.playingMusic.song) {
                return this.playingMusic.song.artists.map(v => v.name).join(" / ");
            }
            else if (this.playingMusic.artists) {
                return this.playingMusic.artists.map(v => v.name).join(" / ");
            }
            return this.playingMusic.ar.map(v => v.name).join(" / ");
        },
        artistPic() {
            return this.playingMusic.song?.artists || this.playingMusic.artists || this.playingMusic.ar;
        },
        currentValue: {
            get() {
                return this.currentTime / this.duration * 100;
            },
            set(value) {
                let current = value / 100 * this.duration;
                this.$emit("setAudioTime", current);
            }
        },
        isHaveMusic() {
            return this.likeSongs.findIndex(v => v.id == this.playingMusic.id) == -1;
        },
        currentRic() {
            for (let i = 0; i < this.lyRic.length; i++) {
                if (this.currentTime < this.lyRic[i].time) {
                    return i - 1;
                }
            }
            return 0;
        }
    },
    watch: {
        playingMusic(newv) {
            this.musicIndex = this.songList.findIndex(v => v.id == newv.id);
            this.getLyricBySong();
            this.$nextTick(() => {
                // console.log(this.$refs.swiper,this.musicIndex);
                this.$refs.swiper?.swipeTo(this.musicIndex, 0, false);
            });
        }
    },
    created() {
        this.likeSongs = localStorage.likeSongs ? JSON.parse(localStorage.likeSongs) : [];
        this.musicIndex = this.songList.findIndex(v => v.id == this.playingMusic.id);
        this.getLyricBySong();
    },
    components: { LyricList }
}
</script>
<style lang="scss" scoped>
    .song-item {
        background-size: cover;
        height: 100vh;
        overflow: hidden;
    }
    .navmask,
    .bottommask  {
        position: absolute;
        width: 100%;
        z-index: 1;
        left: 0;
    }
    .navmask {
        height: 70rem;
        top: 0;
        background: linear-gradient(180deg,rgba(0,0,0,.2),transparent);
    }
    .bottommask {
        position: relative;
        bottom: 0;
        height: 170rem;
        background: linear-gradient(0, rgba(0,0,0,.2), transparent);
    }
    header,
    footer {
        width: 100%;
        position: fixed;
        left: 0;
        box-sizing: border-box;
        z-index: 10;
    }
    footer {
        bottom: 0;
        z-index: -1;
    }
    header {
        top: 0;
        padding: 20rem;
    }
    nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 10;
        img {
            height: 30rem;
            &:first-of-type {
                height: 22rem;
                transform: rotate(180deg);
            }
        }
    }
    .maskbox {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #cec9c9;
        width: 100vw;
        height: 100vh;
    }
    .swipemask {
        width: 100vw;
        height: 100vh;
        z-index: -1;
        filter: blur(60rem);
        img {
            width: 100%;
            height: 100%;
        }
    }
    .box {
        width: 100vw;
        height: 100vh;
        // backdrop-filter: blur(65rem);
        padding: 70rem 20rem 0;
        box-sizing: border-box;
        position: relative;
    }
    section {
        padding: 0 12rem;
    }
    .sec1 {
        padding-bottom: 15rem;
        position: relative;
        z-index: 10;
        img {
            width: 100%;
            display: block;
            border-radius: 8rem;
        }
        .img {
            border-radius: 8rem;
            width: 311.2rem;
            height: 311.2rem;
            background-size: cover;
        }
        .mask {
            border-radius: 8rem;
            background-color: rgba(0,0,0,.4);
            width: calc(100% - 24rem);
            height: calc(100% - 15rem);
            bottom: 15rem;
            left: 12rem;
            z-index: 5;
            position: absolute;
            img {
                display: block;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 120rem;
            }
        }
    }
    .sec2 {
        position: relative;
        z-index: 20;
        padding-bottom: 10rem;
        div {
            overflow: hidden;
        }
        .s-name {
            color: #f8f8f8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            p {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 20rem;
                font-weight: bold;
            }
            img {
                flex: none;
                display: block;
                height: 35rem;
            }
        }
        .s-artists {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10rem;
            span {
                color: #f8f8f8;
            }
            img {
                flex: none;
                display: block;
                height: 35rem;
            }
            .left {
                display: flex;
                align-items: center;
                .singnal {
                    border-radius: 50%;
                    width: 35rem;
                    height: 35rem;
                    background-size: cover;
                    position: relative;
                }
                span {
                    font-size: 14rem;
                    width: 160rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    letter-spacing: 1rem;
                    margin-left: 10rem;
                    font-weight: bold;
                }
                .many {
                    position: relative;
                    
                }
            }
        }
        .s-lyric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                flex: 1;
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14rem;
                color: #ddd;
            }
            img {
                flex: none;
                margin-right: 4rem;
                height: 28rem;
                outline: none;
            }
        }
    }
    .sec3 {
        padding-bottom: 15rem;
        margin-top: 30rem;
        display: flex;
        justify-content: space-between;
        span {
            color: #000;
            font-size: 14rem;
            font-weight: bold;
        }
    }
    .sec4 {
        position: relative;
    }
</style>