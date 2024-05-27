<template>
  <div class="flex h-screen">

    <div class="w-full h-full overflow-auto bg-white p-4">
      <!-- <ChatInterface /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { usePdfStore } from '@/stores/pdfStore';
// import PdfViewer from '@/components/pdfViewer.vue';

export default defineComponent({
  components: {
    // PdfViewer,
  },
  setup() {
    const pdfStore = usePdfStore();
    const pdfData = computed(() => pdfStore.getPdfData);

    return {
      pdfData,
    };
  },
});
</script>