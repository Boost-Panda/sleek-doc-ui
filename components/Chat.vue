<template>
    <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
      <Badge variant="outline" class="absolute right-3 top-3">
        Output
      </Badge>
      <!-- <LoaderCircle class="absolute right-4 top-4 size-4 animate-spin" />  -->
      
      <div class="flex-1 overflow-auto">
        <div v-for="message in messages" :key="message.id" class="mb-4">
          <p class="text-sm"><strong>{{ message.sender }}:</strong> <span v-html="message.text"></span></p>
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
            <LoaderCircle />
          </Button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import MarkdownIt from 'markdown-it';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
  import { Textarea } from '@/components/ui/textarea';
  import { Paperclip, Mic, CornerDownLeft, LoaderCircle } from 'lucide-vue-next';
  
  
  interface Message {
    id: number;
    sender: string;
    text: string;
  }
  
  export default defineComponent({
    props: {
      threadid: {
        type: String as PropType<string>,
        required: true,
      },
    },
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
    setup(props) {
      const md = new MarkdownIt();
      const messages = ref<Message[]>([]);
      const newMessage = ref('');
      const isLoading = ref(false);
      
  
      const sendMessage = async () => {
        console.log("thread id: " + props.threadid);
        if (newMessage.value.trim()) {
          messages.value.push({ id: Date.now(), sender: 'User', text: newMessage.value });
          // Prepare form data
          isLoading.value = true;
          const formData = new FormData();
          formData.append('threadId', props.threadid);
          formData.append('query', newMessage.value);

          newMessage.value = '';

           // Send request to the API
          const response = await fetch('http://localhost:8080/run-thread', {
            method: 'POST',
            body: formData
          });

          // Check if the request was successful
          if (!response.ok) {
            console.error('API request failed:', response);
            return;
          }
          // Parse the response data
          const data = await response.json();
          isLoading.value = false;
          // Format the bot's response
          const formattedResponse = md.render(data.reply);
          console.log(data);

          // Add the bot's response to the messages
          messages.value.push({ id: Date.now() + 1, sender: 'Sleek Doc', text: formattedResponse });

         
        }
      };
  
      return {
        messages,
        newMessage,
        sendMessage,
        isLoading
      };
    }
  });
  </script>