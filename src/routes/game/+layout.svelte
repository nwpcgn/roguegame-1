<script lang="ts">
	import { config } from '$lib/game.svelte.ts'
	import StatusBar from '$lib/StatusBar.svelte'
	let { children } = $props()
</script>

<main class="main sky">{@render children?.()}</main>
<StatusBar></StatusBar>
