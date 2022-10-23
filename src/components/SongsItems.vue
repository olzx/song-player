<template>
    <div class="songs-items">
        <ul class="songs-items__table">
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
                v-on:song:click="songClick(song)"
            ></SongsItemsItem>
        </ul>
        <infinite-loading v-if="songs.length > 0" @infinite="loadNextPage"></infinite-loading>
    </div>
</template>

<script>
import SongsItemsItem from './SongsItemsItem.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    components: {
        SongsItemsItem,
        InfiniteLoading
    },
    data: function() {
        return {
            songs: [],
            page: 1
        }
    },
    methods: {
        loadNextPage: function($state) {
            this.$apiMusic.get.page(this.page++)
                .then(data => {
                    if (data.length === 0) {
                        $state.complete()
                        return
                    }
                    this.songs = this.songs.concat(data)
                    $state.loaded()
                })
        },
        songClick: function(song) {
            const indexFind = this.songs.indexOf(song)
            if(indexFind === -1) return
            this.songs[indexFind].active = !this.songs[indexFind].active
        }
    },
    mounted: function() {
        this.$apiMusic.get.page(this.page++)
            .then(data => this.songs = data)
    }
}
</script>

<style lang="scss">
.songs-items {
    margin-top: 30px;

    &__table {
        display: flex;
        flex-direction: column;
        list-style: none;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        padding: 0;
        margin: 0;
        margin-bottom: 230px;
    }

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