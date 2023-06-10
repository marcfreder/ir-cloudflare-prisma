export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

import {
	error, // creates error Responses
	json, // creates JSON Responses
	Router, // the Router itself
	withParams
} from 'itty-router'

const router = Router()

router
	// GET a route, with a route param
	.get('/hello/:name', withParams, ({ name }) => ({ message: `Hello ${name} and welcome to Cloudflare Worker!` }))

	// return a 404 for anything else
	.all('*', () => error(404))

// Example showing Cloudflare module syntax
export default {
	fetch: (req: Request, env: Env, ctx: ExecutionContext) =>
		router
			.handle(req, env, ctx)
			.then(json) // turn any raw data into JSON
			.catch(error) // and catch any uncaught errors
}
