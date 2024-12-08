import { Injectable, signal } from '@angular/core';
import { Toast } from '../interfaces/toast';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);

  getToasts() {
    return this.toasts;
  }

  show(message: string, type: Toast['type'], duration: number = 3000) {
    const id = crypto.randomUUID();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };
    this.toasts.update((currentToasts) => [...currentToasts, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  private remove(id: string) {
    this.toasts.update((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }
}
