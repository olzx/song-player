import Vue from 'vue'
import Vuex from 'vuex'
import songsList from './songsList'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        songsList
    }
})

export default store