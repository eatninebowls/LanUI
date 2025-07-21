<script lang="ts" setup>
import { computed } from 'vue'

// 定义 Props
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' //定义按钮类型
  size?: 'sm' | 'md' | 'lg' //按钮大小
  disabled?: boolean //是否禁用，问好表示属性可选
}
//定义默认值
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

// 根据 variant 动态生成样式类
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    danger: 'bg-red-600 text-white',
  }
  return variants[props.variant]
})

// 根据 size 动态生成样式类
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  }
  return sizes[props.size]
})

// 点击事件
const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
<template>
  <button
    @click="handleClick"
    class="px-4 py-2 rounded-md font-medium transition-colors hover:cursor-pointer"
    :class="[
      variantClasses,
      sizeClasses,
      props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90',
    ]"
    :disabled="props.disabled">
    <slot>Default Button</slot>
  </button>
</template>
