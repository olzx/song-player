<template>
    <div v-if="activeSong.title" class="bar">
        <div class="bar__content">
            <div class="bar__left">
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
            </div>
            <div class="bar__right">
                <div class="range-slider">
                    <vue-slider v-model="songVolume" tooltip="none" v-on:change="volumeChange"></vue-slider>
                </div>
            </div>
            <div 
                v-on:click="progressClick" 
                v-on:mousemove="progressHover" 
                v-on:mouseenter="progressEnter"
                v-on:mouseleave="progressLeave"
                class="progress" 
                ref="progress"
                >
                <div class="progress__time">
                    <div class="progress__left">{{ currentTime }}</div>
                    <div class="progress__right">{{ activeSong.time }}</div>
                </div>
                <div v-bind:style="{'width': currentPercents + '%'}" class="progress__bar"></div>
                <div v-if="progressIsHover" v-bind:style="{'left': progressMouseX + 'px'}" class="progress__tooltip">
                    {{ progressHoverTime }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import '../assets/style/vue-slider-component/custom.css'

export default {
    components: {
        VueSlider
    },
    data: function() {
        return {
            songActive: null,
            isPause: false,
            songVolume: 20,
            songCurrentPercents: 0,
            songCurrentTime: '0',
            progressMouseX: 0,
            progressIsHover: false,
            progressHoverTime: '00:00'
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
            this.setCurrentPercentsAndTime()

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
            this.songActive.volume = this.songVolume/100
            this.songActive.play()
        },
        volumeChange: function(rangeValue) {
            if (this.songActive === null) return
            this.songActive.volume = rangeValue/100
        },
        getCurrentPercents: function() {
            if (this.songActive === null) {
                return 0
            } else {
                if (isNaN(this.songActive.duration)) {
                    return 0
                } else {
                    return (this.songActive.currentTime / this.songActive.duration) * 100
                }
            }
        },
        setCurrentPercentsAndTime: function() {
            this.songCurrentPercents = this.getCurrentPercents()
            this.songCurrentTime = this.songActive?.currentTime ? this.songActive.currentTime : 0

            setTimeout(() => {
                if (this.songActive === null) return
                this.setCurrentPercentsAndTime()
            }, 100)
        },
        progressClick: function(data) {
            if (this.songActive === null || this.songCurrentPercents === 0) {
                return
            } else {
                const currentTime = ( (data.clientX - this.$refs.progress.getBoundingClientRect().left) / this.$refs.progress.offsetWidth ) * this.songActive.duration
                this.songActive.currentTime = currentTime
            }
        },
        convertCurrentTimeInNormal:  function(currentTime) {
            const m = Math.floor(currentTime % 3600 / 60).toString().padStart(2,'0')
            const s = Math.floor(currentTime % 60).toString().padStart(2,'0')
            return m + ':' + s
        },
        progressHover: function(data) {
            this.progressMouseX = data.layerX-55/2
            if (this.songActive === null) return
            if (isNaN(this.songActive.duration) === false) {
                const currentTime = ( (data.clientX - this.$refs.progress.getBoundingClientRect().left) / this.$refs.progress.offsetWidth ) * this.songActive.duration
                this.progressHoverTime = this.convertCurrentTimeInNormal(currentTime)
            }
        },
        progressEnter: function() {
            if (this.songActive === null) return
            this.progressIsHover = true
        },
        progressLeave: function() {
            if (this.songActive === null) return
            this.progressIsHover = false
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
        },
        currentPercents: function() {
            return this.songCurrentPercents
        },
        currentTime: function() {
            return this.convertCurrentTimeInNormal(this.songCurrentTime)
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        max-width: 727px;
        height: 100%;
        background-color: rgba(228, 228, 228, 0.95);
        margin: 0 auto;
        padding: 0 30px;
    }

    &__left {
        display: flex;
        flex-direction: row;
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

.progress {
    position: absolute;
    height: 12px;
    width: 100%;
    top: -12px;
    left: 0px;
    background-color: rgb(107,107,107);
    cursor: pointer;

    &__bar {
        height: 100%;
        width: 10%;
        background-color: rgb(255,219,77);
    }

    &__time {
        position: absolute;
        top: -1px;
        font-size: 12px;
        color: rgb(0, 0, 0);
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    &__left {
        margin-left: 10px;
    }

    &__right {
        margin-right: 10px;
    }

    &__tooltip {
        position: absolute;
        top: -45px;
        left: 5px;
        padding: 7px 10px;
        border-radius: 3px;
        color: #f4f4f4;
        background-color: #222;
        border: 1px solid rgb(105, 105, 105);
        box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.4);

        &:before {
            content: '';
            position: absolute;
            
            margin: 0 0 -8px -8px;
            border-bottom: none;
            border-top-color: #222;
            border-top-width: 8px;
            border-top-style: solid;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: 0px;
            left: 27px
        }
    }
}
</style>