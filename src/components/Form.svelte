<script lang="ts">
  import { setContext } from 'svelte';
  import type { AnySchema } from 'yup';
  import type { IFormContext, IResultSubmit } from '../interfaces/form';
  import { useForm } from '..';
  import { schemaKey } from './key';

  export let initialValues: object;
  export let validationSchema: AnySchema;

  export let {
    form,
    touched,
    useValidForm,
    useValidTouch,
    handleChange,
    handleTouch,
    handleReset,
    handleForceTouched,
  } = useForm({
    initialValues,
    validationSchema,
  });

  setContext<IFormContext>(schemaKey, {
    form,
    touched,
    useValidForm,
    useValidTouch,
    handleChange,
    handleTouch,
  });

  export let handleSubmit: (args: IResultSubmit) => void;
</script>

<form
  on:submit|preventDefault={() =>
    handleSubmit({
      valid: useValidForm($form),
      form: $form,
      reset: handleReset,
      forceTouched: handleForceTouched,
    })}
  {...$$restProps}
>
  <slot {form} {touched} {handleChange} {handleTouch} />
</form>
