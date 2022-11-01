const data = {
    namespaced: true,
    state: {
        songs: [],
        activeSong: null
    },
    getters: {
        getAllSongs: function(state) {
            return state.songs
        },
        getActiveSong: function(state) {
            return state.activeSong === null ? '' : state.activeSong
        }
    },
    mutations: {
        ADD_NEW_SONGS: function(state, songs) {
            state.songs.push(...songs)
        },
        SET_ACTIVE_SONG: function(state, song) {
            if (state.activeSong === null) {
                this.commit('songsList/_TOGGLE_ACTIVE_STATUS', song)
                state.activeSong = song
            } else if (state.activeSong === song) {
                this.commit('songsList/_TOGGLE_ACTIVE_STATUS', song)
                state.activeSong = null
            } else {
                this.commit('songsList/_TOGGLE_ACTIVE_STATUS', song)
                this.commit('songsList/_TOGGLE_ACTIVE_STATUS', state.activeSong)
                state.activeSong = song
            }
        },
        _TOGGLE_ACTIVE_STATUS: function(state, song) {
            const indexFind = state.songs.indexOf(song)
            state.songs[indexFind].active = !song.active
        }
    }
}

export default data