<template>
  <div>
    <div class="flex flex-col justify-center items-center h-screen">
      <span
        class="font-extrabold text-9xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        Oops!
      </span>
      <span
        class="font-extrabold text-5xl mt-10 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary"
      >
        {{ error.statusCode }}
      </span>
      <div
        class="mt-10 max-w-md w-full p-5 drop-shadow-xl bg-dialog rounded-xl ml-4 mr-4 text-center"
      >
        {{ error.statusMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["error"]);
</script>

<style scoped></style>
