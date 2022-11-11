import { Myaxios } from "./util";
// import axios from "axios";

// 歌单详情 /playlist/detail 需要歌单id参数
export const SongSheetDetail = async function (id) {
    let {data} = await Myaxios('/playlist/detail', {id})
    // console.log(data);
    return data.playlist
}

// 专辑详情 需要专辑id
export const AlbumDetail = async (id) => {
    let {data} = await Myaxios('/album',{id})
    // console.log(data);
    return data
}

// 歌词  /lyric?id=33894312
export const getLyric = async (id) => {
    let {data} = await Myaxios('/lyric', {id})
    return data.lrc
}