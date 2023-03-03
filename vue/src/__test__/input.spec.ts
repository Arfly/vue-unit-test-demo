import { mount } from '@vue/test-utils'
import Test from '../components/Test.vue'

// 创建一个组件
const wrapper = mount(Test, {
  props: {
    modelValue: 'Hello world',
    'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
  }
})
const inputEle = wrapper.find('.input')
const statusEle = wrapper.find('.status')

// 测试数据的从父组件到子组件单向流动
test('Test Component Props', () => {
  expect(wrapper.props('modelValue')).toBe('Hello world')
})

// 测试子组件更新父组件数据的反向数据流动
test('Test Component v-model emits', async () => {
  await inputEle.setValue('New World') // setValue时使用 await，确保断言前Vue更新了Dom
  expect(wrapper.props('modelValue')).toBe('New World')
})

// 未输入时
test('Test Input placeholder', async () => {
  await inputEle.setValue('')
  expect(inputEle.attributes('placeholder')).toBe('Please input a phone number')
  expect(statusEle.isVisible()).toBeFalsy()
})

// 输入长度异常时
test('Test Input number length', async () => {
  await inputEle.setValue('string')
  expect(statusEle.text()).toBe('Please input a correct phone number')
  expect(statusEle.isVisible()).toBeTruthy()

  await inputEle.setValue('1111')
  expect(statusEle.text()).toBe('Phone number length should be 11')
  expect(statusEle.isVisible()).toBeTruthy()

  await inputEle.setValue('1111111111111111')
  expect(statusEle.text()).toBe('Phone number length should be 11')
  expect(statusEle.isVisible()).toBeTruthy()

  await inputEle.setValue('12345678901')
  expect(statusEle.text()).toBe('Phone number is not acceptable')
  expect(statusEle.isVisible()).toBeTruthy()

  await inputEle.setValue('10345678901')
  expect(statusEle.text()).toBe('Phone number is not acceptable')
  expect(statusEle.isVisible()).toBeTruthy()

  await inputEle.setValue('11345678901')
  expect(statusEle.text()).toBe('Phone number is not acceptable')
  expect(statusEle.isVisible()).toBeTruthy()

  await inputEle.setValue('13456789011')
  expect(statusEle.isVisible()).toBeFalsy()
})
