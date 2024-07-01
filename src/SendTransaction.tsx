import { useSendTransaction, useWaitForTransactionReceipt, type BaseError } from 'wagmi'
import { parseEther } from 'viem'

function SendTransaction() {
  const { data: hash, sendTransaction, isPending, isError, error } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }
  return (
    <form onSubmit={submit}>
      <h2>Send Transaction </h2>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit" disabled={isPending}>{isPending ? 'Confirming...' : 'Send'}</button>
      {isError && <p>Transaction Error: {error.message}</p>}
      {isError && (
        <div>Short Error Message: {(error as BaseError).shortMessage || error.message}</div>
      )}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {hash && <p>Transaction Hash: {hash}</p>}
    </form>
  )
}
export default SendTransaction
