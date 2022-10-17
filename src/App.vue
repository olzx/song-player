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
@import './assets/icomoon/style.css';
@font-face {
    font-family: 'DinDisplayProLight';
    src: url('./assets/PFDinDisplayPro\ Light.ttf');
}
body {
    font-family: DinDisplayProLight;
    -webkit-user-select: none;
}

#app {
    width: 727px;
    margin: 0 auto;
}
</style>
