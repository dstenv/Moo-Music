<template>
    <div class="home">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <h3>首页</h3>
            </nav>
        </header>
        <main>
            <section>
                <song-list :list="songReList"/>
            </section>
            <section>
                <radio-list :radioList="radioList"/>
            </section>
            <section>
                <carefully-chosen :list="carefulChose"/>
            </section>
            <section>
                <new-songs :SongData="newSongs"/>
            </section>
            <section>
                <album-component :albumRecommend="albumRecommend"/>
            </section>
            <section>
                <hot-topic :hotTopic="hotTopic"/>
            </section>
        </main>
    </div>
</template>
<script>
// getHomeData
import { getSongList,getRadioList,getCarefulChoseList,getAlbum,getHotTopic, getNewSongs} from '@/apis/home'
import SongList from '@/components/Home/SongList.vue'
import RadioList from '@/components/Home/RadioList.vue'
import CarefullyChosen from '@/components/Home/CarefullyChosen.vue'
import NewSongs from '@/components/Home/NewSongs.vue'
import AlbumComponent from '@/components/Home/AlbumComponent.vue'
import {mapState} from 'vuex'
import HotTopic from '@/components/Home/HotTopic.vue'

export default {
    components: { SongList, RadioList,CarefullyChosen, NewSongs, AlbumComponent, HotTopic },
    data() {
        return {
            initData: {},
            songReList: [],
            radioList: {},
            carefulChose: {},
            newSongs: {},
            albumRecommend: {},
            albumInfo: [
                "进入2021年后因为大流行，被延迟的巡演计划最终取消，在此期间乐队已着手制作他们的第五张录音室专辑，今日英国曼彻斯特的独立/另类摇滚乐队The 1975携新专辑《Being Funny In A Foreign Language》正式与大家见面~与前四张专辑相同，开篇都以一首乐队的同名单曲《The 1975》作为序曲，同时收录四首先行曲目《Part Of The Band》《Happiness》《I'm In Love With You》以及《All I Need To Hear》共十一首新单，随着专辑的发行，他们也将开启名为'The 1975 at their Very Best'的全球巡演。",
                '我是这个世界上的健将，我的骨骼像是振金，我的体格完美贴合人体黄金分割比例，我的肌肉像是赫尔墨斯附身般长出翅膀，我流下的每一滴汗水都会变成钻石，我去过的每一个地方都会开满健身房，但要打败我很容易只需要伤害我的心',
                "拥有绝对音感的天才创作歌手Charlie Puth第三张录音室专辑《CHARLIE》终于正式上线！这张在数千万网友见证下从灵感采集到制作完成的专辑，共收录12首歌，专辑主打《Loser》，也是断眉私心最爱的一首，同步公开。专辑以《CHARLIE》名字命名，断眉用有趣的音效、编曲和歌词，记录近几年的生活经历和情感起伏的个人化世界。首单《Light Switch》以开关声为灵感来源，灵动的编曲充满趣味。和BTS田柾国合作的放克风格先行曲《Left and Right》，一经发布就席卷各大榜单。《Smells Like Me》、《That's Hilarious》、《I Don't Think That I Like Her》讲述感情中的伤痛与心碎。Charlie Puth旺盛的创作力不仅为他拿到多个音乐大奖和提名，由他为The Kid Laroi 和 Justin Bieber共同创作和制作的《Stay》也成为了2021年最热门的单曲之一，并在Billboard Global 200上霸榜10+周"
            ],
            hotTopic: {},
        }
    },
    methods: {
        
    },
    computed: {
        ...mapState(['songList'])
    },
    watch: {
        
    },
    created() {
        // getHomeData().then(res => {
        //     this.initData = res
        //     console.log('首页page数据',this.initData);
        // })
        getSongList().then(res => {
            this.songReList = res
            console.log('推荐歌单 --> ',this.songReList);
        })
        getRadioList().then(res => {
            this.radioList = {
                title: '推荐电台',
                data: res
            }
            console.log('推荐电台 --> ',this.radioList);
        })
        getCarefulChoseList().then(res => {
            this.carefulChose = {
                title: '精选歌单',
                data: res
            }
            console.log('精选歌单 --> ',this.carefulChose);
        })
        getNewSongs().then(res => {
            this.newSongs = {
                title: '新鲜发行',
                data: res
            }
            console.log('新鲜发行 --> ',this.newSongs);
        })
        getAlbum().then(res => {
            let type = ['Rock','Pop','Classical']
            res.forEach((v,index) => {
                v.type = type[index % type.length]
                v.info = this.albumInfo[index % type.length]
            })
            this.albumRecommend = {
                title: '专辑推荐',
                data: res
            }
            console.log('专辑推荐 --> ',this.albumRecommend);
        })
        getHotTopic().then(res => {
            this.hotTopic = {
                title: 'MOO热门话题',
                data: res
            }
            console.log('热门话题 --> ',this.hotTopic);
        })
    },
}
</script>
<style lang="scss" scoped>
    .home {
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
            top: 0;
            left: 20rem;
            z-index: 999;
            overflow: hidden;
        }
        nav>h3 {
            margin-top: 0;
            margin-bottom: 20rem;
            font-size: 23rem;
            font-weight: bold;
            color: #fff;
        }
    }
    main {
        margin-top: 70rem;
        padding-bottom: 70rem;
    }
</style>