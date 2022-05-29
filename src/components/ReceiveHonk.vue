<script setup>
import { onMounted, reactive } from "vue";

defineProps({
  honk: Object,
});

const store = reactive({
  audio: undefined,
  playing: false,
});

function playHonk() {
  store.audio.play();
}

onMounted(() => {
  store.audio = document.getElementById("yourHonk");
});
</script>

<template>
  <article class="notificationArea">
    <div class="notification">
      <template v-if="honk">
        <h2>You have (1) Honk Available</h2>
        <audio id="yourHonk" :src="'/sounds/' + honk.sound" preload></audio>
        <button @click="playHonk">🎶 Play 🎶</button>
        <div class="quote">
          <blockquote>
            <p v-html="honk.message"></p>
          </blockquote>
        </div>
      </template>
      <template v-else>
        <h2>You have (0) Honks Available</h2>
        <p>When someone sends you a honk, it'll show up here.</p>
      </template>
    </div>
  </article>
</template>

<style scoped>
.quote {
  display: inline-block;
  margin-block: 3rem;
  overflow: hidden;
  text-align: start;
}

.quote blockquote {
  background-color: #fff;
  border: solid 2px #757575;
  display: inline-block;
  margin: 0;
  max-inline-size: 55ch;
  padding: 1em;
  position: relative;
}

.quote blockquote:before {
  background-color: #fff;
  content: "";
  inset-block-end: -10%;
  inset-block-start: -10%;
  inset-inline-end: 0;
  inset-inline-start: 0;
  position: absolute;
  transform: rotate(-15deg) skew(5deg);
}

.quote blockquote > * {
  position: relative;
  z-index: 1;
}

.notification {
  text-align: center;
}

h2 {
  margin-block-end: revert;
}

button {
  margin-inline: auto;
}

@media (min-width: 52.5rem) {
  .notificationArea {
    justify-content: center;
    display: grid;
  }
}
</style>
