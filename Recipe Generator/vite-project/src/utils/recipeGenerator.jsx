// Mock AI recipe generator for demo purposes
// In a real app, you would integrate with OpenAI API or similar service
import { getImageForRecipe } from './foodImages';

export const generateRecipes = async (ingredients, filters) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate mock recipes based on ingredients
  const mockRecipes = [
    {
      id: 1,
      title: `${ingredients[0] || "Ingredient"} Stir Fry`,
      description:
        "A quick and healthy stir fry packed with fresh ingredients and bold flavors.",
      difficulty: "Easy",
      cookingTime: 20,
      servings: 4,
      cuisine: "Asian",
      dietary: ["Gluten-Free"],
      rating: 4.5,
      ingredients: ingredients
        .map((ing) => `1 cup ${ing}`)
        .concat([
          "2 tbsp soy sauce",
          "1 tbsp olive oil",
          "Salt and pepper to taste",
        ]),
      instructions: [
        "Heat oil in a large pan or wok over high heat",
        "Add ingredients and stir fry for 5-7 minutes",
        "Season with soy sauce, salt, and pepper",
        "Serve hot over rice or noodles",
      ],
      nutrition: {
        calories: 280,
        protein: 15,
        carbs: 35,
        fat: 8,
      },
      tips: [
        "Keep ingredients moving in the pan for even cooking",
        "Have all ingredients prepped before you start cooking",
      ],
      image: getImageForRecipe(`${ingredients[0] || "Ingredient"} Stir Fry`),
    },
    {
      id: 2,
      title: `Hearty ${ingredients[0] || "Ingredient"} Soup`,
      description: "A comforting and nutritious soup perfect for any season.",
      difficulty: "Easy",
      cookingTime: 45,
      servings: 6,
      cuisine: "American",
      dietary: ["Vegetarian"],
      rating: 4.3,
      ingredients: ingredients
        .map((ing) => `2 cups ${ing}`)
        .concat([
          "4 cups vegetable broth",
          "1 onion diced",
          "Salt and herbs to taste",
        ]),
      instructions: [
        "Sauté onion in a large pot until translucent",
        "Add main ingredients and broth",
        "Simmer for 30-40 minutes until tender",
        "Season to taste and serve hot",
      ],
      nutrition: {
        calories: 220,
        protein: 12,
        carbs: 28,
        fat: 6,
      },
      tips: [
        "Let flavors develop by simmering slowly",
        "Taste and adjust seasoning at the end",
      ],
      image: getImageForRecipe(`Hearty ${ingredients[0] || "Ingredient"} Soup`),
    },
    {
      id: 3,
      title: `Grilled ${ingredients[0] || "Ingredient"} Bowl`,
      description: "A healthy and colorful bowl packed with grilled goodness.",
      difficulty: "Medium",
      cookingTime: 30,
      servings: 2,
      cuisine: "Mediterranean",
      dietary: ["Keto", "Low-Carb"],
      rating: 4.7,
      ingredients: ingredients
        .map((ing) => `1 cup ${ing}`)
        .concat(["2 tbsp olive oil", "1 lemon juiced", "Mixed herbs"]),
      instructions: [
        "Preheat grill to medium-high heat",
        "Marinate ingredients in olive oil and lemon",
        "Grill for 15-20 minutes, turning occasionally",
        "Serve in bowls with fresh herbs",
      ],
      nutrition: {
        calories: 320,
        protein: 25,
        carbs: 15,
        fat: 18,
      },
      tips: [
        "Don't overcook to maintain texture",
        "Let ingredients rest after grilling",
      ],
      image: getImageForRecipe(`Grilled ${ingredients[0] || "Ingredient"} Bowl`),
    },
    {
      id: 4,
      title: `Creamy ${ingredients[0] || "Ingredient"} Pasta`,
      description:
        "Rich and creamy pasta dish that's comfort food at its finest.",
      difficulty: "Medium",
      cookingTime: 25,
      servings: 4,
      cuisine: "Italian",
      dietary: ["Vegetarian"],
      rating: 4.6,
      ingredients: ingredients
        .map((ing) => `1 cup ${ing}`)
        .concat([
          "12 oz pasta",
          "1 cup heavy cream",
          "Parmesan cheese",
          "Garlic",
        ]),
      instructions: [
        "Cook pasta according to package directions",
        "Sauté garlic and main ingredients",
        "Add cream and simmer until thickened",
        "Toss with pasta and serve with cheese",
      ],
      nutrition: {
        calories: 450,
        protein: 18,
        carbs: 55,
        fat: 20,
      },
      tips: [
        "Don't let cream boil to prevent curdling",
        "Save pasta water for thinning sauce",
      ],
      image: getImageForRecipe(`Creamy ${ingredients[0] || "Ingredient"} Pasta`),
    },
    {
      id: 5,
      title: `Spicy ${ingredients[0] || "Ingredient"} Tacos`,
      description: "Flavorful and spicy tacos with a perfect kick of heat.",
      difficulty: "Easy",
      cookingTime: 15,
      servings: 3,
      cuisine: "Mexican",
      dietary: ["Gluten-Free"],
      rating: 4.4,
      ingredients: ingredients
        .map((ing) => `1 cup ${ing}`)
        .concat(["Corn tortillas", "Lime", "Cilantro", "Hot sauce", "Onion"]),
      instructions: [
        "Heat tortillas in a dry pan",
        "Cook main ingredients with spices",
        "Assemble tacos with toppings",
        "Serve with lime wedges",
      ],
      nutrition: {
        calories: 290,
        protein: 20,
        carbs: 30,
        fat: 10,
      },
      tips: ["Warm tortillas for better flavor", "Don't overfill the tacos"],
      image: getImageForRecipe(`Spicy ${ingredients[0] || "Ingredient"} Tacos`),
    },
    {
      id: 6,
      title: `Baked ${ingredients[0] || "Ingredient"} Casserole`,
      description: "A hearty baked casserole perfect for family dinners.",
      difficulty: "Medium",
      cookingTime: 60,
      servings: 8,
      cuisine: "American",
      dietary: ["Dairy-Free"],
      rating: 4.2,
      ingredients: ingredients
        .map((ing) => `2 cups ${ing}`)
        .concat(["Breadcrumbs", "Vegetable broth", "Herbs", "Olive oil"]),
      instructions: [
        "Preheat oven to 375°F",
        "Layer ingredients in baking dish",
        "Top with breadcrumbs and herbs",
        "Bake for 45-50 minutes until golden",
      ],
      nutrition: {
        calories: 310,
        protein: 16,
        carbs: 40,
        fat: 12,
      },
      tips: [
        "Cover with foil if browning too quickly",
        "Let rest 10 minutes before serving",
      ],
      image: getImageForRecipe(`Baked ${ingredients[0] || "Ingredient"} Casserole`),
    },
    {
      id: 7,
      title: `Fresh ${ingredients[0] || "Ingredient"} Salad`,
      description: "A refreshing and nutritious salad bursting with flavors.",
      difficulty: "Easy",
      cookingTime: 10,
      servings: 4,
      cuisine: "Mediterranean",
      dietary: ["Vegan", "Gluten-Free"],
      rating: 4.8,
      ingredients: ingredients
        .map((ing) => `2 cups ${ing}`)
        .concat(["Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil", "Balsamic vinegar"]),
      instructions: [
        "Wash and prepare all vegetables",
        "Combine ingredients in a large bowl",
        "Drizzle with olive oil and balsamic",
        "Toss gently and serve immediately",
      ],
      nutrition: {
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 10,
      },
      tips: [
        "Use fresh, seasonal ingredients",
        "Don't overdress the salad",
      ],
      image: getImageForRecipe(`Fresh ${ingredients[0] || "Ingredient"} Salad`),
    },
    {
      id: 8,
      title: `Aromatic ${ingredients[0] || "Ingredient"} Curry`,
      description: "A fragrant and flavorful curry with rich spices.",
      difficulty: "Medium",
      cookingTime: 40,
      servings: 6,
      cuisine: "Indian",
      dietary: ["Vegetarian"],
      rating: 4.6,
      ingredients: ingredients
        .map((ing) => `2 cups ${ing}`)
        .concat(["Coconut milk", "Curry spices", "Onion", "Garlic", "Ginger"]),
      instructions: [
        "Sauté onions, garlic, and ginger",
        "Add spices and main ingredients",
        "Simmer in coconut milk until tender",
        "Serve with rice or naan bread",
      ],
      nutrition: {
        calories: 350,
        protein: 14,
        carbs: 45,
        fat: 16,
      },
      tips: [
        "Toast spices for enhanced flavor",
        "Adjust heat level to preference",
      ],
      image: getImageForRecipe(`Aromatic ${ingredients[0] || "Ingredient"} Curry`),
    },
    {
      id: 9,
      title: `Gourmet ${ingredients[0] || "Ingredient"} Pizza`,
      description: "A delicious homemade pizza with fresh toppings.",
      difficulty: "Medium",
      cookingTime: 35,
      servings: 4,
      cuisine: "Italian",
      dietary: ["Vegetarian"],
      rating: 4.5,
      ingredients: ingredients
        .map((ing) => `1 cup ${ing}`)
        .concat(["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Fresh basil"]),
      instructions: [
        "Preheat oven to 450°F",
        "Roll out pizza dough",
        "Add sauce, cheese, and toppings",
        "Bake for 15-20 minutes until golden",
      ],
      nutrition: {
        calories: 380,
        protein: 16,
        carbs: 50,
        fat: 14,
      },
      tips: [
        "Preheat pizza stone for crisp crust",
        "Don't overload with toppings",
      ],
      image: getImageForRecipe(`Gourmet ${ingredients[0] || "Ingredient"} Pizza`),
    },
    {
      id: 10,
      title: `Juicy ${ingredients[0] || "Ingredient"} Burger`,
      description: "A mouthwatering burger with fresh ingredients and bold flavors.",
      difficulty: "Easy",
      cookingTime: 20,
      servings: 2,
      cuisine: "American",
      dietary: ["Gluten-Free"],
      rating: 4.7,
      ingredients: ingredients
        .map((ing) => `1 cup ${ing}`)
        .concat(["Burger buns", "Lettuce", "Tomato", "Cheese", "Special sauce"]),
      instructions: [
        "Form patties with main ingredients",
        "Grill or pan-fry until cooked through",
        "Assemble burgers with toppings",
        "Serve with fries or salad",
      ],
      nutrition: {
        calories: 420,
        protein: 25,
        carbs: 35,
        fat: 22,
      },
      tips: [
        "Don't overwork the patty mixture",
        "Let burgers rest before serving",
      ],
      image: getImageForRecipe(`Juicy ${ingredients[0] || "Ingredient"} Burger`),
    },
  ];

  // Apply filters
  let filteredRecipes = mockRecipes;

  if (filters.difficulty) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.difficulty === filters.difficulty
    );
  }

  if (filters.cookingTime) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.cookingTime <= Number.parseInt(filters.cookingTime)
    );
  }

  if (filters.cuisine) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.cuisine === filters.cuisine
    );
  }

  if (filters.dietary.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      filters.dietary.some((diet) => recipe.dietary.includes(diet))
    );
  }

  return filteredRecipes.slice(0, 10); // Return max 10 recipes
};
