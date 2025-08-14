<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue'

interface Props {
  title: string
  name: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

interface CollapseContext {
  activeNames: Ref<string[]>
  toggleItem: (name: string) => void
}

const collapseContext = inject<CollapseContext>('collapseContext')
if (!collapseContext) {
  throw new Error('CollapseItem must be used inside Collapse')
}

const isActive = computed(() =>
  collapseContext.activeNames.value.indexOf(props.name) !== -1
)

function enter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = 'auto'
  const height = htmlEl.scrollHeight
  htmlEl.style.height = '0px'
  void htmlEl.offsetHeight
  htmlEl.style.height = height + 'px'
}

function afterEnter(el: Element) {
  (el as HTMLElement).style.height = 'auto'
}

function beforeLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  void htmlEl.offsetHeight
}

function leave(el: Element) {
  (el as HTMLElement).style.height = '0px'
}

const handleHeaderClick = () => {
  if (!props.disabled) {
    collapseContext.toggleItem(props.name)
  }
}

const contentRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="collapse-item">
    <div
      @click="handleHeaderClick"
      class="flex justify-between items-center p-3 cursor-pointer transition-colors"
      :class="{
        'bg-gray-50 hover:bg-gray-100': !isActive,
        'bg-blue-50': isActive,
        'cursor-not-allowed opacity-60': props.disabled
      }"
    >
      <div class="font-medium">{{ title }}</div>
      <svg
        class="w-5 h-5 transition-transform duration-300"
        :class="{ 'transform rotate-180': isActive }"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <transition
      name="collapse-transition"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-show="isActive"
        ref="contentRef"
        class="overflow-hidden transition-all duration-300"
        style="height: 0"
      >
        <div class="p-4 bg-white">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.collapse-transition-enter-active,
.collapse-transition-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}
</style>
