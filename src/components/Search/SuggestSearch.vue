<template>
    <div class="suggest-search">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <li v-for="(item,index) in suggestList" :key="index" @click="$emit('changeShowRes',item.keyword)">
                {{item.keyword}}
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
    props:{
        suggestList: Array,
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
    .suggest-search {
        margin-top: 62.5rem;
    }
    .list {
        color: #dedede;
        font-size: 14rem;
        letter-spacing: .5rem;
        overflow: auto;
        padding-top: 25rem;
        &>li {
            margin-bottom: 20rem;
        }
    }
</style>