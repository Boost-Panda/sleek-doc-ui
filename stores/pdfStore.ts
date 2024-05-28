import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePdfStore = defineStore('pdf', () => {
  const pdfData = ref<File | null>(null);
  const pdfSummary = ref<string>('');

  function setPdfData(file: File) {
    pdfData.value = file;
  }

  function getPdfData() {
    return pdfData.value;
  }

  function setPdfSummary(summary: string) {
    pdfSummary.value += summary;
  }

  function getPdfSummary() {
    return pdfSummary.value;
  }

  return {
    setPdfData,
    getPdfData,
    setPdfSummary,
    getPdfSummary,
  };
});