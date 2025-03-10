
import React from 'react';

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton = ({ category, isSelected, onClick }: CategoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        isSelected 
          ? "bg-primary text-primary-foreground shadow-soft" 
          : "bg-secondary/60 text-foreground hover:bg-secondary"
      }`}
    >
      {category}
    </button>
  );
};

export default CategoryButton;

