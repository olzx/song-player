import apiMusic from '../API/music/index'

export default {
    install(Vue) {
        Vue.prototype.$apiMusic = apiMusic
    }
}