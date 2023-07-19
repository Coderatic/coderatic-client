<template>
  <div class="overflow-x-clip">
    <q-layout>
      <q-header class="bg-primary-btn" elevated>
        <q-toolbar>
          <q-btn flat no-caps label="Coderatic" class="text-xl"></q-btn>
          <q-space />
          <q-btn-toggle v-model="button" v-if="!sm" flat stretch no-caps toggle-color="" :options="options" />
          <q-btn v-else flat no-caps icon="menu" @click="drawer = !drawer" />
          <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false"
            @mouseout="miniState = true" bordered :class="'text-primary'">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-xl">Coderatic</q-item-label>
                  <hr />
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple v-for="item in options" :key="item.label" :to="item.to">
                <q-btn flat no-caps :icon="item.icon" :label="item.label" />
              </q-item>
            </q-list>
          </q-drawer>
        </q-toolbar>
      </q-header>
      <q-page-container style="padding-left: 10px; padding-right: 15px">
        <slot />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
const $q = useQuasar();

const drawer = ref(false);
const button = ref(false);
const miniState = ref(true);
const sm = ref($q.screen.width < 768);

watch(
  () => $q.screen.width,
  (width) => {
    sm.value = width < 768;
  }
);

let options = [
  {
    icon: "emoji_events",
    label: "Contests",
    value: "Contests",
    to: "/contests",
  },
  { icon: "assignment", label: "Problems", value: "Problems", to: "/problems" },
  { icon: "info", label: "About", value: "About", to: "/about" },
];
</script>

<style scoped>
#app {
  font-family: "Lato", sans-serif;
}
</style>
