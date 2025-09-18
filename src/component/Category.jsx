import React from "react";

const categories = [
  { name: "All" },
  { name: "Music" },
  { name: "Technology" },
  { name: "Sports" },
  { name: "Arts" },
  { name: "Culinary" },
];

const Category = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelect?.(cat.name)}
          className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default Category;