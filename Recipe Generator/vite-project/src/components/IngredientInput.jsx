"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const COMMON_INGREDIENTS = [
  "chicken",
  "beef",
  "pork",
  "fish",
  "eggs",
  "milk",
  "cheese",
  "butter",
  "onion",
  "garlic",
  "tomatoes",
  "potatoes",
  "carrots",
  "bell peppers",
  "spinach",
  "broccoli",
  "mushrooms",
  "avocado",
  "lemon",
  "lime",
  "rice",
  "pasta",
  "bread",
  "flour",
  "olive oil",
  "salt",
  "pepper",
  "basil",
  "oregano",
  "thyme",
  "rosemary",
  "ginger",
  "cumin",
  "paprika",
];

const IngredientInput = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.length > 0) {
      const filtered = COMMON_INGREDIENTS.filter(
        (ingredient) =>
          ingredient.toLowerCase().includes(value.toLowerCase()) &&
          !ingredients.includes(ingredient)
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addIngredient = (ingredient) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient(inputValue.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add an ingredient (e.g., chicken, tomatoes, garlic)"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          onClick={() => addIngredient(inputValue.trim())}
          disabled={!inputValue.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">Suggestions:</span>
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900"
              onClick={() => addIngredient(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      )}

      {/* Popular ingredients */}
      {ingredients.length === 0 && (
        <div className="space-y-2">
          <span className="text-sm text-gray-500">Popular ingredients:</span>
          <div className="flex flex-wrap gap-2">
            {COMMON_INGREDIENTS.slice(0, 12).map((ingredient, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900"
                onClick={() => addIngredient(ingredient)}
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
