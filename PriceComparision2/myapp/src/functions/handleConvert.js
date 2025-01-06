const UNISWAP_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH Address
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC Address
const ALCHEMY_API = `https://eth-mainnet.alchemyapi.io/v2/PRw7jIh7yaoM8JmvkRUxNOjfJkCRzxk0`; // Replace with your Alchemy URL

// ethers.js provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_API);

const handleConvert = async (wethAmount) => {
  
  try {
    
    const contract = new ethers.Contract(
      UNISWAP_V2_ROUTER,
      [
        "function getAmountsOut(uint256 amountIn, address[] memory path) external view returns (uint256[] memory)"
      ],
      provider
    );

    const path = [WETH_ADDRESS, USDC_ADDRESS];
    const amountIn = ethers.parseEther(wethAmount.toString());

    const amountOut = await contract.getAmountsOut(  //The converting function
      amountIn,
      path,
    )

    const usdcValue = ethers.formatUnits(amountOut[1], 6); // Convert USDC from wei
    return usdcValue

  } catch (err) {
    console.error(err);
  } 
}
module.exports = handleConvert

