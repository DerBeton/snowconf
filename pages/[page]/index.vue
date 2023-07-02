<template>
  <div>

    <div id="main-container">

      <ClientOnly>
        <ModelView ref="threejs-container" class="threejs-container" />
      </ClientOnly>

      <ConfigStart ref="test" v-if="page == 'start'" />

      <ConfigMain ref="configstart-container" v-if="page == 'config'" />

      <ConfigEnd ref="configend-container" v-if="page == 'share'" />

    </div>

  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useConfigStore } from "~/stores/main";
import { updateConfig, selectionUrl, getSelection } from '/init/selection';

useHead({
  title: 'SnowConf',
  meta: [
    { name: 'description', content: 'Interaktiver 3D Snowboard Konfigurator im Web.' },
    { name: 'og:description', content: 'Interaktiver 3D Snowboard Konfigurator im Web.' },
    { name: 'title', content: 'Schau dir mein selbst generiertes Snowboard in 3D an!' },
    { name: 'og:title', content: 'Schau dir mein selbst generiertes Snowboard in 3D an!' }
  ]
})


const { page } = useRoute().params;
const route = useRoute();
const router = useRouter();
const storeConfig = useConfigStore();

// with this a update could be triggered if someone changes the url
watch(() => route.hash, (newHash, oldHash) => { });

onMounted(() => {
  if(storeConfig.config !== '') {
    return;
  } else if(route.hash != '') {
    updateConfig(route.hash);
  } else {
    updateConfig(null)
  }
})

</script>

<style lang="scss" scoped>

#main-container {
  height: 100vh;
  display: flex;
  overflow-y: hidden;
}

.threejs-container {
  background-color: #D9D9D9;
}

/* make little bit responsive */
@media only screen and (max-width: 1020px)  {
  #main-container {
    flex-direction: column;
    overflow-y: visible;
  }
}


</style>