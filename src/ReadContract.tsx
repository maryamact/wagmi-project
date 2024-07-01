
import { useReadContract, useReadContracts, type BaseError } from 'wagmi'
import { abi } from './abi'
import { useState } from 'react';


function ReadContract() {
    const [address, setAddress] = useState<`0x${string}`>('0xcBb7a8147c3880f1A832cf25E718EB047F196314');

    const { data, isError, isPending, isSuccess, error } = useReadContracts({
        contracts: [{
            abi,
            address: '0xeFF3882b6c20f0EBD975a89c2698e56769f8d86c',
            functionName: 'balanceOf',
            args: [address],
        }, {
            abi,
            address: '0xeFF3882b6c20f0EBD975a89c2698e56769f8d86c',
            functionName: 'totalSupply',
        },
            {
                ...abi,
                address: '0xeFF3882b6c20f0EBD975a89c2698e56769f8d86c',
                functionName: 'ownerOf',
                // args: [69n],
            },

        ]

    })

    // const { data: balance, isError, isLoading, isSuccess,error } = useReadContract({
    //     abi,
    //     address: '0xeFF3882b6c20f0EBD975a89c2698e56769f8d86c',
    //     functionName: 'balanceOf',
    //     args: [address],
    // })
    const [balance, totalSupply, owner] = data || []
    console.log(data)
    console.log(isError)
    console.log(error)
    return (
        <div>
            <h2>Read Contract</h2>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value as `0x${string}`)}
                placeholder="Enter address"
            />
            {isPending && <p>Loading...</p>}
            {isError && <p>
                Error: {(error as BaseError).shortMessage || error.message}
            </p>}
            {
                data?.filter((d) => d.error).map((item, index) => (
                    <p key={index}>
                        Error: {(item?.error as BaseError).shortMessage || item?.error?.message}
                    </p>
                ))
            }
            {isSuccess && <p>Balance: {balance?.result?.toString()}</p>}
            {isSuccess && <p>Total Supply: {totalSupply?.result?.toString()}</p>}
            {isSuccess && <p>Owner : {owner?.result?.toString()}</p>}
        </div>
    )
}


export default ReadContract