<script lang="ts" setup>
  import { ShoppingCart } from '@element-plus/icons-vue';
  interface Props {
    moduleTitle: { value: string; hidden: boolean };
    hideTitle: boolean;
    products: any[];
    showStyle: any;
  }
  const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="product-show">
    <div v-if="!props.moduleTitle.hidden" class="module-title">{{ props.moduleTitle.value }}</div>
    <template v-if="props.showStyle === '1'">
      <div class="product-grid style-1">
        <div v-for="good of props.products" :key="good.ID" class="product-item">
          <div class="product-image">
            <ElImage :src="good.Covers[0]" class="product-image__img"></ElImage>
          </div>
          <div class="product-name">{{ good.Name }}</div>
          <div class="product-footer">
            <span class="product-price">{{ good.Price }}</span>
            <span class="shopping-cart-btn">
              <el-icon><ShoppingCart /></el-icon>
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="props.showStyle === '2'">
      <div class="product-grid style-2">
        <div v-for="good of props.products" :key="good.ID" class="product-item">
          <div class="product-image">
            <ElImage :src="good.Covers[0]" class="product-image__img"></ElImage>
          </div>
          <div class="product-info">
            <div class="product-name">{{ good.Name }}</div>
            <div class="product-footer">
              <span class="product-price">{{ good.Price }}</span>
              <span class="shopping-cart-btn">
                <el-icon><ShoppingCart /></el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="props.showStyle === '3'">
      <ElCarousel height="280px">
        <template v-for="(good, index) in props.products">
          <ElCarouselItem v-if="index % 2 === 0" :key="index">
            <div class="product-grid style-1">
              <div class="product-item">
                <div class="product-image">
                  <ElImage :src="good.Covers[0]" class="product-image__img"></ElImage>
                </div>
                <div class="product-info">
                  <div class="product-name">{{ good.Name }}</div>
                  <div class="product-footer">
                    <span class="product-price">{{ good.Price }}</span>
                    <span class="shopping-cart-btn">
                      <el-icon><ShoppingCart /></el-icon>
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="index + 1 < props.products.length" class="product-item">
                <div class="product-image">
                  <ElImage
                    :src="props.products[index + 1].Covers[0]"
                    class="product-image__img"
                  ></ElImage>
                </div>
                <div class="product-info">
                  <div class="product-name">{{ props.products[index + 1].Name }}</div>
                  <div class="product-footer">
                    <span class="product-price">{{ props.products[index + 1].Price }}</span>
                    <span class="shopping-cart-btn">
                      <el-icon><ShoppingCart /></el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ElCarouselItem>
        </template>
      </ElCarousel>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
  .product-show {
    width: 100%;
  }
  .module-title {
    text-align: center;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .module-title::before,
  .module-title::after {
    content: '';
    display: inline-block;
    width: 10px;
    height: 2px;
    background-color: #ccc;
    margin: auto 8px;
  }
  .product-name {
    width: 100%;
    text-align: center;
    padding: 8px 0;
  }
  .product-footer {
    padding: 4px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-price {
    color: red;
  }
  .product-price::before {
    content: '￥';
  }
  .shopping-cart-btn {
    width: 24px;
    height: 24px;
    border-radius: 10px;
    background-color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-grid.style-1 {
    padding: 5px;
    width: 100%;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .product-grid.style-2 {
    padding: 5px;
    width: 100%;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .product-grid.style-2 .product-item {
    width: 100%;
    display: flex;
  }

  .product-grid.style-2 .product-item .product-image {
    width: 120px;
    padding-top: 120px;
    flex-shrink: 0;
  }

  .product-grid.style-2 .product-info .product-name {
    text-align: left;
  }
  .product-grid.style-2 .product-info {
    margin-left: 20px;
    padding-right: 20px;
    flex: 1;
    display: flex;
    align-self: stretch;
    flex-direction: column;
    justify-content: space-around;
  }

  .product-image {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }
  .product-image__img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
