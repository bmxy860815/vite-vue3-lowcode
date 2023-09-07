/*
 * @Author: 高琨
 * @Date: 2023-09-07 14:24:50
 * @LastEditTime: 2023-09-07 14:24:50
 * @LastEditors: 高琨
 * @Description: 业务组件 - 功能库
 *
 */

import { defineComponent } from 'vue';
import axios from 'axios';

export const CommonFeatureLibrary = defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<{ ID: number; Type: string; Record: any }>,
      default() {
        return { ID: 0, Type: '', Record: null };
      },
    },
    request: {
      type: [Object, Function] as PropType<any>,
      default() {
        return axios.create();
      },
    },
  },
  setup(props, { attrs }) {
    console.log('attrs', attrs);
    return () => <div>CommonFeatureLibrary</div>;
  },
});
