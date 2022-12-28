<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { shareUrl } from "../lib/utils";

defineProps({
  sounds: Object,
});

const honk = reactive({
  sound: "",
  message: "",
  url: "",
});

const store = reactive({
  audio: undefined
})

function playHonk() {
  store.audio.play();
}

onMounted(() => {
  store.audio = document.getElementById("packagedHonk")
})

/**
 * Create the share URL for sending to a friend
 * @param e
 */
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
  <main>
    <h2>Send a Honk</h2>
    <audio id="packagedHonk" :src="'/sounds/' + honk.sound"></audio>
    <form @submit.prevent class="honkForm">
      <fieldset class="soundArea">
        <legend class="stepLabel">Step 1: Choose Your Honk Sound</legend>
        <div class="inputGroupContainer">
          <div v-for="(value, key, index) in sounds" class="inputGroup">
            <input
              type="radio"
              required
              name="sound"
              v-model="honk.sound"
              @change="playHonk"
              :value="value"
              :id="'honk' + index" />
            <label :for="'honk' + index">{{ key }}</label>
          </div>
        </div>
      </fieldset>
      <div class="messageArea">
        <label class="stepLabel" for="honkMessage">Step 2: Write a Note</label>
        <p id="labelHint">Max length = 250 characters.</p>
        <textarea
          id="honkMessage"
          name="message"
          v-model="honk.message"
          required
          spellcheck
          rows="5"
          maxlength="250"
          aria-describedby="labelHint"></textarea>
        <div class="tooltipArea">
          <button
            class="submitButton"
            type="submit"
            @click="createUrl"
            :aria-disabled="!honk.sound || !honk.message">
            Grab That Honk
          </button>
          <p class="tooltip">Please choose a sound and write a message.</p>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped>
input,
textarea {
  color-scheme: light dark;
}

.honkForm {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-block-end: 4rem;
}

legend {
  font-size: var(--step--1);
  padding-block: 0.5rem;
  padding-inline: 12px;
}

.stepLabel {
  --wght: 550;
}

#labelHint {
  --slnt: -15;
  --wght: 350;
  font-size: var(--step--1);
}

.messageArea {
  display: flex;
  flex-direction: column;
}

.messageArea label {
  font-size: var(--step-1);
  max-inline-size: max-content;
}

.inputGroupContainer {
  --gap: 0.25ch;
  display: grid;
  row-gap: var(--gap);
}

.inputGroup {
  align-items: center;
  display: flex;
  gap: 1ch;
}

.inputGroup label {
  font-size: var(--step--1);
}

.tooltipArea {
  margin-block-start: 1rem;
  position: relative;
}

.tooltip {
  background-color: var(--tertiary);
  border-radius: 5px;
  color: white;
  font-size: 0.8rem;
  inset-block-end: 100%;
  max-inline-size: 25ch;
  opacity: 0;
  padding-block: 1ex;
  padding-inline: 1ch;
  position: absolute;
  text-align: center;
  visibility: hidden;
}

.submitButton[aria-disabled="true"]:is(:hover, :focus) + .tooltip {
  opacity: 1;
  transition: opacity 250ms 500ms;
  visibility: visible;
}

button[aria-disabled="true"] {
  cursor: not-allowed;
}

@media (min-width: 52.5rem) {
  .inputGroupContainer {
    --gap: 1ch;
    grid-template-columns: 1fr 1fr;
  }

  .honkForm {
    margin-block-end: 0;
  }
}
</style>
