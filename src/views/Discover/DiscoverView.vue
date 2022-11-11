<template>
    <div class="discover">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav>
                <h3 :class="{'nav-active': navSel == '推荐'}" @click="changeNav('推荐')"><span>推荐</span></h3>
                <h3 :class="{'nav-active': navSel == '关注'}" @click="changeNav('关注')"><span>关注</span></h3>
            </nav>
        </header>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navSel: '推荐'
        }
    },
    methods: {
        changeNav(value) {
            this.navSel = value
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
    .discover {
        background-color: #000;
        width: 100vw;
        height: calc(100vh - 59rem);
        overflow: auto;
        padding: 0 20rem 0;
        box-sizing: border-box;
        header {
            width: calc(100vw - 40rem);
            position: fixed;
            background-color: #000;
            padding-top: 20rem;
            top: 0;
            left: 20rem;
            z-index: 999;
            overflow: hidden;
        }
        nav {
            display: flex;
            // align-items: center;
            h3 {
                margin-top: 0;
                margin-bottom: 0;
                width: 50rem;
                height: 30rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: normal;
                &:first-of-type {
                    margin-right: 15rem;
                }
                span {
                    transition: all .3s linear;
                    font-size: 16rem;
                    color: #fff;
                }
            }
            .nav-active {
                span {
                    font-weight: bold;
                    font-size: 24rem;
                }   
            }
        }
    }
</style>