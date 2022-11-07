import type { Writable } from 'svelte/store';
import type { AnySchema } from 'yup';

export function isCheckbox(element: HTMLInputElement) {
  return element.getAttribute && element.getAttribute('type') === 'checkbox';
}

export function isFileInput(element: HTMLInputElement) {
  return element.getAttribute && element.getAttribute('type') === 'file';
}

export function resolveValue(element: HTMLInputElement) {
  if (isFileInput(element)) {
    return element.files;
  } else if (isCheckbox(element)) {
    return element.checked;
  } else {
    return element.value;
  }
}

export function cloneDeep<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

function isNullish(value: any) {
  return value === undefined || value === null;
}

export function assignDeep<T>(object: T, value: any): any {
  if (Array.isArray(object)) {
    return object.map((o: any) => assignDeep(o, value));
  }
  const copy: any = {};
  for (const key in object) {
    copy[key] =
      typeof object[key] === 'object' && !isNullish(object[key])
        ? assignDeep(object[key], value)
        : value;
  }
  return copy;
}

function set<T>(object: Writable<T>, path: any, value: any) {
  if (new Object(object) !== object) return object;

  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }

  const result = path
    .slice(0, -1)
    .reduce(
      (accumulator: any, key: string, index: number) =>
        new Object(accumulator[key]) === accumulator[key]
          ? accumulator[key]
          : (accumulator[key] =
              Math.trunc(Math.abs(path[index + 1])) === +path[index + 1]
                ? []
                : {}),
      object
    );

  result[path[path.length - 1]] = value;

  return object;
}

export function update<T>(object: Writable<T>, path: string, value: any) {
  object.update((o: any) => {
    set<T>(o, path, value);
    return o;
  });
}

export const validateForm = <T = any>(
  schema: AnySchema<T>,
  data: T
): { isValid: boolean; errors: null | Record<keyof T, string> } => {
  try {
    schema.validateSync(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (err: any) {
    const errors = err.inner.reduce((acc: any, err: any) => {
      return { ...acc, [err.path]: err.message };
    }, {});
    return { isValid: false, errors: errors as Record<keyof T, string> };
  }
};
