<template>

    <div class="conf-container">

      <div class="conf-main">

        <h2>Speichere deine Konfiguration.</h2>
        <!-- <p class="p-lead"></p> -->

        <h3>Teilen</h3>
        <p>Sende deine persönliche Konfiguration an deine Freunde.</p>
        <ClientOnly>
          <div class="share-container">

            <!-- <a target="_blank" :href="whatsappLink" class="share-link">{{ whatsappLink }}</a> -->

            <a class="share-icon-link" target="_blank" :href="whatsappLink">
              <svg class="share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>

            <a class="share-icon-link" target="_blank" :href="twitterLink">
              <svg class="share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>

            <a class="share-icon-link" target="_blank" :href="linkedInLink">
              <svg class="share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>

          </div>
        </ClientOnly>


        <h3>Konfigurations Code</h3>
        <p>Mit diesem Code kannst du deine Konfiguration speichern und später weitermachen.</p>
        <span class="config-code">#{{ storeConfig.config }}</span>

        <h3>Weitere Informationen</h3>
        <p>Wenn du Fragen zu diesem Projekt hast, kannst du mir einfach eine Mail
          an <a href="mailto:info@ramonscraft.ch">info@ramonscraft.ch</a>  schreiben.</p>


      </div>

      <div class="conf-nav">

        <button v-on:click="gotoPage('/config/')" class="btn btn-prev">Zurück</button>

      </div>

    </div>

</template>

<script setup>
import { useConfigStore } from "~/stores/main";
const route = useRoute();

const router = useRouter();
const storeConfig = useConfigStore();

function gotoPage(page) {
  router.push(page + route.hash);
}

// https://api.whatsapp.com/send?text=Schau+dir+mein+selbst+generiertes+Snowboad+in+3D+an:+https://snowconf.vercel.app/start
const whatsappLink = computed(() => {
  let path = 'https://' + window.location.host + '/start/#' + storeConfig.config;
  let msg = 'Schau+dir+mein+selbst+generiertes+Snowboad+in+3D+an:';
  return 'https://api.whatsapp.com/send?text=' + msg + '+' + path;
});

// https://twitter.com/intent/tweet?text=DEIN+NACHRICHTENTEXT+HIER
const twitterLink = computed(() => {
  let path = 'https://' + window.location.host + '/start/#' + storeConfig.config;
  let msg = 'Schau+dir+mein+selbst+generiertes+Snowboad+in+3D+an:';
  return 'https://twitter.com/intent/tweet?text=' + msg + '+' + path;
});

const linkedInLink = computed(() => {
  let path = 'https://' + window.location.host + '/start/#' + storeConfig.config;
  // let path = 'https://' + window.location.host + '/start/';
  return 'https://www.linkedin.com/sharing/share-offsite/?url=' + path;
});

const shareLink = computed(() => {
  let path = window.location.host + '/config/#' + storeConfig.config;
  return 'http://' + path;
})



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

.conf-nav {
  margin-top: auto;
  align-self: flex-start;
}

.share-container {
  display: flex;
  flex-shrink: 0;
}

.share-icon-link {
  cursor: pointer;
  margin-right: 12px;
}

.share-icon {
  transition: all .3s ease-in-out;
}

.share-icon:hover {
  fill: #00c0d0;
}

.config-code {
  font-size: 22px;
  font-weight: 500;
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