"use client";

import { useState } from "react";
import {
  ChefHat,
  Sparkles,
  Heart,
  Filter,
  Moon,
  Sun,
  X,
  BookOpen,
  ShoppingCart,
  Timer,
  Utensils,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import IngredientInput from "./IngredientInput";
import FilterPanel from "./FilterPanel";
import SavedRecipes from "./SavedRecipes";
import ShoppingList from "./ShoppingList";
import CookingTimer from "./CookingTimer";
import { generateRecipes } from "../utils/recipeGenerator";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Badge from "./ui/Badge";
import Tabs from "./ui/Tabs";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: "",
    cookingTime: "",
    dietary: [],
    cuisine: "",
  });
  const [savedRecipes, setSavedRecipes] = useLocalStorage("saved-recipes", []);
  const [shoppingList, setShoppingList] = useLocalStorage("shopping-list", []);
  const [activeTab, setActiveTab] = useState("generate");
  const { theme, toggleTheme } = useTheme();

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    try {
      const generatedRecipes = await generateRecipes(ingredients, filters);
      setRecipes(generatedRecipes);
      setActiveTab("recipes");
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipe) => {
    const isAlreadySaved = savedRecipes.some((saved) => saved.id === recipe.id);
    if (!isAlreadySaved) {
      setSavedRecipes([
        ...savedRecipes,
        { ...recipe, savedAt: new Date().toISOString() },
      ]);
    }
  };

  const handleAddToShoppingList = (ingredients) => {
    const newItems = ingredients.map((ingredient) => ({
      id: Date.now() + Math.random(),
      name: ingredient,
      checked: false,
      addedAt: new Date().toISOString(),
    }));
    setShoppingList([...shoppingList, ...newItems]);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      !filters.difficulty || recipe.difficulty === filters.difficulty;
    const matchesTime =
      !filters.cookingTime ||
      recipe.cookingTime <= Number.parseInt(filters.cookingTime);
    const matchesDietary =
      filters.dietary.length === 0 ||
      filters.dietary.every((diet) => recipe.dietary.includes(diet));
    const matchesCuisine =
      !filters.cuisine || recipe.cuisine === filters.cuisine;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesTime &&
      matchesDietary &&
      matchesCuisine
    );
  });

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-orange-50 to-red-50 ${
        theme === "dark" ? "dark from-gray-900 to-gray-800" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AI Recipe Generator
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Transform your ingredients into delicious recipes
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
          <Tabs.List className="grid w-full grid-cols-5">
            <Tabs.Trigger value="generate" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate
            </Tabs.Trigger>
            <Tabs.Trigger value="recipes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Recipes ({recipes.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Saved ({savedRecipes.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="shopping" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Shopping ({shoppingList.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="timer" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Timer
            </Tabs.Trigger>
          </Tabs.List>

          {/* Generate Tab */}
          <Tabs.Content value="generate" className="space-y-6">
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  What ingredients do you have?
                </Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <IngredientInput
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                />

                {ingredients.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {ingredient}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() =>
                              setIngredients(
                                ingredients.filter((_, i) => i !== index)
                              )
                            }
                          />
                        </Badge>
                      ))}
                    </div>

                    <FilterPanel filters={filters} setFilters={setFilters} />

                    <Button
                      onClick={handleGenerateRecipes}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Generating Recipes...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Recipes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Quick Start Suggestions */}
            <Card>
              <Card.Header>
                <Card.Title>Quick Start Ideas</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    {
                      name: "Pasta Night",
                      ingredients: ["pasta", "tomatoes", "garlic", "basil"],
                    },
                    {
                      name: "Breakfast",
                      ingredients: ["eggs", "bread", "butter", "milk"],
                    },
                    {
                      name: "Healthy Bowl",
                      ingredients: ["quinoa", "avocado", "spinach", "lemon"],
                    },
                    {
                      name: "Comfort Food",
                      ingredients: ["chicken", "potatoes", "onions", "herbs"],
                    },
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-start bg-transparent"
                      onClick={() => setIngredients(suggestion.ingredients)}
                    >
                      <span className="font-medium">{suggestion.name}</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {suggestion.ingredients.join(", ")}
                      </span>
                    </Button>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </Tabs.Content>

          {/* Recipes Tab */}
          <Tabs.Content value="recipes" className="space-y-6">
            {recipes.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            )}

            {showFilters && (
              <Card>
                <Card.Content className="pt-6">
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </Card.Content>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onView={() => setSelectedRecipe(recipe)}
                  onSave={() => handleSaveRecipe(recipe)}
                  onAddToShoppingList={() =>
                    handleAddToShoppingList(recipe.ingredients)
                  }
                  isSaved={savedRecipes.some((saved) => saved.id === recipe.id)}
                />
              ))}
            </div>

            {recipes.length === 0 && (
              <Card>
                <Card.Content className="text-center py-12">
                  <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No recipes yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Add some ingredients and generate your first recipe!
                  </p>
                  <Button onClick={() => setActiveTab("generate")}>
                    Start Cooking
                  </Button>
                </Card.Content>
              </Card>
            )}
          </Tabs.Content>

          {/* Saved Recipes Tab */}
          <Tabs.Content value="saved">
            <SavedRecipes
              savedRecipes={savedRecipes}
              setSavedRecipes={setSavedRecipes}
              onView={setSelectedRecipe}
              onAddToShoppingList={handleAddToShoppingList}
            />
          </Tabs.Content>

          {/* Shopping List Tab */}
          <Tabs.Content value="shopping">
            <ShoppingList
              shoppingList={shoppingList}
              setShoppingList={setShoppingList}
            />
          </Tabs.Content>

          {/* Timer Tab */}
          <Tabs.Content value="timer">
            <CookingTimer />
          </Tabs.Content>
        </Tabs>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onSave={() => handleSaveRecipe(selectedRecipe)}
            onAddToShoppingList={() =>
              handleAddToShoppingList(selectedRecipe.ingredients)
            }
            isSaved={savedRecipes.some(
              (saved) => saved.id === selectedRecipe.id
            )}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
