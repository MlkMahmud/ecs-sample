import app from './app'

const {
  NODE_ENV = '',
  PORT = ''
} = process.env;

const env = NODE_ENV !== '' ? NODE_ENV : 'development';
const port = PORT !== '' ? PORT : '3000';

void (async function main () {
  try {
    app.listen(port, () => {
      console.log(`> Ready on localhost:${port} - env ${env}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
