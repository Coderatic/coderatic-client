<template>
  <div class="flex h-screen gap-1 lg:flex-col sm:flex-row">
    <div class="mt-5 lg:w-1/2 sm:w-full">
      <h1 class="mb-3 lg:text-5xl sm:text-3xl">{{ problem_name }}</h1>
      <hr />
      <markdown-component class="mt-8" :content="problem_statement" />
    </div>
    <div class="w-1 h-full border-l border-gray-300 sm:hidden lg:block" />
    <div class="flex flex-row lg:w-[51%] sm:w-full h-screen gap-0 lg:mt-0 sm:mt-10">
      <client-only>
        <codemirror v-model="code" placeholder="Code goes here..." :style="{ height: '90%', width: '100%' }"
          :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" />
      </client-only>
      <div class="flex flex-row-reverse items-center w-full h-[10%] gap-5 pr-5 bg-slate-200">
        <q-btn class="h-10" color="primary" label="Submit" icon="send" />
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
