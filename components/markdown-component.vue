<template>
  <div v-html="rendered_markdown || mdit.render(props.content)" />
</template>

<script setup lang="ts">
// @ts-ignore
import MarkdownIt from "markdown-it";
import mditHljs from "markdown-it-highlightjs";
// @ts-ignore
import mditKatex from "@uniob/markdown-it-katex";
import "highlight.js/styles/atom-one-dark.css";

import { ref } from "vue";
import { watch } from "vue";

const mdit = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

mdit
  .use(mditHljs, {
    inline: false,
    auto: false,
  })
  .use(mditKatex, {
    throwOnError: false,
    errorColor: " #cc0000",
  });

const props = defineProps({
  content: {
    type: String,
    default: "",
    required: true,
  },
  watch: {
    type: Boolean,
    default: false,
  },
});

if (props.watch) {
  watch(
    () => props.content,
    () => {
      rendered_markdown.value = mdit.render(props.content);
    }
  );
}

const rendered_markdown = ref(mdit.render(props.content));
</script>

<style scoped>
:deep(code:not(.hljs)) {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>
