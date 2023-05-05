import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.get("/yelp-review", async (req, res) => {
  const result = await yelpReview(req.query.business_id);
  res.json(result);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const yelpReview = async (businessId) => {
  const yelpAPI_URL = `https://api.yelp.com/v3/businesses/${businessId}/reviews`;
  return await fetch(yelpAPI_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => res.reviews)
    .catch((error) => {
      console.log("error", error);
    });
};
