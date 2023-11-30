'use client'
import React, { useEffect, useState } from 'react'

// import {
//     FcEngineering,
//     FcFilmReel,
//     FcMultipleDevices,
//     FcMusic,
//     FcOldTimeCamera,
//     FcSalesPerformance,
//     FcSportsMode
//   } from "react-icons/fc";
//   import { IconType } from "react-icons";
import {CategoryItem} from './categoriesItem';

interface Item {
    _id : String ,
    name : String
  }

interface Cat {
    items : Item[]
}

// const iconMap: Record<Item.name, IconType>  = {
//   "Music": FcMusic,
//   "Photography": FcOldTimeCamera,
//   "Fitness": FcSportsMode,
//   "Accounting": FcSalesPerformance,
//   "Computer Science": FcMultipleDevices,
//   "Filming": FcFilmReel,
//   "Engineering": FcEngineering,
// };

const Categories = ({ items }: Cat) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item._id.toString()} // Use a unique identifier as the key
          label={item.name}
          value={item.name.toString()}
        />
      ))}
    </div>
  );
};

export default Categories;
