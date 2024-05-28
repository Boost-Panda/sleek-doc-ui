<template>
    <NavBar />
    <div class="min-h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold">
            Sleek Doc
          </h1>
        </div>
      </header>
      <main>
        <NuxtPage />
      </main>
    </div>
  </template>

<script lang="ts">
  import NavBar from '@/components/NavBar.vue';
</script>