const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());


app.get("/tokenPrice", async (req, res) => {
  const { query } = req;

  try {
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
     address: query.addressOne
    });

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo
    });

    const usdPrices = {
      tokenOne:responseOne.raw.usdPrice,
      tokenTwo:responseTwo.raw.usdPrice,
      ratio:responseOne.raw.usdPrice/responseTwo.raw.usdPrice
    }

    console.log(responseOne.raw);
    console.log(responseTwo.raw);

    return res.status(200).json({usdPrices});
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return res.status(500).json({ error: "Error fetching token prices" });
  }
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls on port ${port}`);
  });
});
