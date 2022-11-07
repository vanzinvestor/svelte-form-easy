import type { Writable } from 'svelte/store';

export interface IFormValid<T = any> {
  isValid: boolean;
  errors: Record<keyof T, string> | null;
}

export interface IFormContext<T = any> {
  form: Writable<T>;
  touched: Writable<Record<keyof T, boolean>>;
  useValidForm: (form: T) => IFormValid<T>;
  useValidTouch: (touch: Record<keyof T, boolean>) => boolean;
  handleChange: (event: any) => void;
  handleTouch: (event: any) => void;
}

export interface IFormSubmit<T = any> {
  valid: IFormValid<T>;
  form: T;
  reset: () => void;
  forceTouched: () => void;
}
