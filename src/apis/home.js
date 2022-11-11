import {Myaxios} from './util'
// import axios from 'axios'

// 获取首页初始数据
export const getHomeData = async function() {
    let {data} = await Myaxios('/homepage/block/page')
    return data.data
}

// 获取首页歌单数据
export const getSongList = async function () {
    let {data} = await Myaxios('/personalized', {limit: 10})
    // let {data} = await axios.get('/m/gedan.json')
    // console.log(data);
    return data.result
}

// 获取推荐电台数据
export const getRadioList = async function () {
    // /personalized/djprogram
    let {data} = await Myaxios('/dj/recommend')
    return data.djRadios
}

// 获取精选歌单数据
export const getCarefulChoseList = async function () {
    // /personalized/djprogram
    let {data} = await Myaxios('/top/playlist/highquality', {limit: 30})
    // console.log(data.playlists);
    return data.playlists
}

// 获取专辑推荐列表
export const getAlbum = async function () {
    // https://apis.netstart.cn/music/personalized/newsong?limit=15
    let {data} = await Myaxios('/album/newest')
    // console.log(data);
    return data.albums
}

// 获取专辑详情
export const getAlbumDetail = async function (id) {
    let {data} = await Myaxios('/album', {id})
    // console.log(data.album);
    return data.album
}

// 获取热门话题
export const getHotTopic = async function () {
    // /hot/topic?limit=10&offset=0
    let {data} = await Myaxios('/hot/topic', {limit:10,offset:0})
    return data.hot
}

// 获取电台节目  /dj/program?rid=975555134&limit=20
export const getRadioItem = async function (id) {
    let {data} = await Myaxios('/dj/program',{
        rid:id,
        limit: 15
    })
    // console.log(data);
    return data.programs
}

// 获取新鲜发行数据
export const getNewSongs = async () => {
    let {data} = await Myaxios('/personalized/newsong', {limit: 12})
    // console.log(data);
    return data.result
}