import { mount } from '@vue/test-utils'
import { ElButton, ElInput } from 'element-plus'
import SearchInput from '../components/SearchInput.vue'

// 模拟搜索组件的挂载事件
const searchInputComp = mount(SearchInput, {
  // 模拟调用时 v-model="Search input test"
  props: {
      modelValue: 'Search input test',
      'onUpdate:modelValue': (e:string) => searchInputComp.setProps({ modelValue: e })
  },
  // element组件在项目启动时全局挂载，jest无法处理这一点，因此需要在这里显示的生命注册的组件
  components: {
    'el-input': ElInput,
    'el-button': ElButton
  },
})

/** 
 * 获取输入组件，find和findComponent的注意事项可以参考官方文档
 * https://v1.test-utils.vuejs.org/api/wrapper/#findcomponent
 */
const inputEle = searchInputComp.findComponent<typeof ElInput>('.input')
const searchBtn = searchInputComp.findComponent<typeof ElButton>('.search')
const resetBtn = searchInputComp.findComponent<typeof ElButton>('.reset')

test('测试搜索组件组件挂载',()=>{
   /**
   * 测试各个组件是否正常挂载
   */
  expect(inputEle.exists()).toBe(true)
  expect(searchBtn.exists()).toBe(true)
  expect(resetBtn.exists()).toBe(true)
})

/*
  * v-model的emit阶段
  * 示例 https://test-utils.vuejs.org/guide/advanced/v-model.html
  */
test('测试搜索组件的v-model功能', async ()=>{
  /**
   * 使用findComponent和getComponent时需要注意事项
   * https://test-utils.vuejs.org/guide/advanced/component-instance.html#usage-with-getcomponent-and-findcomponent
   */
  // v-model 父元素向子元素传值
  expect(inputEle.props('modelValue')).toBe('Search input test')
  // v-model 子元素更新父元素
  await inputEle.find('input').setValue('new value')
  expect(searchInputComp.props('modelValue')).toBe('new value')
})

test('测试搜索重置功能',async ()=>{
  await inputEle.find('input').setValue('Test search input string')
  // trigger返回一个Promise，因此测试阶段依赖于该trigger行为的后续测试需要等待vue的更新完毕
  await resetBtn.trigger('click')
  expect(searchInputComp.props('modelValue')).toBe('')
})

// 可以查看官方示例：https://test-utils.vuejs.org/guide/essentials/event-handling.html#the-counter-component
test('测试搜索按钮点击搜索功能',async ()=>{
  await inputEle.find('input').setValue('search keyword')
  await searchBtn.trigger('click')
  const searchEvent = searchInputComp.emitted('search')
  expect(searchEvent).toBeTruthy()
  /* 测试触发的次数，多次触发视为异常,多次触发时数据如下
   * [ [第一次触发的数据载体], [第二次触发的数据载体]... ]
   * 以下测试用例表示只触发一次
   */
  expect(searchEvent?.length).toBe(1)
  // 测试event payload, 第一个次触发的第一个参数 
  expect(searchEvent![0][0]).toBe('search keyword')
})