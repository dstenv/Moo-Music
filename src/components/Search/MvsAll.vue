<template>
    <div class="mvs-all">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <img src="@/assets/Icons/ic_arrow_back.png" @click="$emit('backArtist',false)">
                <h4>视频</h4>
                <div></div>
            </nav>
        </header>
        <ul class="list">
            <li v-for="(item,index) in listData" :key="index">
                <router-link :to="'/search/artist/mv/' + item.id">
                    <div class="mv-img">
                        <img :src="item.imgurl" v-lazy="item.imgurl">
                        <div class="open">
                            <div class="sanjiao"></div>
                        </div>
                        <span class="dur">{{formatDur(item.duration)}}</span>
                    </div>
                </router-link>
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        listData: Array,
        size:Number,
    },  
    methods: {
        formatDur(time) {
            time = Math.floor(time / 1000)
            let m = (Math.floor(time / 60) + 100 + '').slice(1)
            let s = (Math.floor(time % 60) + 100 + '').slice(1)
            return m + ':' + s
        }
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
    }
}
</script>
<style lang="scss" scoped>
    .mvs-all {
        color: #ffffff;
        overflow: hidden;
        background-color: #1a1a1a;
        width: 100vw;
        height: 100vh;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        background-color: #1a1a1a;
        width: 100vw;
        box-sizing: border-box;
        padding: 20rem;
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                height: 30rem;
            }
            h4 {
                margin: 0;
                font-size: 16rem;
                font-weight: bold;
            }
            div {
                width: 30rem;
                height: 30rem;
            }
        }
    }
    .list {
        margin-top: 70rem;
        padding: 0 20rem;
        max-height: calc(100vh - 70rem - 65rem);
        overflow: auto;
        &>li {
            overflow: hidden;
            margin-bottom: 5rem;
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