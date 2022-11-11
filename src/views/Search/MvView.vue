<template>
    <div class="mv-view">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <div class="load-box" v-if="!load">
            <van-loading 
                class="van-load"
                v-if="!load" color="#1989fa"
                :size="'100rem'"
            />
        </div>
            <header>
                <nav>
                    <img src="@/assets/Icons/ic_arrow_back.png" @click="$router.back(-1)">
                    <img src="@/assets/Icons/icon_more.png" >
                </nav>
                <!-- width="375" height="300"  autoplay  -->
                <video class="h-v" controls :src="mvData.url" v-if="load"
                    style="width: 375rem;height: 250rem;"
                ></video>
            </header>
            <div class="head"></div>
            <main v-if="load">
                <section>
                    <div class="info">
                        <div class="left">
                            <p>{{mvData.name}}</p>
                            <div>
                                <div class="ar-pic" 
                                    v-for="(item,index) in artistPic" :key="index"
                                    v-lazy:background-image="item"
                                    :style="{'background-image': `url(${item})`,left: `${-index * 15}rem`}"
                                >
                                </div>
                                <span>{{artistName}}</span>
                            </div>
                        </div>
                        <div class="right">
                            <img src="@/assets/Icons/icon_like.png" >
                        </div>
                    </div>
                    <p class="publish">发行时间：{{mvData.publishTime}}</p>
                    <ul class="type-list">
                        <li v-for="(item,index) in typeArr" :key="index">
                            <span>#{{item}}</span>
                        </li>
                    </ul>
                </section>
                <p class="comment-title">评论 <span>{{mvData.commentData?.total}}条</span></p>
                <!-- hand_like_gray.png -->
                <ul class="comment-list">
                    <li v-for="item in mvData.commentData?.comments" :key="item.time">
                        <div class="top">
                            <div class="c-left">
                                <img v-lazy="item.user.avatarUrl">
                                <span class="user">{{item.user.nickname}}</span>
                                <span class="time">{{formatTime(item.time)}}</span>
                            </div>
                            <div class="c-right">
                                <img src="@/assets/Icons/hand_like_gray.png" >
                                <span>{{item.likedCount}}</span>
                            </div>
                        </div>
                        <p>{{item.content}}</p>
                    </li>
                </ul>
            </main>
            <footer>
                <div class="foot-comment">
                    <!-- icon_emoticon.png -->
                    <input type="text" placeholder="说点有用的">
                    <img src="@/assets/Icons/icon_emoticon.png" >
                </div>
            </footer>
        </div>
</template>
<script>
import {getMvData} from '@/apis/search'
import { Toast } from 'vant'

export default {
    data() {
        return {
            mvId: 0,
            mvData: {},
            typeArr: [
                'Rap','Pop','Pop Rap'
            ],
            load: false
        }
    },
    props: {
    },
    methods: {
        formatTime(commentTime) {
            let date = new Date(commentTime)
            let Todayear = new Date().getFullYear()
            let year = date.getFullYear()
            let mon = (date.getMonth() + 1 + 100 + '').slice(1)
            let day = (date.getDate() + 100 + '').slice(1)
            let h = (date.getHours() + 100 + '').slice(1)
            let m = (date.getMinutes() + 100 + '').slice(1)
            if(Todayear == year) {
                return `${mon}-${day} ${h}:${m}`
            }
            return `${year}-${mon}-${day} ${h}:${m}`
        }
    },
    computed: {
        artistPic() {
            return this.mvData.artists?.map(v => v.img1v1Url)
        },
        artistName() {
            return this.mvData.artists?.map(v => v.name).join(' / ')
        },
        
    },
    watch: {
        
    },
    created() {
        this.mvId = this.$route.params.id
        // console.log(this.mvId);
        getMvData(this.mvId).then(res => {
            // console.log(res);
            this.load = true
            this.mvData = res
            console.log(this.mvData);
        }).catch(() => {
            this.load = true
            Toast.fail('网络错误,请刷新！')
        })
    },
    
}
</script>
<style lang="scss" scoped>
    ::-webkit-scrollbar {
        display: none;
    }
    .mv-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        color: #ffffff;
        background-color: #1a1a1a;
        // background-color: #fff;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: #1a1a1a;
        width: 100vw;
        box-sizing: border-box;
        padding: 20rem;
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            img {
                height: 30rem;
            }
        }
        .h-v {
            position: relative;
            left: -20rem;
        }
    }
    .head {
        width: 100vw;
        height: 322.54rem;
    }
    main {
        max-height: calc(100vh - 322.7rem - 70rem);
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0 20rem;
    }
    .load-box {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100rem;
        height: 100rem;
        right: 0;
        margin: auto;
        overflow: hidden;
    }
    .info {
        padding: 0 0 10rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            width: calc(100% - 30rem);
            &>div {
                display: flex;
                align-items: center;
            }
            p ,
            span {
                width: 80%;
                font-size: 14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span {
                display: inline-block;
                font-weight: bold;
                margin-left: 8rem;
            }
            .ar-pic {
                flex: none;
                position: relative;
                width: 30rem;
                height: 30rem;
                background-size: cover;
                border-radius: 50%;
            }
        }
        .right {
            flex: none;
            width: 30rem;
            img {
                width: 100%;
            }
        }
    }
    .publish {
        color: #757575;
        font-size: 13rem;
    }
    .type-list {
        padding: 10rem 0 25rem;
        display: flex;
        &>li {  
            flex: none;
            margin-right: 10rem;
            span {
                display: inline-block;
                padding: 10rem 17rem;
                border-radius: 999rem;
                background-color: #ffe131;
                color: #000;
            }
        }
    }
    .comment-title {
        position: sticky;
        top: -1rem;
        left: 0;
        font-size: 15rem;
        letter-spacing: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        padding-bottom: 15rem;
        background-color: #1a1a1a;
        border-bottom: 1rem solid #3c3c3c;
        span {
            color: #848484;
            font-size: 12rem;
            font-weight: normal;
            letter-spacing: 0;
        }
    }
    .comment-list {
        &>li {
            border-bottom: 1rem solid #3c3c3c;
        }
        .top {
            padding: 20rem 0;
            display: flex;
            justify-content: space-between;
            .c-left {
                display: flex;
                align-items: center;
                img {
                    width: 30rem;
                    border-radius: 50%;
                }
                span {
                    margin-left: 8rem;
                    display: inline-block;
                }
                .user {
                    max-width: 130rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 13.5rem;
                }
                .time {
                    color: #797979;
                }
            }
            .c-right {
                display: flex;
                align-items: center;
                span {
                    margin-left: 5rem;
                    color: #797979;
                }
                img {
                    height: 25rem;
                    display: block;
                }
            }
        }
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12.5rem;
            margin-top: 0;
            white-space: nowrap;
            width: 100%;
            color: #797979;
        }
    }
    ::-webkit-input-placeholder {
        font-size: 13rem;
        color: #888888;
    }
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        background-color: #1a1a1a;
        .foot-comment {
            background-color: #1a1a1a;
            width: 100vw;
            position: relative;
            padding: 15rem 25rem;
            box-sizing: border-box;
            input {
                background-color: #303030;
                height: 40rem;
                outline: none;
                border: none;
                border-radius: 999rem;
                width: 100%;
                box-sizing: border-box;
                padding-left: 20rem;
            }
            img {
                display: block;
                position: absolute;
                right: 31rem;
                top: 0;
                bottom: 0;
                margin: auto 0;
                height: 30rem;
            }
        }
    }
</style>