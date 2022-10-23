<template>
    <ul class="songs-items">
        <li class="songs-items__head">
            <div class="songs-items__lef">
                <span>Название</span>
            </div>
            <div class="songs-items__right">
                <span>ID</span>
                <span>Время</span>
            </div>
        </li>
        <SongsItemsItem
            v-for="song in songs"
            v-bind:key="song.id"
            v-bind:song="song"
        ></SongsItemsItem>
    </ul>
</template>

<script>
import SongsItemsItem from './SongsItemsItem.vue'

export default {
    components: {
        SongsItemsItem
    },
    data: function() {
        return {
            songs: []
        }
    },
    mounted: function() {
        this.$apiMusic.get.page(1)
            .then(data => this.songs = data)
    }
}
</script>

<style lang="scss">
.songs-items {
    display: flex;
    flex-direction: column;
    list-style: none;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 0;

    &__head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 18px 30px 16px;
        color: #686868;
        font-size: 14px;
    }

    &__right {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-width: 217px;
        justify-content: space-between;
    }
}
</style>