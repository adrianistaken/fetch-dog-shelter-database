<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <h1>Fetch</h1>
    <h2>Find Your Future Best Friend</h2>
    <input type="text" placeholder="Name" />
    <input type="text" placeholder="Email" />
    <button class="btn btn-primary">Login</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
