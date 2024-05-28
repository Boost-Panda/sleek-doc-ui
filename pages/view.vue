<template>
  <div class="flex h-screen">
    <!-- Left Side: Summary -->
    <div class="w-1/3 h-full overflow-auto p-4 border-r">
      <Summary :summary="summary" />
    </div>
    <!-- Right Side: Chat Interface -->
    <div class="w-2/3 h-full overflow-auto p-4">
      <Chat />
    </div>
  </div>
</template>

<script lang="ts">
import Summary from '@/components/Summary.vue';
import Chat from '@/components/Chat.vue';
import { usePdfStore } from '@/stores/pdfStore';

export default defineComponent({
  components: {
    Summary,
    Chat,
  },
  setup() {
    const pdfStore = usePdfStore();
    const file = pdfStore.getPdfData();
    const summary = ref<string>('');

    onMounted(async () => {
      if (file) {
        const formData = new FormData();
        formData.append('foo', file); // Ensure the key matches the server-side expectation

        try {
          const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.body) {
            throw new Error('ReadableStream not supported');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            summary.value += decoder.decode(value, { stream: true });
          }
        } catch (error) {
          console.error('Error streaming summary:', error);
        }
      }
    });

    return {
      summary,
    };
  },
});
</script>