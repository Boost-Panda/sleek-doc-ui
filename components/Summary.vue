<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">PDF Summary</h2>
    <div v-if="!renderedSummary">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
    <div v-else v-html="renderedSummary" class="leading-7 mt-6"></div>
  </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';


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