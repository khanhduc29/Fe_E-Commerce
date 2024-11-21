import { Tabs, Box, Tab } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ProductsTabItem from './ProductsTabItem/ProductsTabItem';
import { apiNotToken } from '../../api/api';
import { Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tab-id-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `product-tab-${index}`,
    'aria-controls': `product-tab-id-${index}`,
  };
}

const tabs = [
  {
    label: 'Latest Products',
    data: [],
  },
  {
    label: 'Top Rating',
    data: [],
  },
  {
    label: 'Best Selling',
    data: [],
  },
];

const ProductsHighlight = () => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  }, []);

  useEffect(() => {
    setLoading(true);
    apiNotToken.get(`/product/?page=${value + 1}`).then((res) => {
      setProducts(res.data);
      console.log(products);
      setLoading(false);
      tabs[value].data = res.data.products;
    });
  }, [value]);

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff', padding: '10px 20px', borderRadius: '10px' }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          //   variant="fullWidth"
          centered
          aria-label={t('products_tabs')}
        >
          {tabs.map((tab, index) => (
            <Tab
              disableTouchRipple
              key={index}
              sx={{ marginRight: '20px', fontSize: '18px' }}
              label={t(tab.label)}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {loading ? (
          <Row style={{ minHeight: '400px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Spin style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} size="large" percent={'auto'} />
          </Row>
        ) : (
          <ProductsTabItem products={tab.data} />
        )}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default ProductsHighlight;
