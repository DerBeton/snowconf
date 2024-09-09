<template>

    <div class="conf-container">

      <div class="conf-main">

        <h2>Konfiguriere dein persönliches Snowboard.</h2>
        <p class="p-lead">Du wolltest schon immer ein Snowboard haben, dass sich von der Masse abhebt? Dann bist du hier genau richtig! Erstelle dein eigenes Board ganz nach deinen Vorlieben und erhalte eine interaktive 3D-Vorschau in Echtzeit.</p>

        <h3>Konfigurations Code</h3>
        <p>Wenn du bereits eine Konfiguration gestartet hast, kannst du hier deinen Code eingeben und weitermachen wo du aufgehört hast.</p>

        <input :class="{ 'conf-invalid': confInvalid }" v-model="confCode" placeholder="Dein Code" class="conf-code-input" type="text">

      </div>

      <div class="conf-nav">

        <button v-on:click="gotoConf()" class="btn btn-next">Starten</button>

      </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';
const router = useRouter();
import {useConfigStore} from "~/stores/main";

const { updateConfig, selectionUrl, isValid } = useSelection();

const confCode = ref('');
const storeConfig = useConfigStore();
const confInvalid = ref(false);

// goto Configuration [page] and load code if given
function gotoConf() {

  if(confCode.value.length > 0) {
    if(isValid(confCode.value)) {
      updateConfig(confCode.value);
      router.push('/config/' + selectionUrl());
    } else {
      confInvalid.value = true;
    }
  } else {
    router.push('/config/');
  }

}

</script>

<style lang="scss" scoped>

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

.conf-code-input {
  font-family: 'Manrope', sans-serif;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid gray;
  font-weight: lighter;
  font-size: 18px;
  outline: none;
  padding-bottom: 4px;
}

.conf-code-input::placeholder {
  font-weight: lighter;
}

.conf-invalid {
  border-bottom: solid 1px red !important;
  color: red;
}

.conf-nav {
  margin-top: auto;
  align-self: flex-end;
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

}

</style>