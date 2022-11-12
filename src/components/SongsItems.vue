<template>
    <div class="songs-items">
        <!-- Доделать поиск в следующей жизни
            <SongsInput v-on:input:search="searchInput"></SongsInput> 
        -->
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
                v-for="song in getSongs"
                v-bind:key="song.id"
                v-bind:song="song"
                v-on:song:click="songClick(song)"
            ></SongsItemsItem>
        </ul>
        <infinite-loading @infinite="loadNextPage"></infinite-loading>
    </div>
</template>

<script>
import SongsItemsItem from './SongsItemsItem.vue'
import InfiniteLoading from 'vue-infinite-loading'
import SongsInput from './SongsInput.vue'

export default {
    components: {
        SongsItemsItem,
        InfiniteLoading,
        SongsInput
    },
    data: function() {
        return {
            page: 1,
            isSearch: false,
            searchText: ''
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
                    this.$store.commit('songsList/ADD_NEW_SONGS', data)
                    $state.loaded()
                })
        },
        songClick: function(song) {
            this.$store.commit('songsList/SET_ACTIVE_SONG', song)
        },
        // Доделать поиск в следующей жизни
        // searchInput: function(searchText) {
        //     if (this.isSearch === false) {
        //         this.isSearch = true
        //         // search start
        //         this.$store.commit('songsList/CLEAR_ALL_SONGS')
        //     }
        //     if (this.isSearch === true) {
        //         if (searchText.length === 0) {
        //             this.isSearch = false
        //             // search end
        //             this.$store.commit('songsList/CLEAR_ALL_SONGS')
        //         }
        //     }
        //     this.searchText = searchText
        // }
    },
    computed: {
        getSongs: function() {
            return this.$store.getters['songsList/getAllSongs']
        }
    }
}
</script>

<style lang="scss">
.songs-items {
    width: 727px;
    margin: 0 auto;
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
        margin-top: 30px;
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