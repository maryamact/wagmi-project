import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { formatUnits } from 'viem';

function Wallet() {

  const { address, isConnected } = useAccount();
  const account = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const balanceData = useBalance({ address });
  console.log(balanceData)


  return (
    <div>
      {isConnected ? (
        <>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <button onClick={() => connect({ connector: connectors[0] })}>Connect Wallet</button>
      )}
      {isConnected ? (
        <div>
          <h2>Wallet Information</h2>

          <p>Address: {address}</p>
          <p>wallet: {account.connector?.name}</p>
          <p>status: {account.status}</p>
          <p>chain: {account.chain?.name}</p>
          <p>nativeCurrency name:{account.chain?.nativeCurrency?.name}</p>
          {/* <p>nativeCurrency decimals:{account.chain?.nativeCurrency?.decimals}{" "}{account.chain?.nativeCurrency?.symbol}</p> */}
          <p>Balance: {balanceData.isSuccess && formatUnits(balanceData?.data!.value, balanceData?.data!.decimals)}</p>

        </div>
      ) : (
        connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
          // disabled={!connector.ready}
          >
            <img src={connector.icon} />
            {connector.name}
            {/* {isLoading && connector.id === pendingConnector?.id && ' (connecting)'} */}
          </button>
        ))
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
export default Wallet
