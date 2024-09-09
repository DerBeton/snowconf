<template>
  <div id="main-container">
    <ClientOnly>
        <KeepAlive>
          <ModelView key="1" ref="threejs-container" class="threejs-container" />
        </KeepAlive>
      </ClientOnly>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

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