"use client";

import Label from "./ui/Label";
import Select from "./ui/Select";
import Checkbox from "./ui/Checkbox";
import Slider from "./ui/Slider";

const FilterPanel = ({ filters, setFilters }) => {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateDietary = (diet, checked) => {
    setFilters((prev) => ({
      ...prev,
      dietary: checked
        ? [...prev.dietary, diet]
        : prev.dietary.filter((d) => d !== diet),
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {/* Difficulty */}
      <div className="space-y-2">
        <Label>Difficulty</Label>
        <Select
          value={filters.difficulty}
          onChange={(value) => updateFilter("difficulty", value)}
        >
          <option value="">Any difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Select>
      </div>

      {/* Cooking Time */}
      <div className="space-y-2">
        <Label>Max Cooking Time: {filters.cookingTime || "Any"} min</Label>
        <Slider
          value={filters.cookingTime || 120}
          onChange={(value) => updateFilter("cookingTime", value)}
          max={120}
          min={15}
          step={15}
        />
      </div>

      {/* Cuisine */}
      <div className="space-y-2">
        <Label>Cuisine</Label>
        <Select
          value={filters.cuisine}
          onChange={(value) => updateFilter("cuisine", value)}
        >
          <option value="">Any cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Indian">Indian</option>
          <option value="French">French</option>
        </Select>
      </div>

      {/* Dietary Restrictions */}
      <div className="space-y-2">
        <Label>Dietary</Label>
        <div className="space-y-2">
          {[
            "Vegetarian",
            "Vegan",
            "Gluten-Free",
            "Dairy-Free",
            "Keto",
            "Low-Carb",
          ].map((diet) => (
            <div key={diet} className="flex items-center space-x-2">
              <Checkbox
                id={diet.toLowerCase().replace(/\s+/g, "-")}
                checked={filters.dietary.includes(diet)}
                onChange={(checked) => updateDietary(diet, checked)}
              />
              <Label
                htmlFor={diet.toLowerCase().replace(/\s+/g, "-")}
                className="text-sm"
              >
                {diet}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
