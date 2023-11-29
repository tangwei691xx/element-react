import { useState } from 'react'
import Button from './components/Button'

const App = () => {
  const [tos, setTo] = useState(false)
  const keu = () => {
    setTo(true)
    setTimeout(() => {
      setTo(false)
    }, 3000)
  }

  return (
    <>
      <Button onClick={keu} loading={tos}>
        22
      </Button>
    </>
  )
}
export default App
