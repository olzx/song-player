<template>
    <div v-if="activeSong.title" class="bar">
        <div class="bar__content">
            <div class="controls">
                <div v-if="isFirstSong" v-on:click="togglePrevious" class="controls__buttons">
                    <div class="icon icon_size_28 icon__previous"></div>
                </div>
                <div v-on:click="togglePlay" class="controls__buttons">
                    <div class="icon icon_size_28 icon__pause"></div>
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
    </div>
</template>

<script>
export default {
    methods: {
        togglePrevious: function() {
            this.$store.commit('songsList/SET_PREVIOUS_SONG')
        },
        togglePlay: function() {

        },
        toggleNext: function() {
            this.$store.commit('songsList/SET_NEXT_SONG')
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
</style>