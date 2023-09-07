/*
 * @Author: 高  琨
 * @Date: 2023-08-12 17:53:54
 * @LastEditTime: 2022-09-04 22:58:55
 * @LastEditors: 高琨
 * @Description: 业务组件 - 分类导航
 * @FilePath: /vite-vue3-lowcode/src/visual-editor/components/right-attribute-panel/components/attr-editor/props-table-editor/props-table-editor.tsx
 */
import { defineComponent, PropType, SetupContext } from 'vue';
import { Edit, Top, Bottom, Delete } from '@element-plus/icons-vue';
import { useVModel } from '@vueuse/core';
import { ElImage } from 'element-plus';
import PropForm from './PropForm.vue';
import styles from './props-table-edior.module.scss';
import { VisualEditorProps } from '@/visual-editor/visual-editor.props';

export const PropsTableEditor = defineComponent({
  props: {
    modelValue: { type: String as PropType<string> },
    propConfig: { type: Object as PropType<VisualEditorProps>, required: true },
    propObj: { type: Object as PropType<any> },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }: SetupContext) {
    const model = useVModel(props, 'modelValue', emit);
    console.log('emit', emit, model);

    console.log('PropsTableEditor', props, props.propObj);

    watch(
      () => props.propObj.showStyle,
      (newVal) => {
        const t = [...navArr.value, { ...empty }, { ...empty }];
        if (newVal === '1') {
          navArr.value = t.slice(0, 4);
        } else if (newVal === '2') {
          navArr.value = t.slice(0, 5);
        } else if (newVal === '3') {
          navArr.value = t.slice(0, 6);
        }
      },
    );

    // 根据传入的cols参数生成属性对象
    const empty = props.propConfig.cols
      ? Object.fromEntries(props.propConfig.cols.map((rec) => [rec.value, '']))
      : {};

    console.log('empty', empty);
    const navArr = ref([{ ...empty }, { ...empty }, { ...empty }, { ...empty }]);

    const operators = [
      {
        key: 'edit',
        tsx: (rec) => {
          const onClick = (rec) => {
            console.log('rec-Click', rec);
            Object.assign(rec, { isEdit: true });
          };
          return (
            <el-icon class={styles.opIcon} onClick={() => onClick(rec)}>
              <Edit />
            </el-icon>
          );
        },
      },
      {
        key: 'up',
        tsx: () => {
          return (
            <el-icon class={styles.opIcon}>
              <Top />
            </el-icon>
          );
        },
      },
      {
        key: 'down',
        tsx: () => {
          return (
            <el-icon class={styles.opIcon}>
              <Bottom />
            </el-icon>
          );
        },
      },
      {
        key: 'del',
        tsx: () => {
          return (
            <el-icon color="#f00" class={[styles.opIcon, styles.delIcon]}>
              <Delete />
            </el-icon>
          );
        },
      },
    ];

    const updateModelValue = (event, index) => {
      console.log(event, index);
      navArr.value[index] = event;
    };

    const propsFormSave = (index) => {
      navArr.value[index].isEdit = false;
    };

    const colDisplay = (col, rec) => {
      if (!rec[col.value]) {
        return <span>{col.label}</span>;
      }
      if (col.value === 'icon') {
        return <ElImage src={rec[col.value]} class="w-10 h-10"></ElImage>;
      } else if (col.value === 'link') {
        const mapping = {
          page: '页面',
          article: '文章',
          none: '无',
        };
        return <span>{mapping[rec[col.value]]}</span>;
      } else {
        return <span>{rec[col.value]}</span>;
      }
    };
    return () => (
      <div class={styles.propsTable}>
        <div class={[styles.propsTableLine, styles.header]}>
          {props.propConfig?.cols &&
            props.propConfig.cols.map((col) => <div class={[styles.headerItem]}>{col.label}</div>)}
        </div>
        {navArr.value.map((rec: any, index: number) => (
          <>
            <div class={styles.propsTableLine}>
              {props.propConfig?.cols &&
                props.propConfig.cols.map((col) => {
                  if (col.value === 'op') {
                    return (
                      <div class={styles.operators}>
                        {operators.filter((t) => col.ops.includes(t.key)).map((t) => t.tsx(rec))}
                      </div>
                    );
                  } else {
                    return <div class={styles.propsCol}>{colDisplay(col, rec)}</div>;
                  }
                })}
            </div>
            {rec.isEdit && (
              <PropForm
                modelValue={rec}
                onUpdate:modelValue={(event) => updateModelValue(event, index)}
                onSaved={() => propsFormSave(index)}
              ></PropForm>
            )}
          </>
        ))}
      </div>
    );
  },
});
