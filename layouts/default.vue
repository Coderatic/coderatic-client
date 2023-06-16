<template>
  <div>
    <div>
      <q-layout>
        <q-header class="bg-primary-btn">
          <q-toolbar>
            <q-btn flat no-caps label="Coderatic" class="text-xl"></q-btn>
            <q-space />
            <q-btn-toggle
              v-model="model"
              flat
              stretch
              no-caps
              toggle-color=""
              :options="options"
            />
          </q-toolbar>
        </q-header>
      </q-layout>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
let model = ref("");
let options = [
  { label: "Contests", value: "Contests", to: "/contests" },
  { label: "Problems", value: "Problems", to: "/problems" },
  { label: "About", value: "About", to: "/about" },
];
</script>

<style scoped>
#app {
  font-family: "Lato", sans-serif;
}
</style>
