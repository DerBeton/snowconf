<template>
  <div id="conf-slider-top" class="conf_slider">

    <div v-bind:class="{ active: storeTexture.name === 'tex_low-poly' }" v-on:click="changeTexture('tex_low-poly')" class="top_option">
      <img src="/config/top/top-6.png" alt="Snowboard Top 6">
    </div>

    <div v-bind:class="{ active: storeTexture.name === 'tex_dark-moody-forest' }" v-on:click="changeTexture('tex_dark-moody-forest')" class="top_option">
      <img src="/config/top/top-3.png" alt="Snowboard Top 3">
    </div>

    <div v-bind:class="{ active: storeTexture.name === 'tex_mountain_clouds' }" v-on:click="changeTexture('tex_mountain_clouds')" class="top_option">
      <img src="/config/top/top-4.png" alt="Snowboard Top 4">
    </div>

    <div v-bind:class="{ active: storeTexture.name === 'tex_blue-lines' }" v-on:click="changeTexture('tex_blue-lines')" class="top_option">
      <img src="/config/top/top-5.png" alt="Snowboard Top 5">
    </div>

    <div v-bind:class="{ active: storeTexture.name === 'tex_fireball' }" v-on:click="changeTexture('tex_fireball')" class="top_option">
      <img src="/config/top/top-7.png" alt="Snowboard Top 7">
    </div>

    <div v-bind:class="{ active: storeTexture.name === 'tex_fingerprint' }" v-on:click="changeTexture('tex_fingerprint')" class="top_option">
      <img src="/config/top/top-8.png" alt="Snowboard Top 8">
    </div>

    <div v-bind:class="{ active: storeTexture.name === 'tex_fantasy-landscape' }" v-on:click="changeTexture('tex_fantasy-landscape')" class="top_option">
      <img src="/config/top/top-9.png" alt="Snowboard Top 9">
    </div>


  </div>
</template>

<script setup>
import {useModelStore, useTextureStore} from "@/stores/main.js";

const storeTexture = useTextureStore();

function changeTexture(texture) {
  storeTexture.changeTexture(texture)
}

</script>

<style lang="scss" scoped>

.conf_slider {
  padding-left: 14px;
  column-gap: 16px !important;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}

.conf_slider::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.top_option {
  flex-shrink: 0;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top_option img {
  width: 56px;
  height: auto;
}

.top_option img:hover, .top_option.active img {
  border-radius: 100%;
  outline: 3px solid #00c0d0;
  outline-offset: 2px;
  cursor: pointer;
}

</style>