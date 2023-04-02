/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Router from 'koa-router';
import fetch from 'cross-fetch';

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = { message: 'Hello World 🙄' };
});

router.post('/', (ctx) => {
  const payload: Record<string, any> = ctx.request.body ?? {};
  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value === 'string') {
      payload[key] = value.toUpperCase();
    }
  });
  ctx.status = 200;
  ctx.body = payload;
});

router.get('/health', (ctx) => {
  ctx.status = 200;
});

// Attempt to access public internet
router.get('/users', async (ctx) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=5');

  if (response.ok) {
    const { results: data } = await response.json();
    ctx.body = {
      success: true,
      data
    };
    return;
  }
  console.error(response.status);
  ctx.body = {
    success: false,
    message: response.statusText
  };
});

export default router;
