<template>
  <div ref="experience_container" class="experience-container">
    <canvas v-on:click="changeModel" id="canvas" ref="experience" />
  </div>
</template>

<script setup>
import {
  Scene,
  PerspectiveCamera,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  WebGLRenderer,
  Fog,
  Color,
  AmbientLight, TextureLoader, MeshStandardMaterial
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/addons/controls/OrbitControls";
import {useBaseStore, useModelStore, useTextureStore} from '@/stores/main.js';

const storeModel = useModelStore();
const storeTexture = useTextureStore();
const storeBase = useBaseStore();

const experience_container = ref(null);
const experience = ref(null);
let renderer;
let controls;
let width = window.innerWidth - 750;
let height = window.innerHeight - 750;

window.addEventListener( 'resize', updateSize, false );

const bgColor = new Color('#D9D9D9'); // #F8F8F8
const scene = new Scene();
// scene.fog = new Fog(bgColor, 0.1, 75);
scene.background = bgColor;
// const camera = new PerspectiveCamera(75, (window.innerWidth - 750) / window.innerHeight, 0.1, 1000);
const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
// camera.position.set(1, 1, 2);
camera.position.set(0, 0, 8);

scene.add(camera);

const ambientLight = new AmbientLight(0xffffff, 0.8);

scene.add(ambientLight);

const gltfLoader = new GLTFLoader();

let currentModell = null;

// load new model with texture from init
function loadModel(path, mat = storeTexture.material, base = storeBase.material) {

  gltfLoader.load(path, (gltf) => {
    if(currentModell) {
      scene.remove(currentModell);
    }
    currentModell = gltf.scene;

    currentModell.children[0].rotation.set(Math.PI / 2, Math.PI / 2, 0)
    currentModell.children[0].scale.set(6, 6, 6);

    // change material of top (name given in C4D)
    currentModell.getObjectByName('board-top').material = mat;

    // change color of base
    currentModell.getObjectByName('board-base').material = base;

    scene.add( currentModell );
    // saveCanvas();
    getCanvasImage();

  }, undefined, (error) => {
    console.error(error);
  });
}

loadModel(storeModel.path);

function updateRenderer() {
  renderer.setSize(width, height);
  renderer.render(scene, camera);
}

function updateScene() {
  renderer.renderer(scene, camera);
}

function updateSize() {
  camera.aspect = (experience_container.value.clientWidth / experience_container.value.clientHeight);
  camera.updateProjectionMatrix();
  renderer.setSize(experience_container.value.clientWidth, experience_container.value.clientHeight);
  renderer.render(scene, camera);
}

function setRenderer() {

  if(experience.value) {
    renderer = new WebGLRenderer({
      canvas: experience.value,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    updateRenderer();
  }
}

/* used to create a meta tag with preview image of configured board */
function saveCanvas() {
  renderer.render(scene, camera);
  let canva = document.getElementById('canvas');
  canva.toBlob((blob) => {

    let img = URL.createObjectURL(blob);
    let path = img.replace('blob:', '');

    useHead({
      meta: [
        { name: 'og:image', content: path }
      ],
    })
  });
}

function getCanvasImage() {
  const canvas = document.getElementById('canvas');
  const dataURL = canvas.toDataURL('image/png'); // Hier kannst du das gewünschte Bildformat angeben
  // dataURL;

  useHead({
    meta: [
      { name: 'og:image', content: dataURL }
    ],
  })

}

onMounted(() => {
  setRenderer();
  loop();
  updateSize();
});

watchEffect(() => loadModel(storeModel.path));

const loop = () => {
  controls.update;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

</script>

<style lang="scss" scoped>

.experience-container {
  width: 100%;
  height: 100%;
}

</style>