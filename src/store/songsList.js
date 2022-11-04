const data = {
    namespaced: true,
    state: {
        songs: [],
        activeSong: null,
        isFirstOrLast: {
            isFirst: false,
            isLast: false
        }
    },
    getters: {
        getAllSongs: function(state) {
            return state.songs
        },
        getActiveSong: function(state) {
            return state.activeSong === null ? '' : state.activeSong
        },
        getFirstOrLast: function(state) {
            return state.isFirstOrLast
        }
    },
    mutations: {
        ADD_NEW_SONGS: function(state, songs) {
            state.songs.push(...songs)
            this.commit('songsList/_TOGGLE_FIRST_OR_LAST_STATUS')
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
            this.commit('songsList/_TOGGLE_FIRST_OR_LAST_STATUS')
        },
        SET_PREVIOUS_SONG: function(state) {
            if (state.activeSong === null) return

            const currentIndex = state.songs.indexOf(state.activeSong)
            const previousIndex = currentIndex-1
            if (previousIndex < 0) return
            const previousSong = state.songs[previousIndex]
            this.commit('songsList/SET_ACTIVE_SONG', previousSong)
        },
        SET_NEXT_SONG: function(state) {
            if (state.activeSong === null) return

            const currentIndex = state.songs.indexOf(state.activeSong)
            const nextIndex = currentIndex+1
            if (nextIndex >= state.songs.length) return
            const nextSong = state.songs[nextIndex]
            this.commit('songsList/SET_ACTIVE_SONG', nextSong)
        },
        _TOGGLE_ACTIVE_STATUS: function(state, song) {
            const indexFind = state.songs.indexOf(song)
            state.songs[indexFind].active = !song.active
        },
        _TOGGLE_FIRST_OR_LAST_STATUS: function(state) {
            const currentIndex = state.songs.indexOf(state.activeSong)
            if (currentIndex === 0) {
                state.isFirstOrLast.isFirst = true
            } else {
                state.isFirstOrLast.isFirst = false
            }

            if (currentIndex === state.songs.length-1) {
                state.isFirstOrLast.isLast = true
            } else {
                state.isFirstOrLast.isLast = false
            }
        }
    }
}

export default data