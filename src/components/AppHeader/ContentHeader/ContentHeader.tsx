import {
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grid2,
  Grow,
  Link,
  List,
  ListItem,
  MenuList,
  Paper,
  Popper,
  SnackbarCloseReason,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import logo from '../../../assets/images/logo.jpg';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useMediaQuery } from '@mui/material';
import {
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  ArrowLeftEndOnRectangleIcon,
  ChevronDownIcon,
  MicrophoneIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../store/store';
import { logout } from '../../../features/auth/redux/auth.slice';
import React, { useEffect, useState } from 'react';
import SideBar from '../../SideBarTongle/SideBar';
import SnackbarAlert from '../../ToastMessage/SnackbarAlert';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import { Modal, Row } from 'antd';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { enableSearchProductByImg, getProductByImage } from '../../../features/home/redux/product/product.slice';

const modalInputCss = {
  '& .MuiInputBase-root': {
    borderRadius: '30px',
    padding: '5px 15px',
    border: '1px solid #e9e9e9',
  },
  '& .MuiInputBase-input': {
    padding: '10px 0',
  },
  '& .MuiInputAdornment-root': {
    marginRight: '10px',
  },
};

const mostReachedData = [
  {
    id: 1,
    title: 'Iphone',
  },
  {
    id: 2,
    title: 'Flycam',
  },
  {
    id: 3,
    title: 'Xiaomi',
  },
  {
    id: 4,
    title: 'Nokia',
  },
  {
    id: 5,
    title: 'Realme',
  },
  {
    id: 6,
    title: 'Samsung',
  },
  {
    id: 7,
    title: 'Dell',
  },
];

const flexCss = {
  display: 'flex',
  alignItems: 'center',
};

const iconCssClass = {
  cursor: 'pointer',
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
  fontSize: '30px',
};

const itemRecommendCss = {
  padding: 0,
  margin: '0 10px',
};

const itemRecommendLinkCss = {
  fontSize: '12px',
  color: '#000000',
  '&:hover': {
    color: '#f03333',
  },
};

const searchContainerCss = {
  backgroundColor: 'white',
  borderRadius: '30px',
  border: '2px solid',
  borderColor: '#e9e9e9',
  flexGrow: 1,
  // mx: "auto",
  padding: '5px',
};

const searchInputCss = {
  flex: 1,
  border: 0,
  width: '100%',
  padding: '0 0 0 20px',
  lineHeight: 1.2,
  backgroundColor: 'transparent',
};

const searchInputEleCss = {
  padding: '0',
  fontSize: '14px',
  fontWeight: 450,
  border: 0,
  width: '100%',
  '&::placeholder': {
    color: '#000000',
  },
  '&::input': {
    flexGrow: 1,
  },
};

const categoryMenuCss = {
  backgroundColor: 'transparent',
  fontSize: '13px',
  color: '#636363',
  display: 'inline-flex',
  textWrap: 'nowrap',
  width: 'auto',
  flex: 1,
  padding: 0,
  textTransform: 'none',
  '&.MuiButton-root': {
    minWidth: 'auto',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '1px',
    height: '100%',
    top: '0',
    left: '-10%',
    backgroundColor: '#e9e9e9',
  },
  '&:active': {
    backgroundColor: 'transparent',
  },
  '&:focus': {
    backgroundColor: 'transparent',
  },
};

interface CategoryMenuProps {
  open: boolean;
}

const buttonSearchCss = {
  backgroundColor: 'black',
  borderRadius: '50px',
  paddingLeft: '30px',
  paddingRight: '30px',
  textTransform: 'none',
  borderStyle: 'solid',
  borderColor: '#000000',
  borderWidth: '2px',
  fontSize: '0.875rem',
  '&:hover': {
    borderColor: '#f03333',
    backgroundColor: '#f03333',
  },
};

// const labelStyle = {
//   color: '#6fa3ef',
//   cursor: 'pointer',
// };

const ContentHeader = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpeechModalVisible, setIsSpeechModalVisible] = useState(false);
  const { finalTranscript } = useSpeechRecognition({
    clearTranscriptOnListen: true,
  });
  const [isFirstTime, setIsFirstTime] = useState(true);
  // search Img
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [error, setError] = useState('');

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
    }
    handleTranscriptChange(finalTranscript);
  }, [finalTranscript]);

  useEffect(() => {
    if (isSpeechModalVisible) {
      setTimeout(() => {
        setIsSpeechModalVisible(false);
      }, 2000);
    }
  }, [isSpeechModalVisible]);

  const isBelow1200Screen = useMediaQuery('(max-width:1200px)');

  const isLogin = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartBadge = useAppSelector(
    (state: RootState) => state.auth.cartItemLength
  );
  const wishlistBadge = useAppSelector(
    (state: RootState) => state.auth.wishlistItemLength
  );

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logout())
        .unwrap()
        .then(() => {
          setOpenSnackbar({
            open: true,
            severity: 'success',
            message: 'Logged out successfully',
          });
        });
    } catch (error) {
      console.error(error);
      setOpenSnackbar({
        open: true,
        severity: 'error',
        message: 'An error occurred while logging out',
      });
    }
  };

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
    message: '',
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({
      ...openSnackbar,
      open: false,
    });
  };
  //

  const categoryMenuEle = ({ open }: CategoryMenuProps) => (
    <>
      <Button
        ref={anchorRef}
        id="category-button"
        aria-controls={open ? 'category-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        disableRipple
        variant="text"
        disableElevation
        sx={categoryMenuCss}
      >
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          All Category
        </Typography>
        <ChevronDownIcon
          width={16}
          height={16}
          color="#000"
          style={{
            margin: '0 4px',
            rotate: open ? '-180deg' : 'none',
            transition: 'all .3s ease',
          }}
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 1000 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseBtn}>
                <MenuList
                  autoFocusItem={open}
                  id="category-menu"
                  aria-labelledby="category-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    width: '250px',
                    zIndex: 2,
                    listStyle: 'none',
                    backgroundColor: '#ffffff',
                    p: '0 30px',
                    borderRadius: '0 0 6px 6px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    '& li:first-of-type a::before': {
                      backgroundColor: '#437cfe',
                    },
                    '& li:nth-of-type(2) a::before': {
                      backgroundColor: '#5fca51',
                    },
                    '& li:nth-of-type(3) a::before': {
                      backgroundColor: '#c24ebe',
                    },
                  }}
                >
                  <CategoryMenu />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );

  const handleOpen = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleCloseBtn = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenMenu(false);
  };
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === 'Escape') {
      setOpenMenu(false);
    }
  };
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const handleClickToLink = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    path: string
  ) => {
    event.preventDefault();
    if (isLogin) {
      navigate(path, { replace: true });
    } else {
      navigate('/sign-in', { replace: true });
    }
  };

  const normalizeSearchValue = (value: string) => {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handleSearch = (val: string) => {
    const normalizedValue = normalizeSearchValue(val);
    if (!isFirstTime) {
      navigate(`/product?title=${normalizedValue}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchValue);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleSearch(searchValue);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSpeechModalOk = () => {
    setIsSpeechModalVisible(false);
  };

  const handleSpeechModalCancel = () => {
    setIsSpeechModalVisible(false);
  };

  const handleTranscriptChange = (transcript: string) => {
    setSearchValue(transcript);
    handleSearch(transcript);
  };

  const handleMicrophoneClick = () => {
    if (!isSpeechModalVisible) {
      setIsSpeechModalVisible(true);
    }
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    setSearchValue('');
    SpeechRecognition.startListening({ language: 'en-US' });
  };

  // img search
  const handleShowForm = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  const handleSearchImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image_url', imageUrl);

    if (imageFile) {
      formData.append('image_file', imageFile); // Chỉ append nếu imageFile không phải là null
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        body: formData, // Gửi formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra');
      }

      const data = await response.json();

      dispatch(getProductByImage(data.products));
      dispatch(enableSearchProductByImg());
      closeModal();
      setImageUrl('');
      setImageFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
    if (file) {
      setImageUrl(''); // Clear URL if a file is selected
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    if (e.target.value) {
      setImageFile(null); // Clear file if a URL is entered
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        padding: isBelow1200Screen ? '0' : '25px 0 10px',
        backgroundColor: '#ffffff',
      }}
    >
      <SnackbarAlert
        open={openSnackbar.open}
        onClose={handleClose}
        message={openSnackbar.message}
        severity={openSnackbar.severity}
      />
      <Grid2
        flex={1}
        container
        spacing={3}
        alignItems={'center'}
        flexDirection={'row'}
        className="container"
        margin={'0 auto'}
      >
        {isBelow1200Screen ? (
          <>
            <Grid2 size="grow">
              <MenuOutlinedIcon
                onClick={toggleDrawer(true)}
                sx={{ width: '26px', height: '26px', marginRight: '10px' }}
              />
              <MagnifyingGlassIcon
                style={{ width: '26px', height: '26px' }}
                onClick={showModal}
              />
            </Grid2>
            <Grid2>
              <img
                src={logo}
                alt="logo"
                style={{ height: '50px' }}
                onClick={() => navigate('/')}
              />
            </Grid2>
            <Grid2
              display="flex"
              size="grow"
              justifyContent="flex-end"
              gap={'10px'}
            >
              {isLogin == false ? (
                <NavLink style={{ color: 'initial' }} to={'/sign-in'}>
                  <Badge badgeContent={0} color="error">
                    <UserIcon width={'26px'} height={'26px'} />
                  </Badge>
                </NavLink>
              ) : (
                <NavLink style={{ color: 'initial' }} to={'/'}>
                  <Badge badgeContent={0} color="error">
                    <ArrowLeftEndOnRectangleIcon
                      width={'26px'}
                      height={'26px'}
                      onClick={handleLogout}
                    />
                  </Badge>
                </NavLink>
              )}
              <Badge badgeContent={wishlistBadge} color="error">
                <HeartIcon style={{ width: '26px', height: '26px' }}
                  onClick={(event) => handleClickToLink(event, '/wishlist')}
                />
              </Badge>
              <Badge badgeContent={cartBadge} color="error">
                <ShoppingBagIcon
                  style={{ width: '26px', height: '26px' }}
                  onClick={(event) => handleClickToLink(event, '/cart')}
                />
              </Badge>
            </Grid2>
          </>
        ) : (
          <>
            <Grid2 size={2}>
              <img
                src={logo}
                alt="logo"
                style={{ height: '66px' }}
                onClick={() => navigate('/')}
              />
            </Grid2>
            <Grid2 size={7} flexDirection={'column'}>
              <Box component="form" sx={{ ...flexCss, ...searchContainerCss }}>
                <TextField
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      sx: { ...flexCss, ...searchInputEleCss },
                      endAdornment: (
                        <Row
                          align={'middle'}
                          style={{ minWidth: 'auto' }}
                          wrap={false}
                        >
                          <MicrophoneIcon
                            width={24}
                            height={24}
                            style={{ cursor: 'pointer', marginRight: '20px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMicrophoneClick();
                            }}
                          />
                          <PhotoIcon
                            width={24}
                            height={24}
                            style={{ cursor: 'pointer', marginRight: '20px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowForm();
                            }}
                          />
                          {showForm && (
                            <Dialog open={showForm} onClose={closeModal}>
                              <DialogContent onClick={closeModal}>
                                <Box
                                  onClick={(e) => e.stopPropagation()}
                                  sx={{ width: '400px' }}
                                >
                                  <DialogTitle>
                                    Tìm kiếm bằng hình ảnh
                                  </DialogTitle>

                                  {/* Image Upload Section */}
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      textAlign: 'center',
                                      p: 2,
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontSize: '13px' }}
                                    >
                                      Kéo hình ảnh vào đây hoặc tải tệp lên
                                    </Typography>
                                    <input
                                      id="fileInput"
                                      type="file"
                                      style={{ display: 'none' }}
                                      onChange={handleFileChange}
                                    />
                                    <label
                                      htmlFor="fileInput"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <Button
                                        variant="contained"
                                        component="span"
                                      >
                                        Tải lên
                                      </Button>
                                    </label>
                                  </Box>

                                  <Typography align="center" sx={{ py: 1 }}>
                                    HOẶC
                                  </Typography>

                                  {/* URL Input Form */}
                                  <form>
                                    <TextField
                                      fullWidth
                                      label="Dán đường liên kết của hình ảnh"
                                      variant="outlined"
                                      value={imageUrl}
                                      onChange={handleUrlChange}
                                      sx={{ mb: 2 }}
                                      disabled={!!imageFile} // Disable if file is uploaded
                                    />
                                    <Button
                                      variant="contained"
                                      fullWidth
                                      onClick={handleSearchImg}
                                      disabled={!imageFile && !imageUrl} // Only enable if one input is provided
                                    >
                                      Tìm kiếm
                                    </Button>
                                  </form>
                                </Box>
                              </DialogContent>
                            </Dialog>
                          )}

                          {categoryMenuEle({ open: openMenu })}
                        </Row>
                      ),
                    },
                  }}
                  sx={{ ...flexCss, ...searchInputCss }}
                />
                <Button
                  variant="contained"
                  sx={buttonSearchCss}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSearch(searchValue);
                  }}
                >
                  <MagnifyingGlassIcon
                    style={{ width: '20px', height: '20px' }}
                  />
                </Button>
              </Box>
              <Box display={'flex'} alignItems={'center'} marginTop={'5px'}>
                <Typography
                  variant="h4"
                  fontSize={'12px'}
                  textAlign={'center'}
                  lineHeight={1.2}
                >
                  Most searched:
                </Typography>
                <Box display={'flex'} flexDirection={'row'}>
                  <List
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 0,
                      fontSize: '12px',
                    }}
                  >
                    {mostReachedData.map((item, index) => (
                      <Box key={index}>
                        <ListItem sx={itemRecommendCss}>
                          <Link
                            href="#"
                            underline="none"
                            color="inherit"
                            sx={itemRecommendLinkCss}
                          >
                            {item.title}
                          </Link>
                        </ListItem>
                        {item.id !== mostReachedData.length ? (
                          <Divider
                            orientation="vertical"
                            variant="fullWidth"
                            flexItem
                          />
                        ) : null}
                      </Box>
                    ))}
                  </List>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                gap={2}
              >
                {isLogin == false ? (
                  <NavLink style={{ color: 'initial' }} to={'/sign-in'}>
                    <Badge badgeContent={0} color="error">
                      <UserIcon
                        width={'26px'}
                        height={'26px'}
                        style={iconCssClass}
                      />
                    </Badge>
                  </NavLink>
                ) : (
                  <NavLink style={{ color: 'initial' }} to={'/'}>
                    <Badge badgeContent={0} color="error">
                      <ArrowLeftEndOnRectangleIcon
                        width={'26px'}
                        height={'26px'}
                        style={iconCssClass}
                        onClick={handleLogout}
                      />
                    </Badge>
                  </NavLink>
                )}

                <Badge badgeContent={wishlistBadge} color="error">
                  <HeartIcon
                    width={'26px'}
                    height={'26px'}
                    style={iconCssClass}
                    onClick={(event) => handleClickToLink(event, '/wishlist')}
                  />
                </Badge>
                <Badge badgeContent={cartBadge} color="error">
                  <ShoppingBagIcon
                    width={'26px'}
                    height={'26px'}
                    style={iconCssClass}
                    onClick={(event) => handleClickToLink(event, '/cart')}
                  />
                </Badge>
              </Stack>
            </Grid2>
          </>
        )}
      </Grid2>
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <Modal
        title="Search"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Search"
        cancelText="Cancel"
        centered
        style={{ padding: '20px' }}
      >
        <TextField
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          fullWidth
          sx={modalInputCss}
          slotProps={{
            input: {
              disableUnderline: true,
              sx: { ...flexCss, ...searchInputEleCss },
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon
                    style={{ width: '20px', height: '20px' }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <Row>
                  <InputAdornment position="end">
                    <MicrophoneIcon
                      width={24}
                      height={24}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMicrophoneClick();
                      }}
                    />
                  </InputAdornment>
                </Row>
              ),
            },
          }}
        />
      </Modal>
      <Modal
        title={null}
        closable={false}
        open={isSpeechModalVisible}
        onOk={handleSpeechModalOk}
        onCancel={handleSpeechModalCancel}
        className="speech-modal"
        footer={null}
        centered
        height={400}
        width={400}
        wrapStyle={{ backgroundColor: 'transparent' }}
        style={{ padding: '20px', backgroundColor: 'transparent' }}
      >
        <Row
          className="bar-wrapper"
          style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'skyblue',
            borderRadius: '50%',
          }}
          align={'middle'}
          justify={'center'}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </Row>
      </Modal>
    </Box>
  );
};

export default ContentHeader;
