<template>
  <el-row type="flex" class="header">
    <!--    左侧logo start-->
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <h3 class="text-2xl ml-2 font-semibold">商城制作</h3>
    </el-col>
    <!--    左侧logo end-->
    <!--    中间操作页面部分 start-->
    <el-col class="flex items-center" :span="12">
      <template v-for="(toolItem, toolIndex) in tools" :key="toolIndex">
        <div :class="[`w-1/${tools.length}`]" class="w-1/9">
          <div
            class="tool-item flex flex-col items-center cursor-pointer"
            @click="toolItem.onClick"
          >
            <el-icon>
              <component :is="toolItem.icon" />
            </el-icon>
            <div class="title">{{ toolItem.title }}</div>
          </div>
        </div>
      </template>
    </el-col>
    <!--    中间操作页面部分 end-->
    <!--    右侧工具栏 start-->
    <el-col :span="6" class="right-tools flex flex-row-reverse items-center">

<!--      v-if="isInFrame"-->
      <el-button round class="header-text-btn" type="default" @click="goBack" size="large">返回</el-button>
      <el-button round class="header-text-btn" type="success" @click="save" size="large">保存</el-button>
      <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
        <el-button
          type="primary"
          :icon="VideoPlay"
          size="large"
          circle
          class="flex-shrink-0 !p-6px"
          @click="runPreview"
        />
      </el-tooltip>
      <!--      <el-tooltip class="item" effect="dark" content="github" placement="bottom">-->
      <!--        <a href="https://github.com/buqiyuan/vite-vue3-lowcode" target="_blank">-->
      <!--          <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />-->
      <!--        </a>-->
      <!--      </el-tooltip>-->
      <!-- <el-popover placement="bottom" :width="140" trigger="hover">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="github" placement="bottom">
              <a href="https://github.com/buqiyuan/vite-vue3-lowcode" target="_blank">
                <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />
              </a>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="gitee" placement="bottom">
              <a href="https://gitee.com/buqiyuan/vite-vue3-lowcode" target="_blank">
                <img :src="`${BASE_URL}gitee.svg`" width="40" height="40" alt="" />
              </a>
            </el-tooltip>
          </el-col>
        </el-row>
        <template #reference>
          <img :src="`${BASE_URL}github.svg`" width="40" height="40" alt="" />
        </template>
      </el-popover> -->
    </el-col>
    <!--    右侧工具栏 end-->
  </el-row>
  <preview v-model:visible="isShowH5Preview" />
</template>

<script lang="ts" setup>
  import { VideoPlay } from '@element-plus/icons-vue';
  import Preview from './preview.vue';
  import { useTools } from './useTools';
  import { useVisualData, localKey, initVisualData } from '@/visual-editor/hooks/useVisualData';
  // import { BASE_URL } from '@/visual-editor/utils';

  // @ts-ignore
  defineOptions({
    name: 'PageHeader',
  });

  const isShowH5Preview = ref(false);

  const tools = useTools();

  const { jsonData, overrideProject } = useVisualData();

  const runPreview = () => {
    sessionStorage.setItem(localKey, JSON.stringify(jsonData));
    localStorage.setItem(localKey, JSON.stringify(jsonData));
    isShowH5Preview.value = true;
  };
  const isInFrame = computed(() => {
    return window.parent !== window
  })

  const isSubApp = computed(() => {
    return Boolean(window.microApp);
  })

  const messageHandler = (event) => {
    console.log('messageHandler', event)
    if(event.source === parent) {
      if(event.data && event.data.action === 'init') {
        if(event.data.data) {
          // overrideProject(event.data.data as string)
          const jData = JSON.parse(event.data.data)
          console.log('overrideProject', jData)

          overrideProject(jData);
        }
      }
    }
  }

  const init = () => {
    parent.postMessage({action: 'loadData'}, "*");
  }

  onMounted(() => {
    window.addEventListener('message', messageHandler)
    init()
  })
  const goBack = () => {
    console.log('goBack')
    if(isInFrame.value) {
      parent.postMessage({action: 'goback', data: JSON.stringify(jsonData)}, '*')
    } else if(isSubApp.value) {
      const baseRouter = window.microApp.router.getBaseAppRouter()
      baseRouter.go(-1)
    } else {
      console.log('no need go back.')
    }
  }

  const save = () => {
    parent.postMessage({action: 'save', data: JSON.stringify(jsonData)}, '*')
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
  .header-text-btn {
    font-size: 18px!important;
  }

    .logo {
      width: 60px;
      height: 60px;
      background-image: url('@/assets/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
    }

    .tool-item {
      .title {
        margin-top: 4px;
        font-size: 12px;
      }
    }

    .el-button {
      font-size: 22px;
    }

    .right-tools > * {
      margin-left: 8px;
    }
  }
</style>
