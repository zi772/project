import { useEth } from "../contexts/EthContext";
import { useState } from "react";

function WarrantyForm() {
  const { web3, contract } = useEth();
  const [buyerAddress, setBuyerAddress] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [startDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');

  const setExpiry = years => {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + years);
    setExpiryDate(expiry.toISOString().split('T')[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];

      await contract.methods.sendWarranty(buyerAddress, startDate, expiryDate, productInfo)
        .send({ from: senderAddress });

      console.log('Warranty sent successfully!');
    } catch (error) {
      console.error('Failed to send warranty:', error);
    }
  };

  const handleContractSubmit = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];

      await contract.methods.submitContract()
        .send({ from: senderAddress });

      console.log('Contract submitted successfully!');
    } catch (error) {
      console.error('Failed to submit contract:', error);
    }
  };

  return (
    <div className="container">
      <h2>Send Warranty</h2>
      <form onSubmit={handleSubmit} id="warrantyForm">
        
            <label htmlFor="buyerAddress">Customer Address</label>
            <input type="text" id="buyerAddress" name="buyerAddress" value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} required/>
    
            <label htmlFor="productInfo">Product Info</label>
            <input type="text" id="productInfo" name="productInfo" value={productInfo} onChange={e => setProductInfo(e.target.value)} required/>
    
            <label htmlFor="startDate">Start Date</label>
            <input type="text" id="startDate" name="startDate" value={startDate} readOnly/>
    
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" id="expiryDate" name="expiryDate" value={expiryDate} readOnly/>
            <div>
                <button type="button" onClick={() => setExpiry(1)}>1 Year</button>
                <button type="button" onClick={() => setExpiry(2)}>2 Years</button>
                <button type="button" onClick={() => setExpiry(5)}>5 Years</button>
                <button type="button" onClick={() => setExpiry(10)}>10 Years</button>
            </div>
            <br/>
        

        <button type="submit">Send Warranty</button>
      </form>
      <br />
      <button type="button" onClick={handleContractSubmit}>Submit Contract</button>
    </div>
  );
}

export default WarrantyForm;