<template>
    <label class="search">
        <input class="search__input" type="search" placeholder="Поиск треков...">
    </label>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.search {
    position: relative;

    &:before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        background-image: url('../assets/icons/search.svg');
        background-repeat: no-repeat;
        top: 2px;
        right: 20px;
    }

    &__input {
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        color: #111;
        width: 100%;
        height: 60px;
        font-size: 18px;
        padding: 0 40px 0 20px;
        font-family: DinDisplayProLight;
        transition: border-color .2s linear;

        &:hover {
            cursor: text;
            border-color: #111;
        }
    }
}
</style>