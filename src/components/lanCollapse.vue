<script setup lang="ts">
import { provide, ref } from 'vue';

interface Props {
  accordion?: boolean; // 是否开启手风琴模式（同时只能展开一个面板）
  modelValue?: string[]; // 当前展开的面板的 name 数组
}

const props = withDefaults(defineProps<Props>(), {
  accordion: false,
  modelValue: () => []
});

const emit = defineEmits(['update:modelValue']);

// 当前展开的面板
const activeNames = ref(props.modelValue);

// 切换面板展开状态
const toggleItem = (name: string) => {
  if (props.accordion) {
    // 手风琴模式：只保留当前点击的面板
    activeNames.value = activeNames.value.includes(name) ? [] : [name];
  } else {
    // 普通模式：切换当前面板的展开状态
    const index = activeNames.value.indexOf(name);
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(name);
    }
  }

  // 触发更新事件
  emit('update:modelValue', activeNames.value);
};

// 提供给子组件的方法和状态
provide('collapseContext', {
  activeNames,
  toggleItem
});
</script>

<template>
  <div class="border border-gray-200 rounded-md overflow-hidden divide-y divide-gray-200">
    <slot></slot>
  </div>
</template>
