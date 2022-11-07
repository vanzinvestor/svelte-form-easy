import type { Writable } from 'svelte/store';

export interface IValid<T = any> {
  isValid: boolean;
  errors: Record<keyof T, string> | null;
}

export interface IFormContext<T = any> {
  form: Writable<T>;
  touched: Writable<Record<keyof T, boolean>>;
  useValidForm: (form: T) => IValid<T>;
  useValidTouch: (touch: Record<keyof T, boolean>) => boolean;
  handleChange: (event: any) => void;
  handleTouch: (event: any) => void;
}

export interface IFormSubmit<T = any> {
  valid: IValid<T>;
  form: T;
  reset: () => void;
  forceTouched: () => void;
}
