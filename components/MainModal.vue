<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="/icons/close-icon.svg" alt="Close Icon" />
      </div>

      <div v-show="type == 'shape'">
        <h6>Beeinflusse das Fahrverhalten deines Boards.</h6>
        <p class="modal-subtitle">Twin Tip</p>
        <p>Ein Twin Tip Snowboard hat eine perfekt symmetrische Form. Das Board fährt sich sowohl vorwärts als auch rückwärts gleich. Sie eignen sich am besten für Park, Kicker und Rails.</p>

        <p class="modal-subtitle">Directional</p>
        <p>Diese Shape ist wie der Name schon vermuten lässt zum Vorwärtsfahren gedacht. Die Bindungsposition ist nach hinten verlagert, um einen besseren Auftrieb zu erhalten. Dies ermöglicht einen besseren Auftrieb in weichem Schnee und mehr Power beim Carven.</p>

        <p class="modal-subtitle">Tapered</p>
        <p>Das Board bietet eine grosse Oberfäche im Nose-Bereich und wird zum Tail schmaler. Damit bietet es perfekten Auftrieb im Tiefschnee.</p>
      </div>

      <div v-show="type == 'profile'">
        <h6>Definiere die Kontaktpunkte mit dem Schnee.</h6>
        <p class="modal-subtitle">Camber</p>
        <p>Camber bietet einen gleichmässigen Druck von der Spitze bis zum Heck. Damit ist es gut fürs Carven geeignet.</p>

        <p class="modal-subtitle">Rocker</p>
        <p>Durch die runde Form und Kontaktpunkt in der Mitte, ergibt sich eine hohe Drehfreudigkeit und mehr Auftriebskraft.</p>

        <p class="modal-subtitle">Hybrid Camber</p>
        <p>Grip und Kraft eines Cambers und Fehlerverzeihend dank Rocker-Profil. Fühlt sich vor allem im Park zuhause.</p>

        <p class="modal-subtitle">Hybrid Rocker</p>
        <p>Der Rocker ermöglicht es leicht zu schwenken und die Vorspannung bietet guten Grip. Geeignet für die meisten Anforderungen.</p>

        <p class="modal-subtitle">Zero / Flat</p>
        <p>Mehr Kantengriff als ein Rocker und weniger aggressiv als ein Camber. Sehr beliebt im Park.</p>
      </div>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  type: String,
});

const { type } = toRefs(props)
</script>

<style scoped>


.modal-overlay {
  z-index: 900;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  /* background-color: #535353CC; */
  background-color: #00000088;
  /* background-color: #000000da; */
}

.modal {
  text-align: left;
  background-color: white;
  height: fit-content;
  width: 700px;
  margin-top: 10%;
  padding: 60px;
  border-radius: 10px;
  z-index: 900;
}
.close {
  margin-top: 3px;
  cursor: pointer;
  float: right;
}

.close-img {
  width: 25px;
}

h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 22px;
  margin: 0 0 40px 0;
  color: #00c0d0;
}

.modal-subtitle {
  margin-bottom: 0;
  margin-top: 32px;
  font-weight: 600;
}

p {
  font-size: 16px;
  margin: 5px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

@media only screen and (max-width: 1020px)  {
  .modal {
    margin-left: 10px;
    margin-right: 10px;
    padding: 40px;
    overflow-y: scroll;
  }
}

</style>