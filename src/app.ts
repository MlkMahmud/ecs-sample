import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

import router from './routes';

const app = new Koa();

app.on('error', (err, ctx) => {
  console.error(err);
  console.error(ctx);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
    ctx.app.emit('error', err, ctx);
  }
});

app.use(helmet());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
