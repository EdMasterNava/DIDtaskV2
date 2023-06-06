import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { wagmiAbi } from './abi'
import { abi } from 'ERC20.json'


const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: abi,
  functionName: 'totalSupply',
})
// 69420n


const publicClient = createPublicClient({
  batch: {
    multicall: true, 
  },
  chain: mainnet,
  transport: http(),
})


const blockNumber = await client.getBlockNumber() 



const contract = getContract({ address, abi })

// The below will send a single request to the RPC Provider.
const [name, totalSupply, symbol, tokenUri, balance] = await Promise.all([
  contract.read.name(),
  contract.read.totalSupply(),
  contract.read.symbol(),
  contract.read.tokenURI([420n]),
  contract.read.balanceOf([address]),
])


console.log(data)
console.log(blockNumber)