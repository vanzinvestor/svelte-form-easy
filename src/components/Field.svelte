<script lang="ts">
  import { getContext } from 'svelte';
  import type { IFormContext } from '../interfaces/IForm';
  import { schemaKey } from '../key';

  export let name: string;
  export let type: string | undefined = 'text';
  export let className: string | undefined = '';

  let { form, touched, handleChange, handleTouch, useValidForm } =
    getContext<IFormContext>(schemaKey);

  $: valid = useValidForm($form);
</script>

<input
  {name}
  {type}
  value={$form[name]}
  on:input={handleChange}
  on:focus={handleTouch}
  class={valid && valid.errors && valid.errors[name] && $touched[name]
    ? `${className ? `${className} is-invalid` : 'is-invalid'}`
    : $touched[name]
    ? `${className ? `${className} is-valid` : 'is-valid'}`
    : className}
  {...$$restProps}
/>
