<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">PDF Summary</h2>
    <p v-if="pdfSummary" class="leading-7 mt-6">{{ pdfSummary }}</p>
    <p v-else class="text-gray-500">No summary available.</p>
  </div>
</template>

<script lang="ts">
import { usePdfStore } from '@/stores/pdfStore';

export default defineComponent({
  setup() {
    const pdfStore = usePdfStore();
    const pdfSummary = computed(() => {
      // Mock summary for the purpose of this example. This will come from GPT
      return "This is a summary of the uploaded PDF document. It provides an overview of the contents of the PDF.";
    });

    return {
      pdfSummary
    };
  },
});
</script>