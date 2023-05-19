<template>
  <h1>unb-libraries/nuxt-layers/base</h1>
  <section>
    <h2>Current session</h2>
    <pre>{{ session }}</pre>
  </section>
</template>

<script setup lang="ts">
const session = useCurrentSession()
</script>
