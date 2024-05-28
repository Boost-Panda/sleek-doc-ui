<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">PDF Summary</h2>
    <div v-html="renderedSummary" class="leading-7 mt-6"></div>
  </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it';

export default defineComponent({
  props: {
    summary: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const md = new MarkdownIt();
    const renderedSummary = computed(() => md.render(props.summary));

    return {
      renderedSummary,
    };
  },
});
</script>