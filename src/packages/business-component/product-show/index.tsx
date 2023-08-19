import { Button } from 'vant';
import ProductShow from './ProductShow.vue';
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';
import {
  createEditorInputProp,
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
    moduleTitle: createEditorInputProp({ label: '模块名称' }),
    style: createEditorInputProp({ label: '模块样式' }),
    products: createBusinessProductPicker({ label: '选择商品', products: [] }),
  },
} as VisualEditorComponent;
