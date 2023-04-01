import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = JSON.stringify({ message: 'Hello World 🙄' })
});

router.post('/', (ctx) => {
  const payload: Record<string, any> = ctx.request.body ?? {};
  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value === 'string') {
      payload[key] = value.toUpperCase();
    }
  });
  ctx.status = 200;
  ctx.body = JSON.stringify(payload);
});

router.get('/health', (ctx) => {
  ctx.status = 200;
});

export default router;
