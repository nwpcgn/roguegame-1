import { createRouter } from 'sv-router'
import View1 from './routes/View1.svelte'
import View2 from './routes/View2.svelte'
import View3 from './routes/View3.svelte'
export const { p, navigate, isActive, route } = createRouter({
	'/': View1,
	'/v1': View1,
	'/v2': View2,
	'/v3': View3
})
