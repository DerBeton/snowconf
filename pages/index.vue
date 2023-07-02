<template>
  <div>
    <h2>Home</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam aspernatur illo incidunt ipsa minima nemo omnis possimus ratione. Rem.</p>
  </div>
</template>

<script setup>
const router = useRouter();

onMounted(() => {
  // goto start
  router.push('/start');
});

</script>

<style lang="scss" scoped>

</style>