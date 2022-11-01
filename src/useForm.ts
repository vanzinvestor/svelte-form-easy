import type { AnySchema } from 'yup';
import {
  assignDeep,
  cloneDeep,
  resolveValue,
  update,
  validateForm,
} from './utils';
import { writable } from 'svelte/store';

type createFormProps<T = any> = {
  initialValues: T;
  validationSchema: AnySchema<T>;
};

export const useForm = <T = any>({
  initialValues,
  validationSchema,
}: createFormProps<T>) => {
  const getInitial = {
    values: () => cloneDeep<T>(initialValues),
    touched: () => assignDeep<T>(initialValues, false),
  };

  const form = writable<T>(getInitial.values());
  const touched = writable<Record<keyof T, boolean>>(getInitial.touched());

  function handleChange(event: any) {
    const element = event.target;
    const field = element.name;
    const value = resolveValue(element);

    update(form, field, value);
  }

  const handleTouch = (event: any) => {
    const element = event.target;
    const field = element.name;

    update(touched, field, true);
  };

  function useValidForm(form: T) {
    return validateForm<T>(validationSchema, form);
  }

  const useValidTouch = (touch: Record<keyof T, boolean>) =>
    Object.entries(touch).filter(([, value]) => value === true).length !== 0;

  function handleReset() {
    form.set(getInitial.values());
    touched.set(getInitial.touched());
  }

  function handleForceTouched() {
    touched.set(assignDeep(initialValues, true));
  }

  return {
    form,
    touched,
    useValidForm,
    useValidTouch,
    handleChange,
    handleTouch,
    handleReset,
    handleForceTouched,
  };
};
