<template>
  <div class="flex h-screen">
    <!-- Left Side: Summary -->
    <div class="w-1/3 h-full overflow-auto p-4 border-r">
      <Summary />
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

export default defineComponent({
  components: {
    Summary,
    Chat,
  },
});
</script>