<script lang="ts">
  import { getContext } from 'svelte';
  import type { FormContext } from '../interfaces/IForm';
  import { schemaKey } from '../key';

  export let name: string;
  export let component: string | undefined = 'span';
  export let className: string | undefined = '';

  let { form, touched, useValidForm } = getContext<FormContext>(schemaKey);

  $: valid = useValidForm($form);
</script>

{#if valid.errors && valid.errors[name] && $touched[name]}
  {#if component === 'div'}
    <div {...$$restProps} class={className ? className : 'invalid-feedback'}>
      {valid.errors[name]}
    </div>
  {:else}
    <span {...$$restProps} class={className ? className : 'invalid-feedback'}
      >{valid.errors[name]}</span
    >
  {/if}
{/if}
