<template>
    <div id="app">
        <SongsItems></SongsItems>
    </div>
</template>

<script>
import SongsItems from './components/SongsItems.vue'

export default {
    data: function() {
        return {
            data: 'Hello World'
        }
    },
    components: {
        SongsItems
    }
}
</script>

<style>
@import url('./assets/buttons/buttons.css');
@font-face {
    font-family: 'DinDisplayProLight';
    src: url('./assets/fonts/PFDinDisplayPro\ Light.ttf');
}
body {
    font-family: DinDisplayProLight;
    -webkit-user-select: none;
    margin: 0;
}

#app {
    margin: 0 auto;
}
</style>
