<script lang="ts" setup>
  import { ElForm, ElFormItem, ElColorPicker, ElDialog, ElRadioGroup } from 'element-plus';
  import { ImageChoose } from '@/visual-editor/components/common/image-choose/image-choose';
  import { Pointer } from '@element-plus/icons-vue';
  import { useVisualData } from '@/visual-editor/hooks/useVisualData';
  interface Props {
    modelValue: any;
  }
  const props = defineProps<Props>();
  const model = ref(JSON.parse(JSON.stringify(props.modelValue)));
  const emits = defineEmits(['update:modelValue', 'saved']);

  function handleModelValue(val, key) {
    emits('update:modelValue', { ...props.modelValue, [key]: val });
  }
  const form = ref();
  function save() {
    form.value
      .validate()
      .then((res) => {
        console.log('validate success...');
        const data = JSON.parse(
          JSON.stringify({ ...props.modelValue, ...model.value, linkTo: linkTo.value }),
        );
        console.log('data', data);
        emits('update:modelValue', data);
        emits('saved');
      })
      .catch((err) => {
        console.log('valid error:', err);
      });
  }
  const validateLink = (rule: any, value: any, callback: any) => {
    console.log('validateLink');
    if (model.value.link === 'none') {
      callback();
      return;
    }

    if (!linkTo.value) {
      callback(new Error(`请选择需要跳转的${model.value.link === 'page' ? '页面' : '文章'}`));
      return;
    }
    callback();
  };
  const rules = {
    title: [{ required: true, message: '请输入标题名称' }],
    icon: [{ required: true, message: '请上传/选择图标' }],
    link: [
      { required: true, message: '请选择链接' },
      {
        validator: validateLink,
        trigger: 'blur',
      },
    ],
  };
  console.log('123', model.value);
  const linkTo = ref(model.value.linkTo);

  const selectedLink = computed(() => {
    console.log('selected:', 1);
    if (!linkTo.value) {
      return null;
    }
    console.log('selected:', 2, model.value.link);
    if (model.value.link === 'page') {
      console.log('selected:', 3);
      const t = pages.value.find((rec) => rec.path === linkTo.value);
      console.log('selected:', 4, t);
      if (!t) {
        return null;
      }
      return t;
    } else {
      console.log('123');
      return null;
    }
  });
  const { jsonData, setCurrentPage, deletePage, updatePage, incrementPage } = useVisualData();
  // 所有的页面
  const pages = computed(() =>
    Object.keys(jsonData.pages).map((key) => ({
      title: jsonData.pages[key].title,
      path: key,
    })),
  );

  const visibleChoosePagePop = ref(false);
  const handleChoosePage = () => {
    console.log('handleChoosePage');
    visibleChoosePagePop.value = true;
  };
  const confirmChoosePage = () => {
    console.log('linkTo', linkTo.value);
    model.linkTo = linkTo.value;
    visibleChoosePagePop.value = false;
  };
</script>

<template>
  <div class="props-form p-4 bg-blue-50 border border-gray-50">
    <ElForm
      label-width="80px"
      ref="form"
      size="small"
      :model="model"
      :rules="rules"
      hide-required-asterisk
    >
      <ElFormItem label="标题名称" prop="title">
        <ElInput v-model="model.title"></ElInput>
        <!-- @update:modelValue="handleModelValue($event, 'title')" -->
      </ElFormItem>
      <ElFormItem label="图标" prop="icon" class="mt-5">
        <ImageChoose v-model="model.icon" />
      </ElFormItem>
      <ElFormItem label="背景颜色" class="mt-5">
        <ElColorPicker v-model="model.bgColor" />
      </ElFormItem>
      <ElFormItem label="链接" class="mt-5" prop="link">
        <div class="w-full">
          <ElRadioGroup v-model="model.link">
            <ElRadio label="page">页面</ElRadio>
            <ElRadio label="article">文章</ElRadio>
            <ElRadio label="none">无</ElRadio>
          </ElRadioGroup>
          <div class="picker-link-to">
            <template v-if="model.link === 'page'">
              <div class="choose-line flex items-center">
                <ElButton size="default" :icon="Pointer" @click="handleChoosePage"
                  >选择页面</ElButton
                >
                <span class="ml-4 text-base text-gray-400" v-if="selectedLink"
                  >已选择页面：[{{ selectedLink?.title }}]</span
                >
              </div>
              <ElDialog
                width="500px"
                append-to-body
                v-model="visibleChoosePagePop"
                title="选择页面"
              >
                <div class="pages-container">
                  <ElRadioGroup size="large" v-model="linkTo">
                    <ElRadio v-for="item of pages" :label="item.path">{{ item.title }}</ElRadio>
                  </ElRadioGroup>
                </div>
                <div class="footer flex justify-end">
                  <ElButton size="default">取消</ElButton>
                  <ElButton type="primary" size="default" @click="confirmChoosePage">确认</ElButton>
                </div>
              </ElDialog>
            </template>
            <template v-else-if="model.link === 'article'">
              <ElButton :icon="Pointer" size="default">选择文章</ElButton>
            </template>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem class="save-line pt-5">
        <ElButton size="default" type="primary" @click="save">保存</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="postcss" scoped>
  .save-line :deep(.el-form-item__content) {
    justify-content: center !important;
  }
</style>
