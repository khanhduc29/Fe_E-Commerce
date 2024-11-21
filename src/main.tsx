import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './helpers/ScrollToTop.tsx';
import { ConfigProvider } from 'antd';
import './i18n/i18n.ts';
import { useTranslation } from 'react-i18next';

const AppWrapper = () => {
  const { i18n } = useTranslation('common');
  const fontFamily = i18n.language === 'vi' ? 'Roboto, sans-serif' : 'Poppins, sans-serif';

  const theme = createTheme({
    palette: {
      background: {
        default: '#fff',
      },
      primary: {
        main: '#000',
        light: '#f03333',
        dark: '#f03333',
        contrastText: '#fff',
      },
      secondary: {
        main: '#f03333',
        light: '#f03333',
        dark: '#f03333',
        contrastText: '#636363',
      },
    },
    typography: {
      fontFamily: fontFamily,
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            padding: 0,
          },
          input: {
            padding: 0,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            display: 'none',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            color: '#636363',
            '&.Mui-selected': {
              color: '#000000',
            },
            '&:hover': {
              color: '#000000',
            },
            '&::before': {
              content: "''",
              position: 'absolute',
              bottom: 0,
              width: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              height: '3px',
              backgroundColor: '#f03333',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            },
            '&.Mui-selected::before': {
              width: '100%',
            },
            '&:hover::before': {
              width: '100%',
            },
          },
        },
      }
    },
  });

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop />
            <ConfigProvider theme={{ token: { fontFamily: fontFamily } }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </ConfigProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<AppWrapper />);
