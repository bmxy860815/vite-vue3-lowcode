import { defineComponent, PropType, SetupContext } from 'vue';
import { useVModel } from '@vueuse/core';
import { ElCheckbox, ElInput } from 'element-plus';

export const ModuleTitleEditor = defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<{ value: string; hidden: boolean }>,
      required: true,
      default() {
        return { value: '', hidden: false };
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }: SetupContext) {
    const model = useVModel(props, 'modelValue', emit);
    // console.log('emit', emit);

    console.log('styles-picker-porps', props.modelValue, model.value);
    function handleInputChange(val) {
      console.log('han', val);
      model.value = { ...props.modelValue, value: val };
    }

    function handleCheckboxChange(val) {
      console.log('hanldeCheckboxChange', val);
      model.value = { ...props.modelValue, hidden: val };
    }
    return () => (
      <div class="flex w-full">
        <div class="flex-1">
          <ElInput modelValue={props.modelValue.value} onInput={handleInputChange}></ElInput>
        </div>
        <div class="div ml-2">
          <ElCheckbox modelValue={props.modelValue.hidden} onChange={handleCheckboxChange}>
            隐藏
          </ElCheckbox>
        </div>
      </div>
    );
  },
});
