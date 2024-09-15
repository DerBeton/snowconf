<template>
    <div v-bind:class="{ active: storeModel.shape === name }" v-on:click="changeShape(name)" class="shape_option">
      <img :src="svgPath" :alt="title">
      <span class="shape_description">{{ title }}</span>
    </div>
</template>

<script setup>
import {useModelStore, useConfigStore} from "@/stores/main.js";

const storeModel = useModelStore();
const storeConfig = useConfigStore();

const props = defineProps({
  title: String,
  name: String,
  svg: String,
});

const { title, name, svg } = toRefs(props)

const svgPath = computed(() => {
  return '/config/shape/' + svg.value + '.svg';
})

function changeShape(shape) {
  storeModel.changeShape(shape);
  storeConfig.rotateY(0);
}


</script>

<style lang="scss" scoped>

.conf_slider {
  margin-bottom: 15px;
  column-gap: 8px;
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}

.conf_slider::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.shape_option {
  flex-shrink: 0;
  padding: 10px 12px;
  display: flex;
  width: 270px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #F8F8F8;
    border-radius: 10px;
    cursor: pointer;
  }

  &.active .shape_description {
    font-weight: 600;
  }

}

</style>