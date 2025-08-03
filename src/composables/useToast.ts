import { createApp, ref } from 'vue'
import type { App } from 'vue'
import LanToast from '@/components/lan-toast.vue'

interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
  closable?: boolean
}

class ToastManager {
  private toasts = ref<Array<{ id: string; app: App<Element> }>>([]);
  private idCounter = 0;

  show(options: ToastOptions) {
    const id = `toast-${++this.idCounter}`;

    // 创建容器
    const container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);

    // 创建 Vue 应用实例
    const app = createApp(LanToast, {
      ...options,
      onClose: () => this.remove(id)
    });

    // 挂载组件
    app.mount(container);

    // 记录 toast
    this.toasts.value.push({ id, app });

    return id;
  }

  remove(id: string) {
    const index = this.toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      const toast = this.toasts.value[index];
      toast.app.unmount();

      const container = document.getElementById(id);
      if (container) {
        document.body.removeChild(container);
      }

      this.toasts.value.splice(index, 1);
    }
  }

  success(message: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, type: 'success' });
  }

  error(message: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, type: 'error' });
  }

  warning(message: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, type: 'warning' });
  }

  info(message: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, type: 'info' });
  }
}

const toastManager = new ToastManager();

export const useToast = () => {
  return {
    toast: toastManager,
    success: toastManager.success.bind(toastManager),
    error: toastManager.error.bind(toastManager),
    warning: toastManager.warning.bind(toastManager),
    info: toastManager.info.bind(toastManager)
  };
};
