<template>
    <div class="my-skeleton">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="skeleton" :class="{'album-list':isAlbum}">
            <li v-for="(item,index) in rowArr" :key="index">
                <div class="l"></div>
                <div class="r">
                    <p></p>
                    <span></span>
                </div>
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
        row: Number,
        isAlbum: {
            type: Boolean,
            default: false,
            require: false
        }
    },
    methods: {
        
    },
    computed: {
        rowArr() {
            return new Array(this.row)
        }
    },
    watch: {
        
    },
    created() {
    }
}
</script>
<style lang="scss" scoped>
    .skeleton {
        &>li {
            margin-bottom: 10rem;
            display: flex;
            .l {
                flex: none;
                width: 64rem;
                height: 64rem;
                border-radius: 8rem;
                background-color: #9d9e9f;
                animation: bgc 2s ease-in-out infinite;
            }
            .r {
                width: calc(100% - 64rem);
                box-sizing: border-box;
                padding-left: 15rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                p,
                span {
                    animation: bgc 2s ease-in-out infinite;
                    background-color: #9d9e9f;
                    width: 100%;
                    height: 18rem;
                }
                span {
                    display: inline-block;
                }
            }
        }
    }
    .album-list {
        display: flex;
        flex-wrap: wrap;
        &>li {
            width: calc(50% - 4rem);
            display: block;
            &:nth-of-type(2n-1) {
                margin-right: 8rem;
            }
            .l {
                width: 100%;
                height: 163.59rem;
            }
            .r {
                width: 100%;
                box-sizing: content-box;
                padding-left: 0;
                p,
                span {
                    width: 100%;
                }
                p {
                    margin: 8rem 0 5rem;
                }
            }
        }
    }
    @keyframes bgc {
        0% {
            background-color: #9d9e9f;
        }
        50% {
            background-color: #eeeff1;
        }
        100% {
            background-color: #9d9e9f;
        }
    }
</style>