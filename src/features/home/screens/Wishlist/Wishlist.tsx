/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps, Pagination, Row, Slider } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/api';
import { ProductItemType } from '../../types/product.types';
import { Grid2, useMediaQuery } from '@mui/material';
import ProductsList from '../../../../components/ProductsFilterByCategory/ProductsList/ProductsList';
import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../../../../store/store';
type MenuItem = Required<MenuProps>['items'][number];
const stockItems: MenuItem[] = [
  {
    key: 'sub2',
    label: 'Available',
    icon: null,
    style: { color: '#000', fontWeight: 500, backgroundColor: '#fff' },
    children: [
      {
        key: '1',
        label: 'In Stock',
      },
      {
        key: '0',
        label: 'Out of Stock',
      },
    ],
  },
];

const Wishlist = () => {
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [productsFilter, setProductsFilter] = useState<ProductItemType[]>([]);
  const [cateSelected, setCateSelected] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const productCategory = useSelector((state: RootState) => state.app.category);
  const [cateItems, setCateItems] = useState<MenuItem[]>([]);
  const [itemsAvailable, setItemsAvailable] = useState<boolean | null>(null);
  const [priceValues, setPriceValues] = useState<number[]>([Number.MAX_VALUE, Number.MIN_VALUE]);
  const [maxValue, setMaxValue] = useState<number>(0);
  const priceItems = [
    {
      key: 'sub3',
      label: 'Price',
      icon: null,
      style: { color: '#000', fontWeight: 500, backgroundColor: '#fff' },
      children: [
        {
          key: '0',
          label: (
            <Slider style={{ width: '100%' }} min={0} max={maxValue} range value={priceValues} onChange={setPriceValues} />
          ),
          style: { padding: '0 10px' },
        },
      ],
    },
  ];
  const mobileScreen = useMediaQuery('(max-width:899px)');
  const wishlistLength = useAppSelector((state) => state.auth.wishlistItemLength);

  useEffect(() => {
    api.get('/wishlist/getWishlist').then((res) => {
      setProducts(res.data.result.wishlist);
      setTotal(res.data.result.wishlist.length);
      let maxVal = Number.MIN_VALUE;
      let minVal = Number.MAX_VALUE;
      res.data.result.wishlist.map((product: any) => {
        if (product.price > maxValue) setMaxValue(product.price);
        if (product.price > maxVal) maxVal = product.price;
        if (product.price < minVal) minVal = product.price;
      })
      const temp = minVal
      minVal = Math.min(minVal, maxVal)
      maxVal = Math.max(temp, maxVal)
      setPriceValues([minVal, maxVal]);
    });
    console.log(page);
    console.log(pageSize);
  }, [wishlistLength]);

  useEffect(() => {
    setCateItems([
      {
        key: 'sub1',
        label: 'Categories',
        icon: null,
        style: { color: '#000', fontWeight: 500, backgroundColor: '#fff' },
        children: productCategory.map((cate) => ({
          key: cate.title,
          label: cate.title,
        })),
      },
    ]);
  }, [productCategory]);

  useEffect(() => {
    setProductsFilter(
      products.filter(
        (product) =>
          (cateSelected === '' || product.category === cateSelected) &&
          (itemsAvailable === null ||
            (itemsAvailable ? product.quantity > 0 : product.quantity <= 0)) && (product.price >= priceValues[0] && product.price <= priceValues[1])
      )
    );
  }, [priceValues, cateSelected, itemsAvailable, products]);

  useEffect(() => {
    setTotal(productsFilter.length);
  }, [productsFilter]);

  const onClick: MenuProps['onClick'] = (e) => {
    if (cateSelected === e.key) {
      setCateSelected('');
      return
    }
    setCateSelected(e.key);
  };

  const onClickAvailable: MenuProps['onClick'] = (e) => {
    if (e.key === '0' && itemsAvailable === false) {
      setItemsAvailable(null);
      return;
    }
    if (e.key === '1' && itemsAvailable === true) {
      setItemsAvailable(null);
      return;
    }
    setItemsAvailable(e.key === '1');
  };
  return (
    <Row className="container" style={{ margin: '20px auto 58px' }}>
      <span
        className="primaryUnderline"
        style={{
          fontSize: '20px',
          fontWeight: '500',
          marginBottom: '10px',
          width: 'fit-content',
        }}
      >
        Wishlist
      </span>
      <Grid2 container spacing={4} sx={{ width: '100%' }}>
        {!mobileScreen && (
          <Grid2
            size={{ xs: 0, md: 2 }}
            rowGap={4}
            sx={{
              mt: '20px',
            }}
          >
            <Row
              style={{ flexDirection: 'column', gap: 30 }}
              className="custom-menu-item-selected"
            >
              <Menu
                onClick={onClick}
                style={{
                  width: '100%',
                  minWidth: '140px',
                  background: 'inherit',
                  borderInlineEnd: 'none',
                  color: '#f03333',
                  border: '1px solid #e9e9e9',
                  borderRadius: '10px',
                }}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={cateItems}
                theme="light"
                selectedKeys={[cateSelected || '']}
              />

              <Menu
                // onClick={onClickAvailable}
                style={{
                  width: '100%',
                  minWidth: '140px',
                  background: 'inherit',
                  borderInlineEnd: 'none',
                  color: '#f03333',
                  border: '1px solid #e9e9e9',
                  borderRadius: '10px',
                }}
                
                defaultOpenKeys={['sub3']}
                mode="inline"
                items={priceItems}
                theme="light"
                className='custom-menu-price-slider'
              />

              <Menu
                onClick={onClickAvailable}
                style={{
                  width: '100%',
                  minWidth: '140px',
                  background: 'inherit',
                  borderInlineEnd: 'none',
                  color: '#f03333',
                  border: '1px solid #e9e9e9',
                  borderRadius: '10px',
                }}
                defaultOpenKeys={['sub2']}
                mode="inline"
                items={stockItems}
                theme="light"
                selectedKeys={
                  itemsAvailable === null ? [] : [itemsAvailable ? '1' : '0']
                }
              />
            </Row>
          </Grid2>
        )}
        <Grid2
          size={{ xs: 12, md: 10 }}
          container
          columns={{ xs: 2, md: 4, lg: 5 }}
          spacing={2}
          sx={{ mt: '20px', background: '#fff' }}
        >
          <ProductsList products={productsFilter} isWishlist={true} />
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
    </Row>
  );
};

export default Wishlist;
