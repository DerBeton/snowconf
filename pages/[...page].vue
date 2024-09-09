<template>
  <component :is="configScreens[page[0]]" />
</template>

<script setup>
import { watch, ref } from 'vue';
import { useConfigStore } from "~/stores/main";
import ConfigStart from "~/components/ConfigStart.vue";
import ConfigMain from "~/components/ConfigMain.vue";
import ConfigEnd from "~/components/ConfigEnd.vue";

const { updateConfig, isValid } = useSelection()

const configScreens = {
  'start': ConfigStart,
  'config': ConfigMain,
  'share': ConfigEnd
}

const { page } = useRoute().params;
const route = useRoute();
const router = useRouter();
const storeConfig = useConfigStore();

useHead({
  title: 'SnowConf',
  meta: [
    { name: 'og:title', content: 'Schau dir mein selbst generiertes Snowboard in 3D an!' },
    { name: 'description', content: 'Interaktiver 3D Snowboard Konfigurator im Web.' },
    { name: 'og:description', content: 'Interaktiver 3D Snowboard Konfigurator im Web.' },
    { name: 'title', content: 'Schau dir mein selbst generiertes Snowboard in 3D an!' },
    { name: 'url', content: 'https://' + 'snowconf.vercel.app' + '/start?code=' + storeConfig.config },
    { name: 'og:url', content: 'https://' + 'snowconf.vercel.app' + '/start?code=' + storeConfig.config },
  ]
});

// with this a update could be triggered if someone changes the url
watch(() => route.hash, (newHash, oldHash) => { });

onMounted(() => {
  if(storeConfig.config !== '') {
    return;
  } else if(route.hash != '' && isValid(route.hash)) {
    updateConfig(route.hash);
  } else if(route.query.code != '' && isValid(route.query.code)) {
    updateConfig(route.query.code);
  } else {
    updateConfig(null)
  }
})

</script>