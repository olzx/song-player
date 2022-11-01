import Vue from 'vue'
import Vuex from 'vuex'
import songData from './songData'
import songsList from './songsList'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        songData,
        songsList
    }
})

export default store