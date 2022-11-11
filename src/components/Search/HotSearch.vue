<template>
    <div class="hot-search">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <!-- #000000 -->
            <li v-for="item in hotSearch" :key="item.searchWord">
                #<span>{{item.searchWord}}</span>
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
        hotSearch: Array
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
    .list {
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        &>li {
            padding: 8rem 20rem;
            background-color: #000000;
            color: #fff;
            border-radius: 25rem;
            margin-right:10rem;
            margin-bottom: 8rem;
            font-size: 13.5rem;
            font-weight: bold;
            span {
                margin-left: 3rem;
            }
        }
    }
</style>