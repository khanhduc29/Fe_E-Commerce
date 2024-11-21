import { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem/CategoryItem';
import { apiNotToken } from '../../../../api/api';
import { Category } from '../../../../types/category.type';

const CategoryMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    apiNotToken.get('/productcategory').then((res) => {
      setCategories(res.data.prodCategories);
    });
  }, []);

  return (
    <>
      {categories?.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
        />
      ))}
    </>
  );
};

export default CategoryMenu;
