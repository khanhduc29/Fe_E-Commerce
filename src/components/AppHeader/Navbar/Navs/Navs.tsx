import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Navs = () => {
  const { t } = useTranslation();
  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
  };

  const navItemCss = (isActive: boolean) => ({
    color: isActive ? "#000000" : "#636363",
    fontSize: "13px",
    fontWeight: isActive ? 600 : 500,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      width: isActive ? "100%" : "0",
      height: "2px",
      bottom: "-2px",
      left: isActive ? "0" : "50%",
      backgroundColor: isActive ? "#000000" : "#636363",
      transition: "all 0.3s ease",
      transform: isActive ? "translateX(0)" : "translateX(-50%)",
    },
    "&:hover::after": {
      width: "100%",
      left: "0",
      transform: "translateX(0)",
    },
  });
  return (
    <Stack direction="row" spacing={5} flex={10}>
      <NavLink
        to="/"
        style={linkStyle}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('home')}
          </Typography>
        )}
      </NavLink>
      {/* <NavLink to="/shop" style={linkStyle}>
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('shop')}
          </Typography>
        )}
      </NavLink> */}
      <NavLink to="/product" style={linkStyle}>
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('product')}
          </Typography>
        )}
      </NavLink>
      <NavLink to="/blog" style={linkStyle}>
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('blog')}
          </Typography>
        )}
      </NavLink>
      <NavLink to="/contact" style={linkStyle}>
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('contact')}
          </Typography>
        )}
      </NavLink>
      <NavLink to="/order" style={linkStyle}>
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('order')}
          </Typography>
        )}
      </NavLink>
      <NavLink to="/about-us" style={linkStyle}>
        {({ isActive }) => (
          <Typography variant="subtitle1" sx={navItemCss(isActive)}>
            {t('about_us')}
          </Typography>
        )}
      </NavLink>
    </Stack>
  );
};

export default Navs;
