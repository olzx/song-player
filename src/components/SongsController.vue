<template>
    <div class="bar">
        <div class="bar__content">

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;

    &__content {
        width: 100%;
        max-width: 1000px;
        height: 100%;
        background-color: rgba(24,24,24,.95);
        margin: 0 auto;
    }
}
</style>