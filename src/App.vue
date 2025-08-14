<script setup lang="ts">
import lanButton from './components/lanButton.vue'
import lanCollapse from './components/lanCollapse.vue'
import lanCollapseItem from './components/lanCollapseItem.vue'
import lanInput from './components/lanInput.vue'
import { useToast } from './composables/useToast'

const { success, error, warning, info } = useToast()

const showSuccessToast = () => {
  success('操作成功！', {
    title: '成功',
    duration: 3000,
  })
}

const showErrorToast = () => {
  error('操作失败，请重试', {
    title: '错误',
    duration: 5000,
  })
}

const showWarningToast = () => {
  warning('请注意检查输入内容', {
    title: '警告',
    duration: 4000,
  })
}

const showInfoToast = () => {
  info('这是一条信息提示', {
    title: '提示',
    duration: 3000,
  })
}

// 测试不同位置
const showTopLeftToast = () => {
  success('左上角提示', {
    position: 'top-left',
    duration: 3000,
  })
}

const showBottomRightToast = () => {
  error('右下角提示', {
    position: 'bottom-right',
    duration: 3000,
  })
}

const showTopCenterToast = () => {
  info('顶部居中提示', {
    position: 'top-center',
    duration: 3000,
  })
}

// 测试无标题
const showNoTitleToast = () => {
  warning('这是一个没有标题的提示')
}

// 测试不可关闭
const showNonClosableToast = () => {
  info('这个提示不能手动关闭', {
    closable: false,
    duration: 2000,
  })
}

// 测试长时间显示
const showLongDurationToast = () => {
  success('这个提示会显示10秒', {
    title: '长时间提示',
    duration: 10000,
  })
}
</script>
<template>
  <div class="p-8 lanace-y-6">
    <lanCollapse>
      <lanCollapseItem title="面板1" name="panel1">
        <p>这是面板1的内容</p>
      </lanCollapseItem>
      <lanCollapseItem title="面板2" name="panel2">
        <p>这是面板2的内容</p>
      </lanCollapseItem>
      <lanCollapseItem title="禁用面板" name="panel3" :disabled="true">
        <p>这是禁用面板的内容</p>
      </lanCollapseItem>
    </lanCollapse>
  </div>
  <div class="flex gap-4 my-8 mx-8">
    <lanButton variant="primary">默认按钮</lanButton>
    <lanButton variant="danger">危险按钮</lanButton>
    <lanButton variant="secondary">次要按钮</lanButton>
    <lanButton variant="success">成功按钮</lanButton>
  </div>

  <div class="flex gap-4 my-8 mx-8">
    <lanButton variant="primary" isCircle>默认按钮</lanButton>
    <lanButton variant="danger" isCircle>危险按钮</lanButton>
    <lanButton variant="secondary" isCircle>次要按钮</lanButton>
    <lanButton variant="success" isCircle>成功按钮</lanButton>
    <lanButton variant="primary" isCircle>🚀</lanButton>
  </div>

  <div class="flex gap-4 my-8 mx-8">
    <lanButton variant="primary" disabled>默认按钮</lanButton>
    <lanButton variant="danger" disabled>危险按钮</lanButton>
    <lanButton variant="secondary" disabled>次要按钮</lanButton>
    <lanButton variant="success" disabled>成功按钮</lanButton>
  </div>
  <div class="flex gap-4 my-8 mx-8 items-center">
    <lanButton variant="primary" size="sm">小小按钮</lanButton>
    <lanButton variant="primary" size="md">中中按钮</lanButton>
    <lanButton variant="primary" size="lg">大大按钮</lanButton>
  </div>
  <div class="flex gap-4 my-8 mx-8">
    <lanButton variant="primary" outline>默认按钮</lanButton>
    <lanButton variant="danger" outline>危险按钮</lanButton>
    <lanButton variant="secondary" outline>次要按钮</lanButton>
    <lanButton variant="success" outline>成功按钮</lanButton>
  </div>
  <div class="flex gap-4 my-8 mx-8">
    <lanButton variant="primary" outline isCircle>默认按钮</lanButton>
    <lanButton variant="danger" outline isCircle>危险按钮</lanButton>
    <lanButton variant="secondary" outline isCircle>次要按钮</lanButton>
    <lanButton variant="success" outline isCircle>成功按钮</lanButton>
  </div>
  <div class="flex gap-4 my-8 mx-8 items-baseline">
    <lanButton variant="primary" loading>提交中...</lanButton>
    <lanButton variant="danger" loading></lanButton>
    <lanButton variant="secondary" loading></lanButton>
    <lanButton variant="success" loading></lanButton>
  </div>
  <div class="flex gap-1 my-8 flex-col mx-8 h-200 w-100">
    <lanInput size="sm"> </lanInput>
    <lanInput size="md"> </lanInput>
    <lanInput size="lg"> </lanInput>
    <lanInput placeHolder="请输入"> </lanInput>
    <lanInput state="wrong"> </lanInput>
    <lanInput state="success"> </lanInput>
    <lanInput isRound searchable>
      <svg
        t="1753515543332"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1175"
        width="20"
        height="20"
      >
        <path
          d="M881.92 645.12v142.08H1024v94.72h-142.08V1024h-94.72v-142.08H645.12v-94.72h142.08V645.12h94.72z"
          fill="#333333"
          p-id="1176"
        ></path>
        <path
          d="M460.251429 0l460.397714 226.304v285.622857h-81.554286v-202.24L502.857143 470.674286V1003.154286L462.116571 1024 0 789.869714V226.377143L460.251429 0zM81.554286 309.577143v430.226286l339.748571 172.105142v-441.051428l-339.748571-161.28z m378.660571-218.624L141.275429 247.588571l320.585142 152.210286 317.659429-152.064-319.268571-156.891428v0.109714z"
          fill="#333333"
          p-id="1177"
        ></path>
      </svg>
    </lanInput>
  </div>
  <div class="p-8 lanace-y-6">
    <!-- 基本类型测试 -->
    <div class="lanace-y-2">
      <h3 class="text-lg font-semibold mb-3">基本类型测试</h3>
      <div class="flex flex-wrap gap-3">
        <button
          @click="showSuccessToast"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          成功 Toast
        </button>
        <button
          @click="showErrorToast"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          错误 Toast
        </button>
        <button
          @click="showWarningToast"
          class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          警告 Toast
        </button>
        <button
          @click="showInfoToast"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          信息 Toast
        </button>
      </div>
    </div>

    <!-- 位置测试 -->
    <div class="lanace-y-2">
      <h3 class="text-lg font-semibold mb-3">位置测试</h3>
      <div class="flex flex-wrap gap-3">
        <button
          @click="showTopLeftToast"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          左上角
        </button>
        <button
          @click="showBottomRightToast"
          class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          右下角
        </button>
        <button
          @click="showTopCenterToast"
          class="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          顶部居中
        </button>
      </div>
    </div>

    <!-- 特殊配置测试 -->
    <div class="lanace-y-2">
      <h3 class="text-lg font-semibold mb-3">特殊配置测试</h3>
      <div class="flex flex-wrap gap-3">
        <button
          @click="showNoTitleToast"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          无标题
        </button>
        <button
          @click="showNonClosableToast"
          class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          不可关闭
        </button>
        <button
          @click="showLongDurationToast"
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          长时间显示
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
