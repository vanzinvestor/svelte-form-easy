<script lang="ts">
  import { getContext } from 'svelte';
  import type { FormContext } from '../interfaces/IForm';
  import { schemaKey } from '../key';

  export let type: string | undefined = 'submit';

  let { form, touched, useValidForm, useValidTouch } =
    getContext<FormContext>(schemaKey);

  $: valid = useValidForm($form);
  $: dirty = useValidTouch($touched);
</script>

<button {type} disabled={!valid.isValid && dirty} {...$$restProps}
  ><slot /></button
>
