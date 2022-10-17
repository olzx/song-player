<template>
    <div class="songs-items__song">
        <div class="songs-items__wrapper">
            <div class="songs-items__image">
                <img v-bind:src="song.img" alt="img">
                <div class="songs-items__play-button">
                    <span class="songs-items__play icon-play3"></span>
                </div>
            </div>
            <div class="songs-items__title">
                <div class="songs-items__name">{{ song.name }}</div>
                <div class="songs-items__artist">{{ song.artist }}</div>
            </div>
        </div>
        <div class="songs-items__right">
            <span>{{ song.id }}</span>
            <span>{{ song.duration }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        song: {
            type: Object,
            require: true
        }
    }
}
</script>

<style lang="scss">
.songs-items {
    &__song {
        font-size: 16px;
        color: #111;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        transition: background-color .2s linear;

        &:hover {
            background-color: #f1f1f1
        }
    }

    &__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    &__play {
        display: none;
    }

    &__image {
        position: relative;
        img {
            width: 52px;
        }
    }

    &__title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }

    &__name {
        margin-bottom: 5px;
    }

    &__artist {
        color: #686868;
    }
}
</style>