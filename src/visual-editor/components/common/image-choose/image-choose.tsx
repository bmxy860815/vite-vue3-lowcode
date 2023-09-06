/*
 * @Author: 高 琨
 * @Date: 2023-09-05 15:50:32
 * @LastEditTime: 2022-09-05 22:58:55
 * @LastEditors: 高琨
 * @Description: 通用组件 - 图片选择器
 */
import { defineComponent } from 'vue';
import { ElButton, ElDialog, ElImage, ElMessage } from 'element-plus';
import { UploadFilled, Briefcase } from '@element-plus/icons-vue';
import { useVModel } from '@vueuse/core';
import './image-choose.scss';

import defaultImage from './icons-logo_m.jpg';
export const ImageChoose = defineComponent({
  props: {
    modelValue: {
      type: [String] as PropType<string>,
    },
    // multiple: {
    //   type: Boolean as PropType<boolean>,
    //   default: false,
    // },
    maxCount: {
      type: Number as PropType<number>,
      default: 5,
    },
  },
  setup(props, { attrs }) {
    console.log('attrs', attrs);
    const modelValue = useVModel(props, 'modelValue');
    console.log('modelValue', modelValue);
    const visiblePop = ref(false);
    const onUploadBtnClick = () => {
      console.log('onUploadBtnClick');
      visiblePop.value = true;
    };

    // 加载图片列表
    function loadImage() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              ID: 1,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 2,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 3,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 4,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 5,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 6,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 7,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },

            {
              ID: 8,
              Name: '图片A',
              Url: 'https://img2.baidu.com/it/u=1432730195,4255430198&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              CreateTime: '',
            },
          ]);
        }, 250);
      });
    }
    const imageList = ref<any[]>([]);
    // 是否显示资源库图片
    const showLibary = ref(false);
    const gotoResourceLibrary = () => {
      showLibary.value = true;
      loadImage().then((res: any[]) => {
        imageList.value = res;
      });
    };

    const uploadImage = () => {};

    const selected = ref<any>(null);

    // 点击图片事件
    const selectedImage = (rec) => {
      selected.value = rec;
      // console.log('isMultiple', props.multiple);
      // if (props.multiple) {
      //   const index = (selected.value as any[]).indexOf(rec.ID);
      //   if (index === -1) {
      //     const len = (selected.value as any[]).length;
      //     console.log('ccxxccxxcc', index, len, props.maxCount);
      //     if (len < props.maxCount) {
      //       (selected.value as any[]).push(rec.ID);
      //     } else {
      //       ElMessage({
      //         message: `最大选择数量为：${props.maxCount}`,
      //         type: 'error',
      //       });
      //     }
      //   } else {
      //     (selected.value as any[]).splice(index, 1);
      //   }
      // } else {
      //   selected.value = rec.ID;
      // }
    };

    // 判断是否为选中的图片
    const isActive = (rec) => {
      return selected.value?.ID === rec.ID;
      // return props.multiple
      //   ? (selected.value as any[]).includes(rec.ID)
      //   : selected.value === rec.ID;
    };

    function reset() {
      showLibary.value = false;
      selected.value = null;
      visiblePop.value = false;
    }
    function onImageSelectCancle() {
      visiblePop.value = false;
      // modelValue.value = selected.value;

      reset();
    }
    function onImageSelectConfirm() {
      if (selected.value && selected.value.Url) {
        modelValue.value = selected.value.Url;
        reset();
      } else {
        ElMessage({
          message: '尚未选中图片！',
          type: 'error',
        });
      }
    }

    return () => (
      <div class="image-choose-panel w-full">
        <slot>
          <div class="default-slot flex items-center py-2">
            <ElImage
              class="icon-image w-15 h-15 mr-4"
              src={props.modelValue || defaultImage}
            ></ElImage>
            <div class="right">
              <div class="hint text-gray-500">建议尺寸80*80</div>
              <ElButton size="default" class="button" type="primary" onClick={onUploadBtnClick}>
                上传
              </ElButton>
            </div>
          </div>
        </slot>
        <ElDialog
          width={showLibary.value ? undefined : '500px'}
          append-to-body
          v-model={visiblePop.value}
        >
          {!showLibary.value ? (
            <div class="pop-up-container">
              <div class="picker-way-card from-upload" onClick={uploadImage}>
                <div class="icon">
                  <el-icon size="3.6rem">
                    <UploadFilled />
                  </el-icon>
                </div>
                <div class="label">本地上传</div>
                <div class="hint">只支持git、jpg、png，小于或等于2M</div>
              </div>
              <div class="picker-way-card from-libary" onClick={gotoResourceLibrary}>
                <div class="icon">
                  <el-icon size="3.6rem">
                    <Briefcase />
                  </el-icon>
                </div>
                <div class="label">素材包导入</div>
                <div class="hint">点击素材包导入，直接从已有文件中选择</div>
              </div>
            </div>
          ) : (
            <div>
              <div class="image-list test-container">
                {imageList.value.map((rec) => (
                  <div
                    class={isActive(rec) ? ['image-list-item', 'active'] : 'image-list-item'}
                    onClick={() => selectedImage(rec)}
                  >
                    <div class="outter-img">
                      <ElImage class="inner-img" src={rec.Url} alt={rec.Name}></ElImage>
                    </div>
                    <div class="img-title">{rec.Name}</div>
                  </div>
                ))}
              </div>
              <div class="footer">
                <ElButton size="large" onClick={onImageSelectCancle}>
                  取消
                </ElButton>
                <ElButton size="large" type="primary" onClick={onImageSelectConfirm}>
                  确认
                </ElButton>
              </div>
            </div>
          )}
        </ElDialog>
      </div>
    );
  },
});
