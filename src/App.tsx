import { KeyStateProvider } from './KeyStateProvider'
import { Layout } from './Layout'

function App() {
  return (
    <>
      <KeyStateProvider>
        <Layout />
      </KeyStateProvider>
    </>
  )
}

export default App
