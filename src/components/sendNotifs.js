import * as EpnsAPI from "@epnsproject/sdk-restapi";
import * as ethers from "ethers";

const PK = process.env.REACT_APP_PRIVATE_KEY; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async (t_amount, t_sender, receivers) => {
  const receiversAddress = Object.values(receivers);
  const finalReceiver = [];
  receiversAddress.forEach((e) => {
    finalReceiver.push(`eip155:42:${e}`);
  });
  console.log(finalReceiver);

  try {
    const apiResponse = await EpnsAPI.payloads.sendNotification({
      signer,
      type: 4, // subset
      identityType: 2, // direct payload
      notification: {
        title: `New Payment Request from ${t_sender}`,
        body: `Payment for ${t_amount / 1000000000000000000}`,
      },
      payload: {
        title: `New Payment Request from ${t_sender}`,
        body: `This is an automated message`,
        cta: "https://websidyn.com",
        img: "",
      },
      recipients: finalReceiver, // recipients addresses
      channel: "eip155:42:0xb44a29524433dBC639C35124459c741bC241d4f4", // your channel address
      env: "staging",
    });
    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
  // apiResponse?.status === 204, if sent successfully!
};

export default sendNotification;
