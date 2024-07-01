import { useSwitchChain } from 'wagmi'

function SwitchChain() {
  const { chains, switchChain } = useSwitchChain()
  console.log(chains)
  return (
    <div>
      <h2>Switch Chain</h2>

      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          {chain.name}
        </button>
      ))}
    </div>
  )
}
export default SwitchChain
