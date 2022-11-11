<template>
    <div class="hot-topic">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <nav>
            <h4>{{hotTopic.title}}</h4>
        </nav>
        <main>
            <ul class="list">
                <li v-for="item in hotTopic.data" :key="item.title">
                    {{item.title}}
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    props: {
        hotTopic: Object
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
    .hot-topic {
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
    .list {
        &>li {
            font-size: 15rem;
            padding: 10rem 10rem 10rem 0; 
            border-bottom: 1rem solid #4a4949;
            &:first-of-type {
                border-top: 1rem solid #4a4949;
            }
        }
    }
</style>