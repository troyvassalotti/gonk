<script setup>
import Welcome from "./components/Welcome.vue";
import SendHonk from "./components/SendHonk.vue";
import ReceiveHonk from "./components/ReceiveHonk.vue";
import { reactive } from "vue";
import { retrieveHonk } from "./lib/utils";

const store = {
  state: reactive({
    availableHonk: retrieveHonk(),
    preparedHonk: null,
  }),
};
</script>

<template>
  <Welcome />
  <ReceiveHonk v-if="store.state.availableHonk" :honk="store.state.availableHonk" />
  <SendHonk />
</template>

<style>
* {
  box-sizing: border-box;
}

*::after,
*::before {
  box-sizing: inherit;
}
</style>
