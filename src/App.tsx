import ReadContract from './ReadContract'
import SendTransaction from './SendTransaction'
import SwitchChain from './SwitchChain'
import Wallet from './Wallet'

function App() {

  return (
    <>
      <Wallet />
      <SwitchChain/>
      <SendTransaction/>
      <ReadContract/>
    </>
  )

}
export default App
