import { WagmiConfig, createClient, useAccount } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { useEffect, useState } from "react";
import MyModal from "./components/modal";

const alchemyId = process.env.ALCHEMY_ID;
const client = createClient(
  getDefaultClient({
    appName: "Splitzy",
    alchemyId,
  })
);

const Hero = () => {
  const [transactionsData, setTransactionData] = useState([]);
  const { address } = useAccount();
  const url = `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_54cbd696cf284627b6382f6832c`;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setTransactionData(json["data"]["items"]);
        console.log(json["data"]["items"]);
      });
  }, []);
  return (
    <div>
      {transactionsData.map((transaction) =>
        transaction.value !== "0" ? (
          <div className="flex">
            <MyModal
              t_id={transaction.tx_hash}
              t_amount={transaction.value}
              t_sender={address}
            />{" "}
            <h1>
              {transaction.to_address} -{" "}
              {transaction.value / 1000000000000000000}{" "}
            </h1>
          </div>
        ) : (
          <h1></h1>
        )
      )}
    </div>
  );
};

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Hero />
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default App;
