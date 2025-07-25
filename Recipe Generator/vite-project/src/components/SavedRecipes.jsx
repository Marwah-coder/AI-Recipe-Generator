"use client";

import { Heart, Trash2, Eye, ShoppingCart, Clock, Users } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const SavedRecipes = ({
  savedRecipes,
  setSavedRecipes,
  onView,
  onAddToShoppingList,
}) => {
  const handleRemove = (recipeId) => {
    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== recipeId));
  };

  if (savedRecipes.length === 0) {
    return (
      <Card>
        <Card.Content className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No saved recipes yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Save your favorite recipes to access them anytime!
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Saved Recipes ({savedRecipes.length})
          </Card.Title>
        </Card.Header>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={
                  recipe.image ||
                  `https://via.placeholder.com/400x200?text=${encodeURIComponent(
                    recipe.title
                  )}`
                }
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Saved {new Date(recipe.savedAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>

            <Card.Content className="p-4 space-y-3">
              <h3 className="font-semibold text-lg line-clamp-2">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {recipe.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cookingTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onView(recipe)}
                  size="sm"
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddToShoppingList(recipe.ingredients)}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(recipe.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
