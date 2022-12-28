<script setup lang="ts">
import SendHonk from "./components/SendHonk.vue";
import ReceiveHonk from "./components/ReceiveHonk.vue";
import Prompt from "./components/Prompt.vue";
import { reactive } from "vue";
import { retrieveHonk, soundLibrary } from "./lib/utils";
import "./assets/reset.css";

const store = {
  state: reactive({
    availableHonk: retrieveHonk(),
    toast: !!retrieveHonk(),
  }),

  /**
   * @note Delayed by 100ms to keep smooth scrolling active
   */
  closeToast() {
    setTimeout(() => {
      store.state.toast = false;
    }, 100);
  },
};
</script>

<template>
  <header class="header">
    <h1>Gonk</h1>
    <p>Send and receive honks with Gonk.</p>
  </header>
  <article class="what">
    <h2 id="what">What is Gonk?</h2>
    <p>
      Gonk is a platform for creating and sending <em>honks</em> to your friends. Honks are composed
      of a sound and a note. Create your honk by selecting a sound from our library and writing a
      personalized note for your recipient. You can then copy or share a URL to send along.
    </p>
  </article>
  <div class="context">
    <SendHonk :sounds="soundLibrary" />
    <ReceiveHonk :honk="store.state.availableHonk" class="honkAvailable" id="receivedHonk" />
  </div>
  <Prompt :available="store.state.toast" :onClick="store.closeToast" />
</template>

<style>
/* The bare minimum English subset, plus copyright & arrows (← ↑ → ↓) & quotes (“ ” ‘ ’) & bullet (•) */
@font-face {
  font-family: "RecVar";
  font-style: oblique 0deg 15deg;
  font-weight: 300 1000;
  font-display: swap;
  src: url("/fonts/Recursive_VF_1.084--subset_range_english_basic.woff2") format("woff2");
  unicode-range: U+0020-007F, U+00A9, U+2190-2193, U+2018, U+2019, U+201C, U+201D, U+2022;
}

html {
  --block-padding: 1.5rem;
  --inline-padding: 20px;

  /* @link https://utopia.fyi/generator-mk-ii?c=320,18,1.2,1140,21,1.25,6,3, */
  --step--3: clamp(0.6513rem, 0.5949rem + 0.2817vw, 0.7956rem);
  --step--2: clamp(0.7813rem, 0.7134rem + 0.339vw, 0.955rem);
  --step--1: clamp(0.9375rem, 0.8563rem + 0.4061vw, 1.1456rem);
  --step-0: clamp(1.125rem, 1.0762rem + 0.2439vw, 1.25rem);
  --step-1: clamp(1.35rem, 1.2329rem + 0.5854vw, 1.65rem);
  --step-2: clamp(1.62rem, 1.4795rem + 0.7024vw, 1.98rem);
  --step-3: clamp(1.9438rem, 1.775rem + 0.8439vw, 2.3763rem);
  --step-4: clamp(2.3325rem, 2.1301rem + 1.0122vw, 2.8513rem);
  --step-5: clamp(2.7994rem, 2.5567rem + 1.2134vw, 3.4213rem);
  --step-6: clamp(3.9594rem, 3.4682rem + 1.7561vw, 4.2056rem);

  /* Colors */
  --primary: #e4d6a7;
  --secondary: #1c110a;
  --tertiary: #9b2915;
  --quadinary: #2541b2;

  accent-color: var(--tertiary);
}

* {
  font-variation-settings: "MONO" var(--mono, 1), "CASL" var(--casl, 0.75), "wght" var(--wght, 440),
    "slnt" var(--slnt, 0), "CRSV" var(--crsv, 0);
}

body {
  background: var(--primary);
  color: var(--secondary);
  font-family: "RecVar", system-ui;
  font-size: var(--step-0);
}

#app {
  padding-block: var(--block-padding);
  padding-inline: var(--inline-padding);
}

.context > * {
  padding-block: calc(var(--block-padding) / 2);
  padding-inline: calc(var(--inline-padding) / 2);
}

:target {
  animation: highlight 2s ease;
}

h1,
h2,
h3 {
  --casl: 1;
  --mono: 0;
  --wght: 765;
}

h1 {
  font-size: var(--step-6);
}

a {
  color: var(--quadinary);
  transition: opacity 0.3s ease;
}

a:hover {
  opacity: 0.8;
}

.header,
.what {
  margin-block-end: clamp(3rem, 25vh, 6rem);
  max-inline-size: 75ch;
}

.anchor {
  --slnt: -15;
}

@keyframes highlight {
  0%,
  75% {
    box-shadow: var(--tertiary) 0 0 5px 5px;
    outline: 1px solid var(--tertiary);
  }

  100% {
    box-shadow: none;
    outline: initial;
  }
}

@media (min-width: 52.5rem) {
  .context {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

button {
  background-color: var(--tertiary);
  border: none;
  border-radius: 0.5em;
  color: whitesmoke;
  cursor: pointer;
  display: block;
  padding-block: 0.75em;
  padding-inline: 1em;
  transition: filter 0.2s ease;
}

button:hover {
  filter: brightness(0.75);
}
</style>
