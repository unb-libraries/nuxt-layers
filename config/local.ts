import { defu } from 'defu'
import devConfig from './dev'

export default defu({
  runtimeConfig: {
    session: {
      cookie: {
        secure: false,
      },
      password: `incredibly-secure-secret-nobody-will-guess`,
    },
  },
}, devConfig)
