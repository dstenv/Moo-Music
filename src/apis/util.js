import axios from 'axios'
import store from '@/store'


// 请求函数
export const Myaxios = async function (url,params = {}) {
    let res = await axios.get(store.state.baseUrl + url, {
        params
    })
    // console.log(res);
    return res
}

export const format = function(time,type) {
    var year = time.getFullYear() + ''
    var mon = ((time.getMonth() + 1) + 100 + '').slice(1)
    var day = (time.getDate() + 100 + '').slice(1)
    var hour = (time.getHours() + 100 + '').slice(1)
    var min = (time.getMinutes() + 100 + '').slice(1)
    var seconds = (time.getSeconds() + 100 + '').slice(1)
    // console.log(year,mon,day,hour,min,seconds);
    type = type.replace('yyyy',year)
    type = type.replace('MM',mon)
    type = type.replace('dd',day)
    type = type.replace('hh',hour)
    type = type.replace('mm',min)
    type = type.replace('ss',seconds)
    return type
}

