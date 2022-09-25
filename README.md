# ETH-SPLIT

Eth-Split is a transaction splitter for any EVM chain transaction that lets users connect their wallet (Metamask, Wallet Connect and more) and seamlessly select a previous transaction made by the user and create bill requests from any other ENS/Address.

Connectkit Library is used to provide easy access to any mobile wallet thereby improving UX. Covalent API is used to fetch Blockchain data. The app immediately fetches all the send type transactions the connect user wallet has done.

ENS Resolvers are also used to simplify user experience within the app to create the bill splitting.

Flow:
The user will be prompted to connect their wallet and after that, the transactions are fetched using Covalent API. Then the user can pick a transaction and type in any number of input addresses to split the bill with. The bill value can be split equally or separately.
As soon as the request is created, Push notification is sent to the requested addresses to make sure the user pays the bill.

The dashboard also lists down the bills pending for a selected user. The user can pay the outstanding bill in a single click!
