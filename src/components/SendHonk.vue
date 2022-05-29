<script setup>
import { reactive } from "vue";
import { shareUrl } from "../lib/utils";

const honk = reactive({
  sound: "",
  message: "",
  url: "",
});

function createUrl(e) {
  if (!honk.sound || !honk.message) {
    return;
  }

  honk.url = shareUrl(honk);

  const link = honk.url;
  if (navigator.share) {
    navigator.share({
      title: "Gonk Honk",
      url: link,
    });
  } else {
    navigator.clipboard.writeText(link);
    const el = e.target;
    const initialText = el.innerText;
    el.innerText = "👍 Link Copied 👍";
    setTimeout(() => {
      el.innerText = initialText;
    }, 3000);
  }
}
</script>

<template>
  <p>Prepare your Honk</p>
  <form @submit.prevent>
    <fieldset>
      <legend>Select Your Honk</legend>
      <label for="honk-1">Sound 1</label>
      <input required type="radio" id="honk-1" name="sound" v-model="honk.sound" value="one" />
      <label for="honk-2">Sound 2</label>
      <input required type="radio" id="honk-2" name="sound" v-model="honk.sound" value="two" />
      <label for="honk-3">Sound 3</label>
      <input required type="radio" id="honk-3" name="sound" v-model="honk.sound" value="three" />
    </fieldset>
    <label for="honk-message">Your Message</label>
    <textarea id="honk-message" name="message" v-model="honk.message" required></textarea>
    <div class="tooltipArea">
      <button
        class="submitButton"
        type="submit"
        @click="createUrl"
        :aria-disabled="!honk.sound || !honk.message">
        Gonk That Honk
      </button>
      <p class="tooltip">Please choose a sound and write a message.</p>
    </div>
  </form>
</template>

<style scoped>
.tooltipArea {
  position: relative;
}

.tooltip {
  background-color: royalblue;
  border-radius: 5px;
  color: white;
  font-size: 0.8rem;
  max-inline-size: 25ch;
  opacity: 0;
  padding-block: 1ex;
  padding-inline: 1ch;
  position: absolute;
  bottom: 100%;
  text-align: center;
  visibility: hidden;
}

.submitButton[aria-disabled="true"]:is(:hover, :focus) + .tooltip {
  opacity: 1;
  transition: opacity 250ms 500ms;
  visibility: visible;
}

button {
  cursor: pointer;
}

button[aria-disabled="true"] {
  cursor: not-allowed;
}
</style>
