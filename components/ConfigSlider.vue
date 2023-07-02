<template>
  <div class="conf_slider">

    <OptionShape title="Twin Tip" name="twin-tip" svg="snowboard-twin-tip-custom" />

    <OptionShape title="Directional" name="directional" svg="snowboard-directional-custom" />

  </div>
</template>

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

</style>