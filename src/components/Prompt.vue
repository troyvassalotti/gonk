<script setup lang=ts>
const props = defineProps({
  available: Boolean,
  onClick: Function,
});

function close() {
  props.onClick();
}
</script>

<template>
  <div class="toast" role="alert" v-if="props.available">
    <p>A honk is waiting! <a href="#receivedHonk" @click="close">Check it out.</a></p>
    <button @click="close">Close</button>
  </div>
</template>

<style scoped>
.toast {
  background: #eee;
  color: var(--secondary);
  border: 1px solid #8885;
  border-radius: 10px;
  box-shadow: 3px 4px 5px 0 #8885;
  font-size: var(--step--1);
  inset-block-end: 0;
  inset-inline-end: 0;
  margin: 16px;
  padding: 16px;
  position: fixed;
  z-index: 1;
}

.toast p {
  margin-block-end: revert;
}
</style>
