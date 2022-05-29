<script setup>
defineProps({
  honk: Object,
});
</script>

<template>
  <h2>You have (1) Honk Available</h2>
  <div>
    {{ honk }}
  </div>
</template>
