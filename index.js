import fetch from "node-fetch";
import http from "http";
http
  .createServer(function (req, res) {
    // console.log(`Just got a request at ${req.url}!`)
    // res.write('Yo!');
    // res.end();

    const YELP_API_KEY =
      "w8uQv046531_c25osdbeZm3kkvK3G5I5DmK9bmIeeuJuOatLqVrV9KVWss7EaFvbW3cYkcricx9ItFTWnWH7LfC-Xvs4F-ldIwz4x_Re9eaJrXJkxIVRl8ryAecRX3Yx";

    const yelpAPI_URL =
      "https://api.yelp.com/v3/businesses/C6zSWewDs7-yaATp1Fh0BA/reviews";

    fetch(yelpAPI_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        "Contenct-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result.reviews));
      })
      .catch((error) => {
        console.log("error", error);
      });
  })
  .listen(process.env.PORT || 3000);
