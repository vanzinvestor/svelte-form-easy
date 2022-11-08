<script lang="ts">
  import { setContext } from 'svelte';
  import type { AnySchema } from 'yup';
  import type { FormContext, FormSubmit } from '../interfaces/IForm';
  import { useForm } from '../useForm';
  import { schemaKey } from '../key';

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

  setContext<FormContext>(schemaKey, {
    form,
    touched,
    useValidForm,
    useValidTouch,
    handleChange,
    handleTouch,
  });

  export let handleSubmit: (args: FormSubmit) => void;
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
