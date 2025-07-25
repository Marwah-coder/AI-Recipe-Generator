// Food images for different recipe types
export const foodImages = {
  // Stir Fry images
  stirFry: [
    "/src/assets/asian-stir-fry-1.jpg",
    "/src/assets/stir-fry-2-3.jpg", 
    "/src/assets/asian-stir-fry-1.jpg" // Using the same image as fallback
  ],
  
  // Soup images
  soup: [
    "/src/assets/chickenSoup.jpg",
    "/src/assets/vegetable-soup.jpg",
    "/src/assets/tamato soup.jpg"
  ],
  
  // Bowl images
  bowl: [
    "/src/assets/buddha-bowl-1-3.jpg",
    "/src/assets/grain-bowl.jpg",
    "/src/assets/buddha-bowl-1-3.jpg" // Using the same image as fallback
  ],
  
  // Pasta images
  pasta: [
    "/src/assets/creamy-pasta.jpg",
    "/src/assets/tamato pasta.jpg",
    "/src/assets/pesto pasta.jpg"
  ],
  
  // Taco images
  tacos: [
    "/src/assets/Fish tacos.jpg",
    "/src/assets/Vegetable tacos.jpg",
    "/src/assets/Chicken tacos.jpg"
  ],
  
  // Casserole images
  casserole: [
    "/src/assets/Vegetable casserole.jpg",
    "/src/assets/Potato casserole.jpg",
    "/src/assets/Rice casserole.jpg"
  ],
  
  // Salad images
  salad: [
    "/src/assets/Garden salad.jpg",
    "/src/assets/Caesar salad.jpg",
    "/src/assets/Quinoa salad.jpg"
  ],
  
  // Curry images
  curry: [
    "/src/assets/Chicken curry.jpg",
    "/src/assets/Vegetable curry.jpg",
    "/src/assets/Lentil curry.jpg"
  ],
  
  // Pizza images
  pizza: [
    "/src/assets/Margherita pizza.jpg",
    "/src/assets/Vegetable pizza.jpg",
    "/src/assets/BBQ pizza.jpg"
  ],
  
  // Burger images
  burger: [
    "/src/assets/veggie-burger.jpg",
    "/src/assets/chicken burger.jpg",
    "/src/assets/bean burger.jpg"
  ]
};

// Function to get a random image for a recipe type
export const getRandomImage = (recipeType) => {
  const images = foodImages[recipeType] || foodImages.stirFry;
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

// Function to get image based on recipe title
export const getImageForRecipe = (title) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('stir fry') || lowerTitle.includes('stir-fry')) {
    return getRandomImage('stirFry');
  } else if (lowerTitle.includes('soup')) {
    return getRandomImage('soup');
  } else if (lowerTitle.includes('bowl')) {
    return getRandomImage('bowl');
  } else if (lowerTitle.includes('pasta')) {
    return getRandomImage('pasta');
  } else if (lowerTitle.includes('taco')) {
    return getRandomImage('tacos');
  } else if (lowerTitle.includes('casserole')) {
    return getRandomImage('casserole');
  } else if (lowerTitle.includes('salad')) {
    return getRandomImage('salad');
  } else if (lowerTitle.includes('curry')) {
    return getRandomImage('curry');
  } else if (lowerTitle.includes('pizza')) {
    return getRandomImage('pizza');
  } else if (lowerTitle.includes('burger')) {
    return getRandomImage('burger');
  } else {
    // Default to stir fry if no match
    return getRandomImage('stirFry');
  }
}; 