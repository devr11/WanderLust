const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require('path');
const method = require("method-override")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}))
app.use(method("_method"))

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Working");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index", { allListings });
});

//New Route
app.get("/listings/new", (req, res)=>{
  res.render("listings/new")
})

//Show Route
app.get("/listings/:id", async (req, res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id)
  res.render("listings/show", {listing})
})

//Create Route
app.post("/listings", async (req, res)=>{
  // let {title, description, image, price, country, location} = req.body;
  const newListing = new Listing(req.body.listing);
  await newListing.save()
  res.redirect("/listings")
})

//Edit Route
app.get("/listings/:id/edit", async (req, res)=> {
  const {id} = req.params;
  const listing = await Listing.findById(id)
  res.render("listings/edit", {listing})
})

//Update Route
app.get("/listings/:id", async (req, res)=>{
  const {id} = req.params;
})

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
