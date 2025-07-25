"use client";

import {
  Heart,
  Clock,
  Users,
  Star,
  Eye,
  ShoppingCart,
  Share2,
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const RecipeCard = ({
  recipe,
  onView,
  onSave,
  onAddToShoppingList,
  isSaved,
}) => {
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
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${recipe.title}\n${recipe.description}\n${window.location.href}`
      );
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(
              recipe.title
            )}`;
          }}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge className={getDifficultyColor(recipe.difficulty)}>
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 flex gap-1">
          {recipe.dietary.map((diet, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {diet}
            </Badge>
          ))}
        </div>
      </div>

      <Card.Header className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{recipe.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {recipe.description}
        </p>
      </Card.Header>

      <Card.Content className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs">{recipe.cuisine}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onView} className="flex-1" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View Recipe
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            className={isSaved ? "text-red-500 border-red-200" : ""}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
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
        </div>
      </Card.Content>
    </Card>
  );
};

export default RecipeCard;
