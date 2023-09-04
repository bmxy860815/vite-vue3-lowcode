import { Button } from 'vant';
import ProductShow from './ProductShow.vue';
import style1 from './modal-style_1.jpg';
import style2 from './modal-style_2.jpg';
import style3 from './modal-style_3.jpg';
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';
import {
  createEditorModuleTitleProp,
  // createEditorInputProp,
  createBusinessStylePicker,
  // createEditorSelectProp,
  // createEditorSwitchProp,
  createBusinessProductPicker,
} from '@/visual-editor/visual-editor.props';
import { useGlobalProperties } from '@/hooks/useGlobalProperties';
export default {
  key: 'productShow',
  moduleName: 'businessComponents', // baseWidgets
  label: '产品展示',
  showStyleConfig: false,
  preview: () => <Button type={'primary'}>产品展示</Button>,
  render: ({ props, block, styles }) => {
    const { registerRef } = useGlobalProperties();

    return () => (
      <div style={styles}>
        {/* <span>{JSON.stringify(props)}</span> */}
        <ProductShow ref={(el) => registerRef(el, block._vid)} {...props}></ProductShow>
      </div>
    );
  },
  resize: {
    height: true,
    width: true,
  },
  events: [
    { label: '点击按钮，且按钮状态不为加载或禁用时触发', value: 'click' },
    { label: '开始触摸按钮时触发', value: 'touchstart' },
  ],
  props: {
    moduleTitle: createEditorModuleTitleProp({ label: '模块名称', hidden: false, value: '' }),
    showStyle: createBusinessStylePicker({
      label: '模块样式',
      styles: [
        { label: '样式一', value: '1', pic: style1 },
        { label: '样式二', value: '2', pic: style2 },
        { label: '样式三', value: '3', pic: style3 },
      ],
    }),
    products: createBusinessProductPicker({ label: '选择商品', products: [] }),
  },
} as VisualEditorComponent;
