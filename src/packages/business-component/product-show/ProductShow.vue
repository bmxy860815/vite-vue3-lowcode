<script lang="ts" setup>
  interface Props {
    moduleTitle: string;
    hideTitle: boolean;
    products: any[];
    showStyle: any;
  }
  const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="product-show">ProductShow:: {{ props }}</div>
</template>

<style lang="postcss" scoped></style>
