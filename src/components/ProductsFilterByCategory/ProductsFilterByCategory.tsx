/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';
import { apiNotToken } from '../../api/api';
import CategorySide from '../Banners/CategorySide/CategorySide';
import bannersilde1 from '../../assets/images/banner-side-1.webp';
import ProductsList from './ProductsList/ProductsList';
import { ProductItemType } from '../../features/home/types/product.types';
import { Pagination, Row, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface ProductsFilterByCategoryProps {
  category: string;
  specialTitle: React.ReactNode;
  title: React.ReactNode;
  subt: React.ReactNode;
  banner1: any;
}

const ProductsFilterByCategory = ({
  category,
  specialTitle = <>LIMITED TIME ONLY</>,
  title = (
    <>
      {' '}
      Galaxy for <br /> Everyone{' '}
    </>
  ),
  subt = 'Pre-order Galaxy S21 or S21+ and get bonus Galaxy Buds Live (White)',
  banner1 = bannersilde1,
}: ProductsFilterByCategoryProps) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    apiNotToken
      .get(`/product/?category=${category}&page=${page}&limit=${pageSize}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.counts);
        setLoading(false);
      });
  }, [page, pageSize, category]);
  return (
    <div
      style={{
        marginTop: '40px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <Row>
        <span
          className="primaryUnderline"
          style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}
        >
          {t(category)}
        </span>
        <NavLink
          to="/product"
          style={{
            marginLeft: 'auto',
            fontSize: '16px',
            color: '#000000',
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '8px',
            textDecoration: 'underline',
          }}
        >
          {t('view_all_products')}
          <ArrowLongRightIcon width={24} height={24} color="#000" />
        </NavLink>
      </Row>
      <Grid2 container spacing={2} sx={{ mt: '20px' }}>
        <Grid2 size={{ xs: 0, md: 2 }}>
          <CategorySide
            specialTitle={specialTitle}
            title={title}
            subt={subt}
            banner1={banner1}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 10 }}
          container
          columns={{ xs: 2, md: 4, lg: 5 }}
          spacing={2}
        >
          {loading ? (
            <Grid2
              size={12}
              style={{
                minHeight: '400px',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spin
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                size="large"
                percent={'auto'}
              />
            </Grid2>
          ) : (
            <ProductsList products={products} />
          )}
        </Grid2>
        <Grid2 size={12}>
          <Grid2 size={12}>
            <Pagination
              showSizeChanger
              style={{ flexWrap: 'wrap', rowGap: '8px' }}
              align="end"
              total={total}
              showTotal={(total) => `Total ${total} items`}
              defaultPageSize={10}
              defaultCurrent={1}
              onChange={(page) => setPage(page)}
              onShowSizeChange={(_, size) => setPageSize(size)}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ProductsFilterByCategory;
