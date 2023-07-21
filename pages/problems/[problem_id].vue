<template>
  <div class="flex h-full gap-1 md:flex-row sm:flex-col">
    <div class="mt-5 md:basis-1/2 sm:w-full">
      <h1 class="mb-3 md:text-5xl sm:text-3xl">{{ problem_name }}</h1>
      <hr />
      <markdown-component class="mt-8" :content="problem_statement" />
    </div>
    <div class="w-1 h-full border-l border-gray-300 sm:hidden md:block" />
    <div class="flex flex-col md:flex-grow h-full md:mt-0 sm:mt-10">
      <div
        class="flex flex-row items-center justify-between pl-5 pr-5 w-full h-[10%] gap-5 bg-slate-200"
      >
        <q-btn class="h-10" color="primary" label="Submit" icon="mdi-send" />
        <q-btn
          class="h-10"
          color="primary"
          label="Run tests"
          icon="mdi-restart"
        />
      </div>
      <div class="w-full flex-grow">
        <client-only>
          <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '100%', width: '100%' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
          />
        </client-only>
      </div>
      <div
        class="flex flex-row-reverse items-center w-full h-[10%] gap-5 pr-5 bg-slate-200"
      >
        <q-btn class="h-10" color="primary" label="Submit" icon="mdi-send" />
        <q-btn
          class="h-10"
          color="primary"
          label="Run tests"
          icon="mdi-restart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";

const route = useRoute();

//Reactive
const problem_statement = ref("");
const problem_name = ref("");
const code = ref("");
const extensions = [cpp(), oneDark];

const fetchProblem = async () => {
  const { data, error }: any = await useAPIFetch(
    `/api/problems/get-problem?problem_id=${route.params.problem_id}`
  );
  if (error.value) {
    return Promise.reject(error.value);
  }
  return data.value.problem_data;
};

let problem_data: any = null;
try {
  problem_data = await fetchProblem();
  problem_name.value = problem_data.name;
  problem_statement.value = problem_data.statement;
} catch (error: any) {
  throw createError({
    statusCode: error.statusCode,
    statusMessage: error.data.message,
    fatal: true,
  });
}

definePageMeta({
  title: "Problems",
  description: "Problems",
  layout: "default",
});
</script>

<style scoped></style>
