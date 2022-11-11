<template>
    <div class="my">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <h3>我的</h3>
                <img src="@/assets/Icons/icon-setting.png" alt="">
            </nav>
        </header>
        <main>
            <section>
                <div class="unlogin">
                    <!-- wechat_green.png -->
                    <div class="left">
                        <div class="l-img">
                            <img src="@/assets/Icons/wechat_green.png" alt="">
                        </div>
                        <div class="l-info">
                            <p>立即登录</p>
                            <span>拥有自己的音乐空间</span>
                        </div>
                    </div>
                    <div class="right">
                        <img src="@/assets/Icons/icon_search_up_arrow.png" alt="">
                    </div>
                </div>
            </section>
            <section>
                <my-list :MyList="MyList"/>
            </section>
            <section>
                <div class="nav">
                    <h4>推荐歌单</h4>
                </div>
                <recommend-list :DailyList="DailyList"/>
            </section>
        </main>
    </div>
</template>
<script>
import RecommendList from '@/components/My/RecommendList.vue'
import { getDailyList } from '@/apis/my'
import MyList from '@/components/My/MyList.vue'

export default {
    components: { RecommendList, MyList },
    data() {
        return {   
            DailyList: [],
            MyList: [
                {
                    name: '喜欢',
                    icon: require('@/assets/Icons/like_gray.png')
                },
                {
                    name: '历史',
                    icon: require('@/assets/Icons/icon_user_history_grey.png')
                },
                {
                    name: '本地',
                    icon: require('@/assets/Icons/icon_user_local_grey.png')
                },
                {
                    name: '已购',
                    icon: require('@/assets/Icons/icon_user_own_grey.png')
                },
            ]
        }
    },
    methods: {
        
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        getDailyList().then(res => {
            this.DailyList = res
            console.log('每日推荐歌单 --> ', this.DailyList);
        })
    }
}
</script>
<style lang="scss" scoped>
    .my {
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
        nav{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12rem 0;
            h3 {
                margin-top: 0;
                margin-bottom: 0;
                font-size: 23rem;
                font-weight: bold;
                color: #fff;
            }
            img {
                height: 35rem;
            }
        } 
    }
    section {
        overflow: hidden;
    }
    main {
        overflow: auto;
        margin-top: 80rem;
        margin-bottom: 55rem;
    }
    .unlogin {
        border-radius: 8rem;
        margin-top: 10rem;
        display: flex;
        justify-content: space-between;
        background-color:#0d0d0d;
        width: 100%;
        box-sizing: border-box;
        padding: 18rem 18rem 25rem 18rem;
        .left {
            display: flex;
            justify-content: space-between;
            color: #fff;
            .l-img {
                background-color: #fff;
                border-radius: 50%;
                img {
                    display: block;
                    height: 50rem;
                }
            }
            .l-info {
                padding-left: 15rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                p {
                    font-size: 14rem;
                    letter-spacing: 1rem;
                    margin-bottom: 0;
                    margin-top: 0;
                }
                span {
                    color: #747474;
                }
            }
        }   
        .right {
            flex: none;
            display: flex;
            align-items: center;
            img {
                display: block;
                height: 28rem;
                transform: rotate(90deg);
            }
        }
    }
    .nav {
        display: flex;
        align-items: center;
        margin-top: 10rem;
        overflow: hidden;
        // height: 300rem;
        h4 {
            margin-bottom: 15rem;
            color: #8d8d8d;
            font-size: 16rem;
        }
    }
</style>