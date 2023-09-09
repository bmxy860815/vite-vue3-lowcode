<script lang="ts" setup>
  interface Props {
    showStyle: any;
    navs: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    showStyle: '1',
    navs: [],
  });
</script>

<template>
  <div class="category-nav">{{ props }}</div>
</template>

<style lang="postcss" scoped></style>
