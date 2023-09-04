import { defineComponent, PropType, SetupContext } from 'vue';
import { useVModel } from '@vueuse/core';
import { ElButton, ElDialog, ElImage, ElTable, ElTableColumn } from 'element-plus';
import { groups, products } from './mock-data';
import { VisualEditorProps } from '@/visual-editor/visual-editor.props';
import './product-picker.css';

export const ProductPickerEditor = defineComponent({
  props: {
    modelValue: { type: Object as PropType<any[]> },
    propConfig: { type: Object as PropType<VisualEditorProps>, required: true },
    propObj: { type: Object as PropType<any> },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }: SetupContext) {
    const model = useVModel(props, 'modelValue', emit);
    const visible = ref(false);
    console.log('model', model);
    console.log('products', products);

    const productGroup = ref(groups);
    const onClick = async () => {
      console.log('onClick', props.propObj.style);
      visible.value = true;
    };

    const activeGroup = ref<any>('');
    const searchProduct = (key: string | number) => {
      console.log('searchProduct', key);
      activeGroup.value = key;
    };

    const selectionChange = (selection) => {
      console.log('123', selection);
    };

    const multipleTableRef = ref();

    const cancleDialog = () => {};

    const confirmDialog = () => {
      const selection = multipleTableRef.value.getSelectionRows();
      console.log('selections', selection.map(toRaw));
      model.value = selection.map(toRaw);
      visible.value = false;
    };

    const deleteItem = (rowIndex: any) => {
      const newRecord = JSON.parse(JSON.stringify(props.modelValue));
      newRecord.splice(rowIndex, 1);
      model.value = newRecord;
    };

    return () => (
      <div class="w-full">
        <div onClick={() => onClick()} class="picker-label">
          选择商品
        </div>
        {/* 已选择商品 */}
        {props.modelValue && (
          <ElTable class="w-full" data={props.modelValue} onSelectionChange={selectionChange}>
            <ElTableColumn label="商品名称" property="Name">
              {{
                default: (scope) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ElImage
                      style={{ width: '50px', height: '50px', marginRight: '8px' }}
                      src={scope.row.Covers[0]}
                      preview-src-list={scope.row.Covers}
                      preview-teleported={true}
                      z-index={9999}
                    ></ElImage>
                    <span>{scope.row.Name}</span>
                  </div>
                ),
              }}
            </ElTableColumn>
            <ElTableColumn label="价格（元）" property="Price" width="100" />
            <ElTableColumn label="操作" width="70">
              {{
                default: (scope) => (
                  <ElButton type="danger" link onClick={() => deleteItem(scope.$index)}>
                    删除
                  </ElButton>
                ),
              }}
            </ElTableColumn>
          </ElTable>
        )}
        {/* 选择商品dialog */}
        <ElDialog
          v-model={visible.value}
          append-to-body
          title="商品选择"
          custom-class="prodcut-picker-dialog"
        >
          {{
            default: () => (
              <div class="w-full flex items-strech" style={{ height: '500px' }}>
                <div class="left">
                  <div class="groups">
                    <div
                      class={[activeGroup.value === '' ? 'group-item active' : 'group-item']}
                      onClick={() => searchProduct('')}
                    >
                      全部
                    </div>
                    <div
                      class={[activeGroup.value === '0' ? 'group-item active' : 'group-item']}
                      onClick={() => searchProduct('0')}
                    >
                      未分组
                    </div>
                    {productGroup.value.map((grp) => {
                      return (
                        <div
                          class={[
                            activeGroup.value === grp.ID ? 'group-item active' : 'group-item',
                          ]}
                          onClick={() => searchProduct(grp.ID)}
                        >
                          {grp.Name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div class="right flex-1 bg-yellow-100">
                  <ElTable
                    ref={multipleTableRef}
                    class="w-full"
                    data={products}
                    onSelectionChange={selectionChange}
                  >
                    <ElTableColumn type="selection" width="55" />
                    <ElTableColumn label="商品名称" property="Name">
                      {{
                        default: (scope) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ElImage
                              style={{ width: '50px', height: '50px', marginRight: '8px' }}
                              src={scope.row.Covers[0]}
                              preview-src-list={scope.row.Covers}
                              preview-teleported={true}
                              z-index={9999}
                            ></ElImage>
                            <span>{scope.row.Name}</span>
                          </div>
                        ),
                      }}
                    </ElTableColumn>
                    <ElTableColumn label="价格（元）" property="Price" width="100" />
                    <ElTableColumn label="库存（件）" property="Num" width="100" />
                  </ElTable>
                </div>
              </div>
            ),
            footer: () => (
              <span class="dialog-footer">
                <ElButton onClick={cancleDialog}>取消</ElButton>
                <ElButton type="primary" onClick={confirmDialog}>
                  确认
                </ElButton>
              </span>
            ),
          }}
        </ElDialog>
      </div>
    );
  },
});
