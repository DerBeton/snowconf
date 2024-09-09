<template>

    <MainModal :type="modalType" v-show="showModal" @close-modal="showModal = false" />

    <div class="conf-container">

      <div class="conf-main">

        <h2>Wähle deine Spezifikationen.</h2>
        <div class="conf-section">
          <h3 class="conf-title">Form <img v-on:click="actModal('shape')" class="more-info" src="/icons/info-icon.svg" width="22" height="22" alt="Info Icon"></h3>
          <div id="conf-slider-shape" class="conf_slider">
            <OptionShape title="Twin Tip" name="twin-tip" svg="snowboard-twin-tip-custom" />
            <OptionShape title="Twin Tip 2" name="twin-tip-2" svg="snowboard-twin-tip-2-custom" />
            <OptionShape title="Directional" name="directional" svg="snowboard-directional-custom" />
            <OptionShape title="Tapered" name="tapered" svg="snowboard-tapered-custom" />
          </div>
          <div v-on:click="scrollRight('conf-slider-shape')" class="conf-slider-arrow conf-slider-arrow-shape"><img src="/icons/right-arrow.svg" alt="Right Arrow"></div>
        </div>

        <div class="conf-section">
          <h3 class="conf-title">Profil <img v-on:click="actModal('profile')" class="more-info" src="/icons/info-icon.svg" width="22" height="22" alt="Info Icon"></h3>
          <div id="conf-slider-profil" class="conf_slider">
            <OptionProfile title="Camber" name="camber" svg="snowboard-camber" />
            <OptionProfile title="Rocker" name="rocker" svg="snowboard-rocker" />
            <OptionProfile title="Hybrid Camber" name="hybrid-camber" svg="snowboard-hybrid-camber" />
            <OptionProfile title="Hybrid Rocker" name="hybrid-rocker" svg="snowboard-hybrid-rocker" />
            <OptionProfile title="Zero" name="zero" svg="snowboard-zero" />
          </div>
          <div v-on:click="scrollRight('conf-slider-profil')" class="conf-slider-arrow"><img src="/icons/right-arrow.svg" alt="Right Arrow"></div>
        </div>

        <div class="conf-section">
          <h3 class="conf-title">Top</h3>
          <div class="conf-slider">
            <ConfigTop />
          </div>
          <div v-on:click="scrollRight('conf-slider-top', 68)" class="conf-slider-arrow conf-slider-arrow-top"><img src="/icons/right-arrow.svg" alt="Right Arrow"></div>
        </div>

        <div class="conf-section">
          <h3 class="conf-title">Base</h3>
          <div class="conf-slider">
            <ConfigBase />
          </div>
          <div v-on:click="scrollRight('conf-slider-base', 68)" class="conf-slider-arrow conf-slider-arrow-base"><img src="/icons/right-arrow.svg" alt="Right Arrow"></div>
        </div>

      </div>

      <div class="conf-nav">
        <!-- <button v-on:click="gotoPage('/start/')" class="btn btn-prev">Zurück</button> -->
        <button v-on:click="gotoPage('/share/')" class="btn btn-next">Weiter</button>
      </div>

    </div>

</template>

<script setup>
import {useBaseStore, useModelStore, useTextureStore, useConfigStore} from "~/stores/main";

const { updateConfig, selectionUrl, isValid } = useSelection();

const storeModel = useModelStore();
const storeBase = useBaseStore();
const storeTexture = useTextureStore();
const storeConfig = useConfigStore();

const showModal = ref(false); // show or hide modal
const modalType = ref();

const router = useRouter();
const route = useRoute();

storeModel.$subscribe((mutation, state) => {
  if(selectionUrl() != route.hash && isValid(selectionUrl())) {
      router.replace({ hash: selectionUrl() }); // push new config to url
      storeConfig.update(selectionUrl());
  } else {
    console.log('novalid:', route.hash);
  }
});

storeBase.$subscribe((mutation, state) => {
  if(selectionUrl() != route.hash && isValid(selectionUrl())) {
    router.replace({ hash: selectionUrl() }); // push new config to url
    storeConfig.update(selectionUrl());
  } else {
    console.log('novalid:', route.hash);
  }
});

storeTexture.$subscribe((mutation, state) => {
  if(selectionUrl() != route.hash && isValid(selectionUrl())) {
    router.replace({ hash: selectionUrl() }); // push new config to url
    storeConfig.update(selectionUrl());
  } else {
    console.log('novalid:', route.hash);
  }
});

function scrollRight(target, amount = 305) {
  let el = document.getElementById(target);
  el.style.scrollBehavior = 'smooth';
  el.scrollLeft += amount;
}
function actModal(type) {
  modalType.value = type;
  showModal.value = true;
}
async function gotoPage(page) {
  // router.push([page] + route.hash);
  await navigateTo(page + route.hash);
}

</script>

<style lang="scss" scoped>
$grey-border: #707070;

.conf-container {
  width: 750px;
  max-width: 100%;
  background-color: white;
  padding: 50px 60px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 0;
}

.conf-nav {
  margin-top: auto;
  align-self: flex-end;
}

.conf-section {
  border-bottom: 1px solid $grey-border;
  position: relative;
}

.conf_slider {
  margin-bottom: 15px;
  margin-right: 35px;
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

.conf-slider-arrow {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 71px;
}

.conf-slider-arrow-shape {
  top: 87px;
}

.conf-slider-arrow-base, .conf-slider-arrow-top  {
  display: none;
  top: 74px;
}

.conf-title {
  margin-top: 18px;
  position: relative;
}

.more-info {
  position: absolute;
  margin-left: 5px;
  top: 4px;
  cursor: pointer;
}

/* make little bit responsive */
@media only screen and (max-width: 1020px)  {
  .conf-container {
    padding: 30px 20px;
    height: fit-content;
    /* height: 100%; */
  }

  .conf-nav {
    margin-top: 30px;
  }

  .conf-slider-arrow-base, .conf-slider-arrow-top  {
    display: block;
  }

}

</style>