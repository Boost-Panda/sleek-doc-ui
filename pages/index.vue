<template>
    <div class="flex items-center justify-center h-screen">
      <div class="p-8 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">Upload PDF to Begin chat</h1>
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <!-- <Label for="picture"></Label> -->
            <Input id="picture" type="file" @change="onFileChange"/>
            <Button @click="startChat">Start Chat</Button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { Input } from '@/components/ui/input'
    import { Button } from "@/components/ui/button"
    import { usePdfStore } from '@/stores/pdfStore'

    export default defineComponent({
        setup() {
            const router = useRouter();
            const pdfStore = usePdfStore();

            const onFileChange = (event: Event) => {
            const input = event.target as HTMLInputElement;
            const file = input.files ? input.files[0] : null;
            if (file) {
                console.log('File selected:', file);
                pdfStore.setPdfData(file);
            }
            };
            const startChat = () => {
              try {
                console.log('start chat');
                router.push('/view');
              }
              catch (error) {
                console.log(error);
              }
            };

            return {
            onFileChange,
            startChat,
            };
        },
    });
</script>