<template>
    <div v-if="activeSong.title" class="bar">
        <div class="bar__content">
            <div class="controls">
                <div v-if="isFirstSong" v-on:click="togglePrevious" class="controls__buttons">
                    <div class="icon icon_size_28 icon__previous"></div>
                </div>
                <div v-on:click="togglePlay" class="controls__buttons">
                    <div v-bind:class="['icon', 'icon_size_28', togglePauseIcon()]"></div>
                </div>
                <div v-if="isLastSong" v-on:click="toggleNext" class="controls__buttons">
                    <div class="icon icon_size_28 icon__next"></div>
                </div>
            </div>
            <div class="song">
                <div class="song__image">
                    <img v-bind:src="activeSong.cover" alt="">
                </div>
                <div class="song__info">
                    <div class="song__title">{{ activeSong.title }}</div>
                    <div class="song__artist">{{ activeSong.artist }}</div>
                </div>
            </div>
            <div class="range-slider">
                <vue-slider v-model="songVolume" tooltip="none"></vue-slider>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    components: {
        VueSlider
    },
    data: function() {
        return {
            songActive: null,
            isPause: false,
            songVolume: 0
        }
    },
    methods: {
        togglePrevious: function() {
            this.$store.commit('songsList/SET_PREVIOUS_SONG')
        },
        togglePlay: function() {
            if (this.songActive === null) return
            if (this.isPause === true) {
                this.songActive.play()
                this.isPause = false
            } else {
                this.songActive.pause()
                this.isPause = true
            }
        },
        toggleNext: function() {
            this.$store.commit('songsList/SET_NEXT_SONG')
        },
        togglePauseIcon: function() {
            return (this.isPause ? 'icon__pause' : 'icon__play')
        },
        playSong: function(song) {
            this.isPause = false

            if (song === null) {
                if (this.songActive !== null) {
                    this.songActive.pause()
                    this.songActive = null
                    return
                }
            }

            const songUrl = this.$apiMusic.get.music(song.id)
            if (this.songActive === null) {
                this.songActive = new Audio(songUrl)
            } else {
                this.songActive.pause()
                this.songActive = new Audio(songUrl)
            }
            this.songActive.volume = 0.1
            this.songActive.play()
        }
    },
    computed: {
        activeSong: function() {
            return this.$store.getters['songsList/getActiveSong']
        },
        isFirstSong: function() {
            return !this.$store.getters['songsList/getFirstOrLast'].isFirst
        },
        isLastSong: function() {
            return !this.$store.getters['songsList/getFirstOrLast'].isLast
        }
    },
    watch: {
        "$store.state.songsList.activeSong": function(newData) {
            this.playSong(newData)
        }
    }
}
</script>

<style lang="scss">
.bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;

    &__content {
        display: flex;
        justify-content: start;
        align-items: center;
        box-sizing: border-box;
        max-width: 727px;
        height: 100%;
        background-color: rgba(228, 228, 228, 0.95);
        margin: 0 auto;
        padding: 0 30px;
    }
}

.song {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    &__image {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 52px;
            position: relative;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }

    &__title {
        margin-bottom: 5px;
    }

    &__artist {
        color: #686868;
    }
}

.controls {
    display: flex;
    margin-right: 10px;

    &__buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 40px;
        cursor: pointer;

        &:not(:first-child) {
            margin-left: 6px;
        }

        &:hover {
            opacity: .50;
        }
    }
}

.range-slider {
    position: relative;
    height: 20px;
    width: 100px;

    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 50%;
        height: 7px;
        width: 2px;
        background: #CCCCCC;
    }

    &:after {
        content: "";
        display: block;
        position: absolute;
        left: 50%;
        bottom: 2px;
        height: 7px;
        width: 2px;
        background: #CCCCCC;
    }
}
</style>