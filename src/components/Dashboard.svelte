<script>
	import supabase from '../lib/supabase.js'
	let mW = $state(30)
	let mH = $state(30)
	let mT = $state('Uniform')
	let user = $state(null)

	supabase.auth.getUser().then(({ data }) => {
		user = data.user
	})

	async function logout() {
		await supabase.auth.signOut()
		location.reload()
	}
</script>

<div class="flex flex-col gap-4">
	<ul class="list bg-base-100 rounded-box shadow-md">
		<li class="list-row items-center">
			<div class="list-col-grow">
				<div class="text-base font-semibold tracking-wide">Player</div>
				<div class="text-xs font-light opacity-70">
					{user?.email}
				</div>
			</div>
			<button class="btn btn-error btn-soft btn-sm" on:click={logout}
				>Logout</button>
		</li>
	</ul>
</div>
