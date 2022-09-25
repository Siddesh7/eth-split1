import { WagmiConfig, createClient, useAccount } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { useEffect, useState } from "react";
import MyModal from "./components/modal";
import { Window, Launcher } from "@relaycc/receiver";

const alchemyId = process.env.ALCHEMY_ID;
const client = createClient(
  getDefaultClient({
    appName: "Splitzy",
    alchemyId,
  })
);
const revi = [
  {
    address: "0xt5he3f91bf1ab7fb845167d5be1rg5d34f8058a550",
    value: 0.22,
  },
  {
    address: "0x56eddb7aa87536c09ccc2793473599fd21a8b17f",
    value: 0.99,
  },
];

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
  useEffect(() => {
    fetch("http://localhost:9090")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  }, []);
  return (
    <div>
      {transactionsData.length > 0 && (
        <h1 className="text-[24px] text-[#f7f709] font-bold pt-[20px] ml-[20px]">
          Previous Transactions
        </h1>
      )}
      {transactionsData.map((transaction) =>
        transaction.value !== "0" ? (
          <div className="flex justify-between w-[70%] m-auto py-[20px]">
            <div className="flex">
              <h1 className="text-[22px] text-white mr-[10px]">
                Sent to{" "}
                <span className="text-[#f7f709]">{transaction.to_address}</span>
              </h1>
              <h1 className="text-[22px] ">
                for{" "}
                <span className="text-[#f7f709]">
                  {transaction.value / 1000000000000000000}
                </span>
              </h1>
            </div>
            <MyModal
              t_id={transaction.tx_hash}
              t_amount={transaction.value}
              t_sender={address}
            />
          </div>
        ) : (
          <h1></h1>
        )
      )}
      {transactionsData.length > 0 && (
        <>
          <h1 className="text-[24px] text-[#f7f709] font-bold pt-[20px] ml-[20px]">
            Payment Requests
          </h1>
          {revi.map((transaction) =>
            transaction.value !== "0" ? (
              <div className="flex justify-between w-[70%] m-auto py-[20px]">
                <div className="flex">
                  <h1 className="text-[22px] text-white mr-[10px]">
                    From{" "}
                    <span className="text-[#f7f709]">
                      {transaction.address}
                    </span>
                  </h1>
                  <h1 className="text-[22px] ">
                    for{" "}
                    <span className="text-[#f7f709]">{transaction.value}</span>
                  </h1>
                </div>
                <MyModal
                  t_id={transaction.tx_hash}
                  t_amount={transaction.value}
                  t_sender={address}
                />
              </div>
            ) : (
              <h1></h1>
            )
          )}
        </>
      )}
    </div>
  );
};

function Xmtp() {
  const { address } = useAccount();
  return (
    <div className="App">
      <Window />
      <Launcher wallet={address} />
    </div>
  );
}

const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <div className="bg-gray-300 bg-opacity-75 font-mono drop-shadow-2xl overflow-x-hidden">
          <div className="flex w-[85%] m-auto justify-between items-center font-bold py-[20px]">
            <div>
              <h2 className="text-[34px] font-['Nabla']">Eth-Split</h2>
              <span>Powered by EPNS, XMTP, COVALENT</span>
            </div>
            <ConnectKitButton />
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100vw] h-[100vh] overflow-x-hidden">
          <Hero />
        </div>

        <Xmtp />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default App;
