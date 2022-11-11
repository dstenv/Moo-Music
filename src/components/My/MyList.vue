<template>
    <div class="my-list">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <li v-for="(item,index) in MyList" :key="index">
                <img src="@/assets/imgs/default_pic.png" class="bg">
                <div class="bottom">
                    <img :src="item.icon" alt="">
                    <span>{{item.name}}</span>
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
        MyList: Array
    },
    methods: {
        
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
    ::-webkit-scrollbar {
        display: none;
    }
    .list {
        padding-top: 20rem;
        display: flex;
        width: 100%;
        overflow: auto;
        &>li {
            border-radius: 7rem;
            flex: none;
            margin-right: 10rem;
            background-color: #000000;
            .bottom {
                display: flex;
                padding: 5rem 0 5rem 5rem;
                align-items: center;
                img {
                    outline: none;
                    width: 25rem;
                }
                span {
                    margin-left: 5rem;
                    font-size: 13.5rem;
                    color: #7a7a7a;
                }
            }
            .bg {
                width: 60rem;
                padding: 30rem 20rem 0 20rem;
                display: block;
            }
        }
    }
</style>