<script lang="ts">
	let { children, data } = $props()
</script>

<section class="nwp page">
	<div class="content heading-2 text-center">
		<h1 class="text-4xl font-bold">{data.nav[3]?.title}</h1>
	</div>
</section>

{@render children?.()}
