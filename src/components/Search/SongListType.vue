<template>
    <div class="songlist-type">
        <!-- vue简化开发 将template配置选项改为标签 -->
        <ul class="list">
            <li v-for="item in typeList" :key="item.eng">
                <p :style="{color: item.color}" class="eng">{{item.eng}}</p>
                <span class="chinese"># {{item.type}}</span>
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
        typeList: Array
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
        padding-bottom: 15rem;
        display: flex;
        flex-wrap: wrap;
        &>li {
            height: 127.2rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
            box-sizing: border-box;
            padding: 12rem 10rem;
            background-color: #262626;
            width: calc(50% - 10rem);
            margin-right: 10rem;
            margin-bottom: 10rem;
            border-radius: 10rem;
            color: #fff;
            .eng,
            .chinese {
                font-weight: bold;
            }
            .eng {
                margin: 10rem 0;
                font-size: 24rem;
            }
            .chinese {
                display: inline-block;
                background-color: #000000;
                padding: 6rem 15rem;
                border-radius: 20rem;
                font-size: 13rem;
            }
        }
    }
</style>