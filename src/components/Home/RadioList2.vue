<template>
    <div class="radio-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <h4>{{radioList?.title}}</h4>
        <ul class="radio" :style="{'background-image':`url(${backgroundImage})`}">
            <li v-for="item in radioList?.data" :key="item.id">
                <div class="left">
                    <div class="l-bg" :style="{'background-image':`url(${item.picUrl})`}"></div>
                    <img src="@/assets/imgs/tapebg.png" alt="">
                    <!-- <div class="rotate"> -->
                        <!-- <img src="@/assets/imgs/radio-inner.png" class="img-inner" alt=""> -->
                        <img src="@/assets/imgs/radio-bigcart.png" class="img-bigcart" alt="">
                        <img src="@/assets/imgs/radio-bigcart.png" class="img-bigcart right" alt="">
                    <!-- </div> -->
                </div>
                <div class="right">
                    <span>{{item.name}}</span>
                    <div class="btm">
                        <img :src="playImg[0]" alt="">
                        <img :src="play? playImg[2]:playImg[1]" alt="">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            index: 0,
            radioTimer: null,
            play: null,
            playImg: [
                require('@/assets/imgs/radio-ruler.png'),
                require('@/assets/imgs/radio-btn.png'),
                require('@/assets/imgs/radio-btnplaying.png')
            ]
        }
    },
    props: {
        radioList: Object
    },
    methods: {
        
    },
    mounted() {
        this.radioTimer = setInterval(() => {
            this.index = (this.index + 1) % 8
        }, 3000);
    },
    beforeDestroy() {
        clearInterval(this.radioTimer)
    },
    computed: {
        backgroundImage() {
            return require(`@/assets/imgs/radio-${this.index}.png`)
        }
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
    .radio-list {
        margin-top: 10rem;
        overflow: hidden;
        h4 {
            color: #8d8d8d;
            font-size: 16rem;
        }
    }
    .radio {
        transition: background 1.5s ease-in-out;
        width: 100%;
        box-sizing: border-box;
        height: 95rem;
        border-radius: 10rem;
        background-size: cover;
        display: flex;
        padding: 15rem;
        overflow: auto;
        &>li {
            flex: none;
            width: 100%;
            display: flex;
            .left {
                position: relative;
                img {
                    position: relative;
                    z-index: 6;
                    width: 110rem;
                }
                .l-bg {
                    position: absolute;
                    left: 10rem;
                    width: 79rem;
                    border-radius: 5rem 5rem 0 0;
                    top: 8.5rem;
                    height: 36rem;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    z-index: 10;
                }
                .rotate {
                    position: absolute;
                    width: 63rem;
                    height: 18rem;
                    top: 21rem;
                    left: 24rem;
                }
                .img-inner {
                    position: absolute;
                    width: 63rem;
                    z-index: 5;
                }
                .img-bigcart {
                    position: absolute;
                    top: 12.6rem;
                    left: 16rem;
                    width: 30rem;
                    z-index: 4;
                }
                .right {
                    left: 54.5rem;
                }
            }
            &>.right {
                box-sizing: border-box;
                padding-left: 15rem;
                span {
                    display: inline-block;
                    width: 145rem;
                    font-size: 18rem;
                    color: #fff;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    // display: -webkit-box;
                    // -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                    // -webkit-box-orient: vertical; 
                }
                .btm {
                    margin-top: 5rem;
                    img {
                        &:first-of-type {
                            width: 90rem
                        }
                        &:nth-of-type(2) {
                            display: inline-block;
                            padding-left: 10rem;
                            width: 50rem;
                        }
                    }
                }
            }
        }
    }
</style>









<template>
    <div class="radio-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <h4>{{radioList?.title}}</h4>
        <ul class="radio" :style="{'background-image':`url(${backgroundImage})`}">
            <li v-for="item in radioList?.data" :key="item.id">
                <div class="left">
                    <div class="l-bg" :style="{'background-image':`url(${item.picUrl})`}"></div>
                    <img src="@/assets/imgs/radio-bg.png" alt="">
                    <div class="rotate">
                        <img src="@/assets/imgs/radio-inner.png" class="img-inner" alt="">
                        <img src="@/assets/imgs/radio-bigcart.png" class="img-bigcart" alt="">
                        <img src="@/assets/imgs/radio-bigcart.png" class="img-bigcart right" alt="">
                    </div>
                </div>
                <div class="right">
                    <span>{{item.name}}</span>
                    <div class="btm">
                        <img :src="playImg[0]" alt="">
                        <img :src="play? playImg[2]:playImg[1]" alt="">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            index: 0,
            radioTimer: null,
            play: null,
            playImg: [
                require('@/assets/imgs/radio-ruler.png'),
                require('@/assets/imgs/radio-btn.png'),
                require('@/assets/imgs/radio-btnplaying.png')
            ]
        }
    },
    props: {
        radioList: Object
    },
    methods: {
        
    },
    mounted() {
        this.radioTimer = setInterval(() => {
            this.index = (this.index + 1) % 8
        }, 3000);
    },
    beforeDestroy() {
        clearInterval(this.radioTimer)
    },
    computed: {
        backgroundImage() {
            return require(`@/assets/imgs/radio-${this.index}.png`)
        }
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
    .radio-list {
        margin-top: 10rem;
        overflow: hidden;
        h4 {
            color: #8d8d8d;
            font-size: 16rem;
        }
    }
    .radio {
        transition: background 1.5s ease-in-out;
        width: 100%;
        box-sizing: border-box;
        height: 95rem;
        border-radius: 10rem;
        background-size: cover;
        display: flex;
        padding: 15rem;
        overflow: auto;
        &>li {
            flex: none;
            width: 100%;
            display: flex;
            .left {
                position: relative;
                img {
                    position: relative;
                    z-index: 2;
                    width: 110rem;
                }
                .l-bg {
                    position: absolute;
                    left: 5rem;
                    width: 98rem;
                    border-radius: 5rem 5rem 0 0;
                    top: 4.5rem;
                    height: 45rem;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    z-index: 3;
                }
                .rotate {
                    position: absolute;
                    width: 63rem;
                    height: 18rem;
                    top: 21rem;
                    left: 24rem;
                }
                .img-inner {
                    position: absolute;
                    padding: 20rem;
                    width: 63rem;
                    z-index: 5;
                }
                .img-bigcart {
                    position: absolute;
                    top: -8.4rem;
                    left: -8.7rem;
                    width: 35rem;
                    z-index: 4;
                }
                .right {
                    left: 37rem;
                }
            }
            &>.right {
                box-sizing: border-box;
                padding-left: 15rem;
                span {
                    display: inline-block;
                    width: 145rem;
                    font-size: 18rem;
                    color: #fff;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    // display: -webkit-box;
                    // -webkit-line-clamp: 2; /* 设置显示文本的行数 */
                    // -webkit-box-orient: vertical; 
                }
                .btm {
                    margin-top: 5rem;
                    img {
                        &:first-of-type {
                            width: 90rem
                        }
                        &:nth-of-type(2) {
                            display: inline-block;
                            padding-left: 10rem;
                            width: 50rem;
                        }
                    }
                }
            }
        }
    }
</style>
