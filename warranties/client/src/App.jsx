import { EthProvider } from "./contexts/EthContext";
import Form from "./components/Form";

export default function App() {
  return (
    <EthProvider>
      <div id="App">
        
         <Form/>
         
      </div>
    </EthProvider>
  );
}


