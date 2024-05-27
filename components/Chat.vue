<template>
    <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
      <Badge variant="outline" class="absolute right-3 top-3">
        Output
      </Badge>
      <div class="flex-1 overflow-auto">
        <div v-for="message in messages" :key="message.id" class="mb-4">
          <p class="text-sm text-gray-600"><strong>{{ message.sender }}:</strong> {{ message.text }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label for="message" class="sr-only">Message</Label>
        <Textarea id="message" v-model="newMessage" placeholder="Type your message here..." class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" />
        <div class="flex items-center p-3 pt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon">
                  <Paperclip class="size-4" />
                  <span class="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon">
                  <Mic class="size-4" />
                  <span class="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button type="submit" size="sm" class="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft class="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
  import { Textarea } from '@/components/ui/textarea';
  import { Paperclip, Mic, CornerDownLeft } from 'lucide-vue-next';
  
  interface Message {
    id: number;
    sender: string;
    text: string;
  }
  
  export default defineComponent({
    components: {
      Badge,
      Button,
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
      Textarea,
      Paperclip,
      Mic,
      CornerDownLeft,
    },
    setup() {
      const messages = ref<Message[]>([]);
      const newMessage = ref('');
  
      const sendMessage = () => {
        if (newMessage.value.trim()) {
          messages.value.push({ id: Date.now(), sender: 'User', text: newMessage.value });
          // Simulate bot response for the purpose of this example
          setTimeout(() => {
            messages.value.push({ id: Date.now() + 1, sender: 'Bot', text: `You asked: ${newMessage.value}` });
          }, 500);
          newMessage.value = '';
        }
      };
  
      return {
        messages,
        newMessage,
        sendMessage,
      };
    },
  });
  </script>