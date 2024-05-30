<template>
  <div class="flex h-screen">
    <!-- Left Side: Summary -->
    <div class="w-1/3 h-full overflow-auto p-4 border-r">
      <Summary :summary="summary" />
    </div>
    <!-- Right Side: Chat Interface -->
    <div class="w-2/3 h-full overflow-auto p-4">
      <Chat :threadid="threadid" />
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
    const threadid = ref<string>('');

    onMounted(async () => {
      if (file) {
        const formData = new FormData();
        formData.append('foo', file); // Ensure the key matches the server-side expectation
        formData.append('query', 'Summarize what inside this PDF file.'); // Additional form data can be appended as needed

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

        // do it for creathing the thread too
        try {
          const response = await fetch('http://localhost:8080/create-thread', {
            method: 'POST',
            body: formData,
          });

          // const threadId = response.
          const threadData = await response.json();
          const tid = threadData.threadId;
          threadid.value = tid;

        } catch (error) {
          console.error('Error streaming summary:', error);
        }
      }
    });

    return {
      summary,
      threadid
    };
  },
});
</script>