import { Myaxios } from "./util"

// 获取每日推荐歌单  /recommend/resource
export const getDailyList = async function () {
    let {data} = await Myaxios('/recommend/resource')
    return data.recommend
}