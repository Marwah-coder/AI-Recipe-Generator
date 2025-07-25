"use client";

import {
  Heart,
  Clock,
  Users,
  Star,
  ShoppingCart,
  Share2,
  Printer,
  ChefHat,
  X,
} from "lucide-react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const RecipeModal = ({
  recipe,
  onClose,
  onSave,
  onAddToShoppingList,
  isSaved,
}) => {
  if (!recipe) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={!!recipe}
      onClose={onClose}
      className="max-w-4xl max-h-[90vh] overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onSave}>
            <Heart
              className={`h-4 w-4 ${
                isSaved ? "fill-current text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddToShoppingList()}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
        <div className="space-y-6">
          {/* Recipe Image and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={
                  recipe.image ||
                  `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                    recipe.title
                  )}`
                }
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {recipe.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{recipe.cookingTime} minutes</p>
                    <p className="text-sm text-gray-500">Cooking time</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{recipe.servings} servings</p>
                    <p className="text-sm text-gray-500">Serves</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <div>
                    <p className="font-medium">{recipe.rating}/5</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{recipe.difficulty}</p>
                    <p className="text-sm text-gray-500">Difficulty</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{recipe.cuisine}</Badge>
                {recipe.dietary.map((diet, index) => (
                  <Badge key={index} variant="outline">
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Nutritional Information */}
          {recipe.nutrition && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Nutritional Information (per serving)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      {recipe.nutrition.calories}
                    </p>
                    <p className="text-sm text-gray-500">Calories</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {recipe.nutrition.protein}g
                    </p>
                    <p className="text-sm text-gray-500">Protein</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {recipe.nutrition.carbs}g
                    </p>
                    <p className="text-sm text-gray-500">Carbs</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {recipe.nutrition.fat}g
                    </p>
                    <p className="text-sm text-gray-500">Fat</p>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200 dark:border-gray-700" />
            </>
          )}

          {/* Ingredients and Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div>
                <h3 className="text-lg font-semibold mb-3">Chef's Tips</h3>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;
