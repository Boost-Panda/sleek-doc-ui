import { defineStore } from 'pinia';

export const usePdfStore = defineStore('pdf', {
  state: () => ({
    pdfData: null as ArrayBuffer | string | null,
  }),
  actions: {
    setPdfData(pdfData: ArrayBuffer | string | null) {
      this.pdfData = pdfData;
    },
  },
  getters: {
    getPdfData: (state) => state.pdfData,
  },
});