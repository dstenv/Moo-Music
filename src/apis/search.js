import { Myaxios } from "./util"

// 热门歌手  /top/artists?offset=0&limit=10
export const getHotSonger = async function () {
    let {data} = await Myaxios('/top/artists', {offset: 0, limit: 15})
    return data.artists
}

// 热门搜索  /search/hot/detail
export const getHotSearch = async function () {
    let {data} = await Myaxios('/search/hot/detail')
    return data.data
}

// 热门歌单分类  /playlist/hot
export const getHotListType = async function () {
    let {data} = await Myaxios('/playlist/hot')
    return data.tags
}

// 获取搜索建议  /search/suggest?keywords=薛之谦&type=mobile
export const getSearchSuggest = async function (word) {
    let{data} = await Myaxios('/search/suggest', {
        keywords: word,
        type: 'mobile'
    })
    // console.log(data);
    return data.result.allMatch
}

// 获取搜索结果
export const getSearchResult = async (word) => {
    let {data} = await Myaxios('/search', {
        keywords: word,
    })
    return data.result
}

// 获取艺人歌曲  /artists
export const getSongByArtist = async (id) => {
    let {data} = await Myaxios('/artists',{id})
    return data
}
// 获取艺人专辑
export const getAlbumByArtist = async (id) => {
    let {data} = await Myaxios('/artist/album',{id})
    return data
}
// 获取艺人mv
export const getMvByArtist = async (id) => {
    let {data} = await Myaxios('/artist/mv',{id})
    return data.mvs
}

// 获取Mv数据
export const getMvData = async (id) => {
    let {data} = await Myaxios('/mv/detail',{mvid:id})
    let res = await Myaxios('/mv/url',{id})
    let res2 = await Myaxios('/comment/mv',{id})
    data.data.url = res.data.data.url
    data.data.commentData = res2.data
    // console.log(data,res);
    return data.data
}