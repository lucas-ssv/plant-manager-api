import { setupApp } from '@/main/config'
import env from '@/main/config/env'

const app = setupApp()

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.PORT}`)
})
