<script lang="ts" setup>
  import { ElForm, ElFormItem, ElColorPicker } from 'element-plus';
  import { ImageChoose } from '@/visual-editor/components/common/image-choose/image-choose.tsx';
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
        emits('update:modelValue', { ...props.modelValue, ...model.value });
        emits('saved');
      })
      .catch((err) => {
        console.log('valid error:', err);
      });
  }
  const rules = {
    title: [{ required: true, message: '请输入标题名称' }],
    icon: [{ required: true, message: '请上传/选择图标' }],
    link: [{ required: true, message: '请选择链接' }],
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
