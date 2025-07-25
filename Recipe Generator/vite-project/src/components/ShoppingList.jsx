"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Trash2, Check, X } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Checkbox from "./ui/Checkbox";

const ShoppingList = ({ shoppingList, setShoppingList }) => {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      const item = {
        id: Date.now(),
        name: newItem.trim(),
        checked: false,
        addedAt: new Date().toISOString(),
      };
      setShoppingList([...shoppingList, item]);
      setNewItem("");
    }
  };

  const toggleItem = (id) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setShoppingList(shoppingList.filter((item) => !item.checked));
  };

  const clearAll = () => {
    setShoppingList([]);
  };

  const completedCount = shoppingList.filter((item) => item.checked).length;
  const totalCount = shoppingList.length;

  if (shoppingList.length === 0) {
    return (
      <Card>
        <Card.Content className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Your shopping list is empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add ingredients from recipes or create your own list!
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Input
              placeholder="Add an item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <Button onClick={addItem} disabled={!newItem.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping List ({completedCount}/{totalCount})
            </div>
            <div className="flex gap-2">
              {completedCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearCompleted}>
                  <Check className="h-4 w-4 mr-1" />
                  Clear Completed
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add an item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <Button onClick={addItem} disabled={!newItem.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {totalCount > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          )}
        </Card.Content>
      </Card>

      <div className="grid gap-2">
        {shoppingList.map((item) => (
          <Card
            key={item.id}
            className={`transition-all duration-200 ${
              item.checked ? "opacity-60" : ""
            }`}
          >
            <Card.Content className="flex items-center gap-3 p-4">
              <Checkbox
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
              />
              <span
                className={`flex-1 ${
                  item.checked ? "line-through text-gray-500" : ""
                }`}
              >
                {item.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
