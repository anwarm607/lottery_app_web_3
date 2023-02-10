import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import lottery from "./lottery";
import web3 from "./web3";

function App() {
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);
  const onSubmit = async(ev) => {
    ev.preventDefault();

    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setMessage("Waiting for transaction to confirm...");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })
    setMessage("You have been entered into lottery. Good luck!")
    setValue(0);
  }

  useEffect(() => {
    lottery.methods.manager().call().then(res => {
      console.log(res)
    })
    lottery.methods.getAllPlayers().call().then(res => {
      setPlayers(res)
    })
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Lottery Contract</h2>
        {/* <p>
          This lottery contract is managed by {manager}. <br></br> */}
          {/* <br></br>
          There are currently {players.length} players in this round.{" "}
          <br></br> */}
          <br></br>
          {/* Lottery pot: {web3.utils.fromWei(this.state.balance, "ether")} ETH */}
        {/* </p> */}
        <hr />
        <form onSubmit={onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ETH to enter:</label>
            <input
              value={value}
              onChange={(event) => {
                setValue( event.target.value)
                }}
            />
          </div>
          <button>Submit</button>
        </form>
        <br></br>
        <br></br>
        <hr />
        <hr />
        <h1>{message}</h1>
        {
          players.map(it => {
            return <p>{it}</p>
          })
        }
      </div>
    </div>
  );
}

export default App;
