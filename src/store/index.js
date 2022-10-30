import Vue from 'vue'
import Vuex from 'vuex'
import songData from './songData'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        songData
    }
})

export default store