<template>
    <div class="new-song">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <h4>{{SongData.title}}</h4>
            <img :src="audioPlayStatus && isHave? btn.play:btn.paused" @click="beginList">
        </nav>
        <main ref="main">
            <div class="box" @touchstart="begin" @touchend="end" ref="box">
                <div class="songs-list" v-for="(sl,i) in list" :key="i" @click="changeList">
                    <song-list-item :songlists="sl" :isPlayList="false"/>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import SongListItem from './SongListItem.vue';
export default {
    components: { SongListItem },
    data() {
        return {
            touchstart: 0,
            index: 0,
            count: 3,
            btn: {
                paused: require('@/assets/imgs/radio-btn.png'),
                play: require('@/assets/imgs/radio-btnplaying.png')
            }
        }
    },
    props: {
        SongData: Object
    },
    methods: {
        ...mapMutations(['setSongList','setAudioPlayStatus','setPlayingMusic']),
        begin(event) {
            this.touchstart = event.changedTouches[0].pageX
        },
        active(direction) {
            if(direction == 'left') {
                console.log('向左滑动');
                this.index = this.index + 1 >= (this.SongData.data?.length / this.count) - 1? (this.SongData.data?.length / this.count) - 1:this.index+1
            }else {
                console.log('向右滑动');
                this.index = this.index <= 0? 0:this.index-1
            }
            // console.log(parseFloat(getComputedStyle(this.$refs.box).width));
            this.$refs.box.style.transform = `translate(${-parseFloat(getComputedStyle(this.$refs.main).width) * this.index}rem)`
        },
        end(event) {
            if(event.changedTouches[0].pageX - this.touchstart > 40) {
                this.active('right')
            }
            else if(this.touchstart - event.changedTouches[0].pageX > 40) {
                this.active('left')
            }
        },
        beginList() {
            this.setSongList(this.SongData?.data)
            if(!this.isHave) {
                this.setPlayingMusic(this.SongData?.data[0])
                this.$store.commit('setradioStation',null)
                this.setAudioPlayStatus(true)
            }
            else {
                this.setAudioPlayStatus(!this.audioPlayStatus)
            }
        },
        changeList() {
            this.$store.commit('setradioStation',null)
            this.setSongList(this.SongData?.data)
        }
    },
    computed: {
        ...mapState(['audioPlayStatus','playingMusic']),
        list() {
            let arr = []
            for(let i = 0; i < this.SongData.data?.length; i+=this.count){
                arr.push(this.SongData.data?.slice(i,i+this.count))
            }
            return arr
        },
        isHave() {
            return this.SongData?.data?.findIndex( v => v.id == this.playingMusic.id) != -1
        }
    },
    watch: {
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    .new-song {
        margin-top: 10rem;
        color: #fff;
        h4 {
            margin-right: 8rem;
            color: #8d8d8d;
            font-size: 16rem;
        }
    }
    nav {
        display: flex;
        align-items: center;
        &>img {
            height: 27rem;
        }
    }
    main {
        width: 100%;
        overflow: hidden;
    }
    .box {
        transition: all .5s ease-out;
        width: calc(400%);
        display: flex;
    }
</style>