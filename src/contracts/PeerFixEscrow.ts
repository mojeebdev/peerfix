export const ESCROW_ABI = [
  {
    name: "createAndFund",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "problemId", type: "string" },
      { name: "expert", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "escrowId", type: "bytes32" }],
  },
  {
    name: "release",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "escrowId", type: "bytes32" }],
    outputs: [],
  },
  {
    name: "refund",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "escrowId", type: "bytes32" }],
    outputs: [],
  },
  {
    name: "dispute",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "escrowId", type: "bytes32" }],
    outputs: [],
  },
  {
    name: "getEscrowByProblem",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "problemId", type: "string" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "payer", type: "address" },
          { name: "expert", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "problemId", type: "string" },
        ],
      },
    ],
  },
  {
    name: "EscrowFunded",
    type: "event",
    inputs: [
      { name: "escrowId", type: "bytes32", indexed: true },
      { name: "problemId", type: "string", indexed: false },
      { name: "payer", type: "address", indexed: false },
      { name: "expert", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "EscrowReleased",
    type: "event",
    inputs: [
      { name: "escrowId", type: "bytes32", indexed: true },
      { name: "expert", type: "address", indexed: false },
      { name: "expertAmount", type: "uint256", indexed: false },
      { name: "fee", type: "uint256", indexed: false },
    ],
  },
] as const

export const USDC_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const

export const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS as `0x${string}`
export const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const
