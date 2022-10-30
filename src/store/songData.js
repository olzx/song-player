const data = {
    namespaced: true,
    state: {
        activeSong: {
            title: '',
            artist: '',
            id: 0,
            image: '',
            duration: 0,
            time: ''
        }
    },
    getters: {
        getActiveSong: function(state) {
            return state.activeSong
        }
    },
    mutations: {
        SET_ACTIVE_SONG: function(state, song) {
            const {title, artist, id, cover, duration, time} = song
            state.activeSong.title = title
            state.activeSong.artist = artist
            state.activeSong.id = id
            state.activeSong.image = cover
            state.activeSong.duration = duration
            state.activeSong.time = time
        }
    }
}

export default data