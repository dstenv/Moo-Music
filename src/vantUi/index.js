import { Tabbar, TabbarItem, Icon, Popup, Lazyload, Slider, Toast,Tab, Tabs,Skeleton,Swipe, SwipeItem,Loading  } from 'vant';


const vantUis = [
    Tabbar, TabbarItem, Icon, Popup, Lazyload, Slider, Toast,Tab, Tabs,Skeleton,Swipe, SwipeItem,Loading 
]

export default {
    install(Vue) {
        vantUis.forEach( component => {
            Vue.use(component)
        })
    }
}