import { defineComponent, PropType, SetupContext } from 'vue';
import { useVModel } from '@vueuse/core';
import { ElImage } from 'element-plus';
import { VisualEditorProps } from '@/visual-editor/visual-editor.props';

export const StylesPickerEditor = defineComponent({
  props: {
    modelValue: { type: String as PropType<string> },
    propConfig: { type: Object as PropType<VisualEditorProps>, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }: SetupContext) {
    const model = useVModel(props, 'modelValue', emit);
    // console.log('emit', emit);

    console.log('styles-picker-porps', props.modelValue, model.value);

    const onClick = (rec) => {
      console.log('123', rec.value);
      model.value = rec.value;
    };

    return () => (
      <div style={{ display: 'flex', alignItems: 'strech' }}>
        {props.propConfig.styles &&
          props.propConfig.styles.map((rec) => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '10px',
                  padding: '5px',
                  border:
                    props.modelValue == rec.value
                      ? '2px solid var(--van-blue)'
                      : '2px solid #efefef',
                }}
              >
                <ElImage onClick={() => onClick(rec)} src={rec.pic}></ElImage>
              </div>
            );
          })}
      </div>
    );
  },
});
