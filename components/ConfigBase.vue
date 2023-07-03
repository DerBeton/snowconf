<template>
  <div id="conf-slider-base" class="conf_slider">

    <div v-bind:class="{ active: storeBase.color == '#000000'}" v-on:click="changeBase('#000000')" class="top_option">
      <div style="background-color: #000000" class="base-color"></div>
    </div>

    <div v-bind:class="{ active: storeBase.color == '#16262E'}" v-on:click="changeBase('#16262E')" class="top_option">
      <div style="background-color: #16262E" class="base-color"></div>
    </div>

    <div v-bind:class="{ active: storeBase.color == '#A34329'}" v-on:click="changeBase('#A34329')" class="top_option">
      <div style="background-color: #A34329" class="base-color"></div>
    </div>

    <div v-bind:class="{ active: storeBase.color == '#FF0000'}" v-on:click="changeBase('#FF0000')" class="top_option">
      <div style="background-color: #FF0000" class="base-color"></div>
    </div>

    <div v-bind:class="{ active: storeBase.color == '#F3A712'}" v-on:click="changeBase('#F3A712')" class="top_option">
      <div style="background-color: #F3A712" class="base-color"></div>
    </div>

    <div v-bind:class="{ active: storeBase.color == '#28AFB0'}" v-on:click="changeBase('#28AFB0')" class="top_option">
      <div style="background-color: #28AFB0" class="base-color"></div>
    </div>

    <div v-bind:class="{ active: storeBase.color == '#DFDFDF'}" v-on:click="changeBase('#DFDFDF')" class="top_option">
      <div style="background-color: #DFDFDF" class="base-color"></div>
    </div>

  </div>
</template>

<script setup>
import {useBaseStore, useModelStore, useTextureStore} from "@/stores/main.js";

const storeBase = useBaseStore();
function changeBase(color) {
  storeBase.changeColor(color)
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

.base-color {
  width: 56px;
  height: 56px;
  background-color: lightblue;
  border-radius: 100%;
}

.base-color:hover, .top_option.active .base-color  {
  outline: 3px solid #00c0d0;
  outline-offset: 2px;
  cursor: pointer;
}

</style>