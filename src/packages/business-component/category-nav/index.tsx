/*
 * @Author: 高  琨
 * @Date: 2023-08-12 17:53:54
 * @LastEditTime: 2022-09-04 22:58:55
 * @LastEditors: 高琨
 * @Description: 业务组件 - 分类导航
 * @FilePath: /vite-vue3-lowcode/src/packages/business-component/category-nav/index.tsx
 */
import { Button } from 'vant';
// import CategoryNav from './CategoryNav.vue';
import { ElImage } from 'element-plus';
import style1 from './nav_1.jpg';
import style2 from './nav_2.jpg';
import style3 from './nav_3.jpg';
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';
import {
  createPropsTableEditor,
  createBusinessStylePicker,
} from '@/visual-editor/visual-editor.props';
import { useGlobalProperties } from '@/hooks/useGlobalProperties';

import './index.scss';

export default {
  key: 'categoryNav',
  moduleName: 'businessComponents', // baseWidgets
  label: '分类导航',
  showStyleConfig: false,
  preview: () => <Button type={'primary'}>分类导航</Button>,
  render: ({ props, block, styles }) => {
    const { registerRef } = useGlobalProperties();
    console.log('blk', block, registerRef, props);
    watch(
      () => props,
      (nv) => {
        console.log('categoryNav::props changed.', nv);
      },
      { deep: true },
    );
    return () => (
      <div style={styles}>
        {props.showStyle && props.navs ? (
          <div class={['navs-layout-container', `style-${props.showStyle}`]}>
            {props.navs &&
              props.navs.map((rec) => {
                return (
                  <div class="item" style={{ backgroundColor: rec.bgColor }}>
                    <ElImage class="item-img" src={rec.icon}></ElImage>
                    <h2>{rec.title}</h2>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>EMPTY</div>
        )}
        {/* <CategoryNav ref={(el) => registerRef(el, block._vid)} {...props}></CategoryNav> */}
      </div>
    );
  },
  resize: {
    height: true,
    width: true,
  },
  events: [],
  props: {
    showStyle: createBusinessStylePicker({
      label: '模块样式',
      styles: [
        { label: '样式一', value: '1', pic: style1 },
        { label: '样式二', value: '2', pic: style2 },
        { label: '样式三', value: '3', pic: style3 },
      ],
    }),
    navs: createPropsTableEditor({
      cols: [
        { label: '图标', value: 'icon' },
        { label: '标题', value: 'title' },
        { label: '链接', value: 'link' },
        { label: '链接地址', value: 'linkTo', hidden: true },
        { label: '背景色', value: 'bgColor' },
        { label: '操作', value: 'op', ops: ['edit', 'up', 'down'] },
      ],
    }),
  },
} as VisualEditorComponent;
