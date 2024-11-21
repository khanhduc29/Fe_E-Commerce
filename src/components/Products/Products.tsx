/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2, useMediaQuery } from '@mui/material';
import { apiNotToken } from '../../api/api';
import ProductsList from '../ProductsFilterByCategory/ProductsList/ProductsList';
import { ProductItemType } from '../../features/home/types/product.types';
import {
  Checkbox,
  ColorPicker,
  Menu,
  MenuProps,
  Pagination,
  Row,
  Slider,
  Spin,
} from 'antd';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { disableSearchProductByImg } from '../../features/home/redux/product/product.slice';

type MenuItem = Required<MenuProps>['items'][number];

const Products = () => {
  const url = useLocation();
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [category, setCategory] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [cateSelected, setCateSelected] = useState<string>('');
  const productCategory = useSelector((state: RootState) => state.app.category);
  const [cateItems, setCateItems] = useState<MenuItem[]>([]);
  const [priceValues, setPriceValues] = useState<number[]>([0, 100000000]);
  const [sortPrice, setSortPrice] = useState<string>('+price');
  const [colorFilterValue, setColorFilterValue] = useState<string>('');
  const isSearchByImg = useAppSelector((state) => state.product.isSearchProductByImg);
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
            <Slider
              style={{ width: '100%' }}
              min={0}
              max={100000000}
              range
              defaultValue={priceValues}
              onChange={debounce(setPriceValues, 500)}
            />
          ),
          style: { padding: '0 10px' },
        },
      ],
    },
  ];
  const sortTypeItems = [
    {
      key: 'sub4',
      label: 'Price Sort Type',
      icon: null,
      style: { color: '#000', fontWeight: 500, backgroundColor: '#fff' },
      children: [
        {
          key: '0',
          label: (
            <Checkbox
              checked={sortPrice === '+price'}
              onChange={() => setSortPrice('+price')}
            >
              Price Asc
            </Checkbox>
          ),
        },
        {
          key: '1',
          label: (
            <Checkbox
              checked={sortPrice === '-price'}
              onChange={() => setSortPrice('-price')}
            >
              Price Desc
            </Checkbox>
          ),
        },
      ],
    },
  ];
  const colorFilterItems = [
    {
      key: 'sub5',
      label: 'Color',
      icon: null,
      style: { color: '#000', fontWeight: 500, backgroundColor: '#fff' },
      children: [
        {
          key: 'black',
          label: (
            <ColorPicker
              style={{ width: '100%', alignItems: 'center', justifyContent: 'start', border: 'none', backgroundColor: 'transparent' }}
              defaultValue="black"
              showText={() => <span style={{ color: colorFilterValue === 'black' ? '#f03333' : '' }}>Black</span>}
            />
          ),
          
        },
        {
          key: 'gold',
          label: (
            <ColorPicker
              style={{ width: '100%', alignItems: 'center', justifyContent: 'start', border: 'none', backgroundColor: 'transparent' }}
              defaultValue="#FFD700"
              showText={() => <span style={{ color: colorFilterValue === 'gold' ? '#f03333' : '' }}>Gold</span>}
            />
          ),
          
        },
        {
          key: 'red',
          label: (
            <ColorPicker
              style={{ width: '100%', alignItems: 'center', justifyContent: 'start', border: 'none', backgroundColor: 'transparent' }}
              defaultValue="#ff0000"
              showText={() => <span style={{ color: colorFilterValue === 'red' ? '#f03333' : '' }}>Red</span>}
            />
          ),
          
        },
      ],
    },
  ];
  const mobileScreen = useMediaQuery('(max-width:899px)');
  const dispatch = useAppDispatch();

  const productByImg = useAppSelector((state) => state.product.productByImg);
  useEffect(() => {
    const params = new URLSearchParams(url.search);
    const categoryVal = params.get('category');
    const titleVal = params.get('title');
    setCategory(categoryVal);
    setTitle(titleVal);
    if (isSearchByImg) {
      dispatch(disableSearchProductByImg())
    }
    setLoading(true);
    apiNotToken({
      method: 'get',
      url: '/product/',
      params: {
        sort: sortPrice,
        ...Object.fromEntries(new URLSearchParams(url.search)),
        page: cateSelected ? 1 : page,
        limit: cateSelected ? 10 : pageSize,
        category: cateSelected || undefined,
        'price[gte]': priceValues[0] !== 0 ? priceValues[0] : undefined,
        'price[lte]': priceValues[1] !== 100000000 ? priceValues[1] : undefined,
        color: colorFilterValue !== '' ? colorFilterValue : undefined,
      },
    }).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.counts);
      setLoading(false);
    });
  }, [url, page, pageSize, cateSelected, sortPrice, priceValues, colorFilterValue, isSearchByImg, dispatch]);

  useEffect(() => {
    if (isSearchByImg && productByImg.length > 0) {
      setProducts(productByImg);
    }
  }, [productByImg, isSearchByImg]);

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
          style: { userSelect: 'none' },
        })),
      },
    ]);
  }, [productCategory]);

  const onClick: MenuProps['onClick'] = (e) => {
    if (cateSelected === e.key) {
      setCateSelected('');
      return;
    }
    setCateSelected(e.key);
  };

  const onClickColorFilter: MenuProps['onClick'] = (e) => {
    if (colorFilterValue === e.key) {
      setColorFilterValue('');
      return;
    }
    setColorFilterValue(e.key);
  };

  return (
    <Row style={{ flexDirection: 'column', width: '100%' }}>
      <span
        className="primaryUnderline"
        style={{
          fontSize: '20px',
          fontWeight: '500',
          marginBottom: '10px',
          width: 'fit-content',
        }}
      >
        {category || (title ? `Products for title ${title}` : 'All Products')}
      </span>
      <Grid2 container spacing={4} sx={{ width: '100%' }}>
        {loading ? (
          <></>
        ) : (
          !mobileScreen && (
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
                  onClick={() => null}
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
                  className="custom-menu-price-slider"
                />

                <Menu
                  onClick={() => null}
                  style={{
                    width: '100%',
                    minWidth: '140px',
                    background: 'inherit',
                    borderInlineEnd: 'none',
                    color: '#f03333',
                    border: '1px solid #e9e9e9',
                    borderRadius: '10px',
                  }}
                  defaultOpenKeys={['sub4']}
                  mode="inline"
                  items={sortTypeItems}
                  theme="light"
                />

                <Menu
                  onClick={onClickColorFilter}
                  style={{
                    width: '100%',
                    minWidth: '140px',
                    background: 'inherit',
                    borderInlineEnd: 'none',
                    color: '#f03333',
                    border: '1px solid #e9e9e9',
                    borderRadius: '10px',
                  }}
                  defaultOpenKeys={['sub5']}
                  mode="inline"
                  items={colorFilterItems}
                  theme="light"
                />
              </Row>
            </Grid2>
          )
        )}
        <Grid2
          size={{ xs: 12, md: 10 }}
          container
          columns={{ xs: 2, md: 4, lg: 5 }}
          spacing={2}
          sx={{ mt: '20px', background: '#fff' }}
        >
          {loading ? (
            <Grid2
              size={12}
              sx={{ height: '100vh' }}
              justifyContent={'center'}
              alignItems={'center'}
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
          <Grid2 size={12}>
            <Pagination
              showSizeChanger
              style={{ flexWrap: 'wrap', rowGap: '8px' }}
              align="end"
              total={total}
              showTotal={(total) => `Total ${total} items`}
              pageSize={pageSize}
              current={page}
              onChange={(page) => setPage(page)}
              onShowSizeChange={(_, size) => setPageSize(size)}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Row>
  );
};

export default Products;
