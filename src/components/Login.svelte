<script>
	import supabase from '../lib/supabase.js'
	let { onLoginSuccess } = $props()

	let email = $state('')
	let password = $state('')
	let error = $state('')

	async function login() {
		const { error: err } = await supabase.auth.signInWithPassword({
			email,
			password
		})
		if (err) error = err.message
		else onLoginSuccess()
	}
</script>

<div class="card bg-base-100/40 shadow">
	<div class="card-body">
		<h2 class="card-title">Login</h2>
		<input
			class="input input-bordered"
			placeholder="Email"
			bind:value={email} />
		<input
			class="input input-bordered mt-2"
			type="password"
			placeholder="Passwort"
			bind:value={password} />
		<button class="btn btn-info mt-4" on:click={login}>Einloggen</button>
		{#if error}<div class="text-error mt-2">{error}</div>{/if}
	</div>
</div>
