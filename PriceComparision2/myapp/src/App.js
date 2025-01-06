import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from 'axios'
// Constants

const UNISWAP_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH Address
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC Address
const ALCHEMY_API = `https://eth-mainnet.alchemyapi.io/v2/${rocess.env.MY_API_KEY}`; // Replace with your Alchemy URL

// ethers.js provider
const provider = new ethers.JsonRpcProvider(ALCHEMY_API);

function App() {
  const [wethAmount, setWethAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [numberDisplay, setNumberDisplay] = useState()
  const [list, setList] = useState([])


  useEffect(() => {
    axios.get('http://localhost:5000/getPrices').then((resp) => {
        setList(resp.data)
        // console.log(resp.data)
    })
  },[])


   const handleConvert = async () => {
    if (!wethAmount || parseFloat(wethAmount) <= 0) {
      setError("Please enter a valid WETH amount.");
      return;
    }
    setError("");
    setLoading(true);
    setNumberDisplay(wethAmount)

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
      setUsdcAmount(usdcValue);
      
    } catch (err) {
      console.error(err);
      setError("Error fetching conversion rate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const registerDatabase = () => {
    axios.post('http://localhost:5000/register', {
      priceWeth: numberDisplay,
      priceUsdc: usdcAmount,
    })
    .then(result => window.alert('Saved with success'))
    .catch(err =>console.log(err))
  }

  return (
    <div className="App">
       <div className="divInput">
          <input
            placeholder="Amount in WETH"
            value={wethAmount}
            onChange={(e) => setWethAmount(e.target.value)}></input>
           <button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert"}
          </button>
          {error && <p className="error">{error}</p>}
        {usdcAmount && !error && (
          <div className="column">
            <p>{numberDisplay} WETH = {usdcAmount} USDC</p>
            <button onClick={registerDatabase}>Save in Database</button>
          </div>
          
        )}
          
       </div>
       <div className="divList">
              {list.map((el,i)=> {
                return(<div className="elementList" key={i}>
                  <p>WETH = {el.priceWeth}</p>
                  <p>USDC = {el.priceUsdc}</p>
                  <p>DATE = {el.date}</p>
                </div>)
              })}
       </div>
    </div>
  );
}

export default App;
