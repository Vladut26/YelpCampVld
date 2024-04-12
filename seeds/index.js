const mongoose = require("mongoose");
const cities = require("./cities")
const { places, descriptors } = require('./seedHelpers')
const Campground = require("../models/campground")

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            author: '660ec82e14534ae6a29540fe',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora illum obcaecati numquam quo mollitia ipsum consequuntur est aspernatur quam eum, modi earum repellendus repudiandae explicabo vitae magnam quidem quas nemo.",
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [

                {
                    url: 'https://res.cloudinary.com/dbqmhsnks/image/upload/v1712562652/YelpCamp/biu7qrxf1rdr50huizut.jpg',
                    filename: 'YelpCamp/rpprcmvcjhotauqnlvk7',
                },
                {
                    url: 'https://res.cloudinary.com/dbqmhsnks/image/upload/v1712563174/YelpCamp/odfdzwq4gfhdlisw4m8d.jpg',
                    filename: 'YelpCamp/ivgycizd6gybscyc2xgc',
                }

            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})