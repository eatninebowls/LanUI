<script setup lang="ts">
import { computed } from 'vue';
//该input组件实现了以下功能：
//1.根据state状态动态切换样式
//2.根据size大小动态切换样式
//3.根据contentType类型动态切换样式
//4.根据isRound是否圆角动态切换样式
//5.根据disabled是否禁用动态切换样式
//6.根据placeHolder提示语句动态切换样式
//7.根据clearable是否可清空动态切换样式
//8.根据searchable是否显示搜索图标动态切换样式
interface Props {
  state?: 'normal' | 'wrong' | 'success'; // 添加成功状态
  placeHolder?: string;//默认提示语句
  disabled?: boolean;//是否禁用
  contentType?: 'text' | 'password' | 'email' | 'number' | 'tel';//输入类型
  modelValue?: string | number;//输入值
  // autocomplete?: string;//自动完成
  isRound?: boolean;//是否圆角
  size?:'sm'|'md'|'lg';
  clearable?:boolean;//是否可清空
  searchable?:boolean;//是否可搜索
}

const props = withDefaults(defineProps<Props>(), {
  state: 'normal',
  placeHolder: "Please input",
  disabled: false,
  contentType: 'text',
  // autocomplete: 'off'
  isRound: false,
  size:'md',
  searchable:false
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const stateClasses = computed(() => ({
  'border-gray-300 focus:border-blue-500 focus:ring-blue-200': props.state === 'normal',
  'border-red-500 focus:border-red-500 focus:ring-red-200': props.state === 'wrong',
  'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-200': props.state === 'success',
}));

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const handleFocus = (e: Event) => {
  emit('focus', e);
};

const handleBlur = (e: Event) => {
  emit('blur', e);
};
const sizeClasses=computed(()=>{
  const sizes={
    sm:'h-7 text-xs',
    md:'h-9',
    lg:'h-11 text-lg'
  }
  return sizes[props.size]
})
</script>

<template>
  <div class="relative">
  <!-- 图标容器（绝对定位） -->
  <div class="absolute inset-y-0  flex items-center pl-2 pointer-events-none" v-if="props.searchable">
    <svg t="1753512640285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12561" width="15" height="15"><path d="M1008.936719 939.925506l-219.315465-219.315465a443.346869 443.346869 0 1 0-69.669489 69.62087l219.315466 219.315466a49.249959 49.249959 0 0 0 69.669488-69.620871zM443.267147 788.675138a344.749715 344.749715 0 1 1 344.749715-344.749715 344.749715 344.749715 0 0 1-344.749715 344.749715z" fill="#515151" p-id="12562"></path></svg>
  </div>

  <input
    :type="props.contentType"
    :value="props.modelValue"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    class=" w-full border px-4   py-2 transition-all duration-200
           disabled:opacity-50 disabled:cursor-not-allowed
           focus:ring-2 focus:ring-opacity-50 focus:outline-none"
    :class="[
      stateClasses,sizeClasses,
      props.disabled ? 'bg-gray-100' : 'bg-white',
      props.isRound?'rounded-2xl':'rounded-sm',
      props.searchable?'block pl-10 ':''
    ]"
    :disabled="props.disabled"
    :placeholder="props.placeHolder"
    :isRound="props.isRound"
  />
  </div>
</template>
//后续优化思路：添加一键清空图标以及可选日期功能
