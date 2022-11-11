<template>
    <div class="lyric-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <header>
            <nav @click="sendPlice">
                <img src="@/assets/Icons/ic_arrow_more.png" >
                <span>返回歌曲</span>
            </nav>
        </header>
        <main>
            <ul class="list" ref="list">
                <li v-for="(item,index) in listData" :key="index" 
                    :class="{active: index == currentRic}"
                    @click="setLyric(item.time,index)"
                >
                    <p>{{item.text}}</p>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>

export default {
    data() {
        return {
            H: 0,
            moveH: 0
        }
    },
    props: {
        listData: Array,
        id: Number,
        currentRic: Number
    },  
    methods: {
        sendPlice() {
            this.$emit('spliceId',this.id)
        },
        setLyric(date,index) {
            this.H = 33.2 * (index + 1)
            if(this.H >= 250) {
                this.moveH = this.H - 250
                this.$refs.list.style.transform = `translateY(${-this.moveH}rem)`
            }
            else {
                this.moveH = 250 - this.H
                this.$refs.list.style.transform = `translateY(${this.moveH}rem)`
            }
            this.$emit('setlyric',date)
        }
    },
    computed: {
        
    },
    watch: {
        currentRic() {
            this.H += 33.2
            if(this.H >= 250) {
                this.moveH += 33.2
                // console.log('移动ul');
                this.$refs.list.style.transform = `translateY(${-this.moveH}rem)`
            }
        }
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    .lyric-list {
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 70rem 20rem 0;
        header {            
            nav {
                position: relative;
                z-index: 10;
                display: flex;
                align-items: center;
                img {
                    transform: rotate(180deg);
                    height: 20rem;
                }
                span {
                    margin-left: 5rem;
                    font-size: 13rem;
                }
            }
        }
    }
    main {
        position: relative;
        margin-top: 10rem;
        // box-sizing: border-box;
        height: calc(100% - 70rem);
        overflow: hidden;
        z-index: 50;
    }
    .list {
        color: #f8f8f8;
        
        transition: all .3s linear;
        &>li {
            
            overflow: hidden;
            p {
                font-size: 15rem;
                margin-top: 14rem;
                margin-bottom: 0;
            }
        }
        .active {
            color: #000;
        }
    }
</style>