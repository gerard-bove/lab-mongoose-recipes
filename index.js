const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipi-app';

// Connection to the database "recipe-app"
const receta = {
  "title": "Asian Chicken",
  "level": "Amateur Chef",
  "ingredients": [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  "cuisine": "Asian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef LePapu"
}

mongoose
  .set('strictQuery', false)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(receta);
  })
  .then(() => {
    console.log(receta.title)
  })
  .then(() => {
      return Recipe.insertMany(data)
  })
  .then(() => {
    data.forEach(element => {
      console.log(element.title)
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("Carrot Cake removed successfully")
  })
  .then(() => {
    mongoose.connection.on("disconnected", ()=>console.log("se ha desconnectado la base de datos"))
        mongoose.connection.on("error", ()=>console.log("error en la base de datos"))
        process.on("SIGINT", ()=>{
            console.log("SIGINT ", process.pid);
            mongoose.disconnect();
            process.kill(process.pid);
        })
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
