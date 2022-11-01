<template>
    <div v-if="activeSong.title" class="bar">
        <div class="bar__content">
            <div class="song">
                <div class="song__image">
                    <img v-bind:src="activeSong.image" alt="">
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
    computed: {
        activeSong: function() {
            console.log(this.$store)
            return this.$store.getters['songData/getActiveSong']
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
        justify-content: space-between;
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
</style>