import type { Writable } from 'svelte/store';

export interface FormValid<T = any> {
  isValid: boolean;
  errors: Record<keyof T, string> | null;
}

export interface FormContext<T = any> {
  form: Writable<T>;
  touched: Writable<Record<keyof T, boolean>>;
  useValidForm: (form: T) => FormValid<T>;
  useValidTouch: (touch: Record<keyof T, boolean>) => boolean;
  handleChange: (event: any) => void;
  handleTouch: (event: any) => void;
}

export interface FormSubmit<T = any> {
  valid: FormValid<T>;
  form: T;
  reset: () => void;
  forceTouched: () => void;
}
