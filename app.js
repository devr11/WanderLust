const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

app.set("view engine",)

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Working")
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("index", { allListings })
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Meerut, UP",
//     country: "India",
//   });

//   await sampleListing
//     .save()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
//     res.send("Successfully saved")
// });


app.listen(3000);
