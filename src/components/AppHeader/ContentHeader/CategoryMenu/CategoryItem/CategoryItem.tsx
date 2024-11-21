import { Link, MenuItem, styled } from '@mui/material';

interface CategoryItemProps {
  title: string;
}

const CustomizedLink = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: #000;
  font-weight: 500;
  margin: 0;
  width: 100%;
  text-transform: capitalize;
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    background-color: transparent !important;
    color: #f03333;
  }
  &::before {
    content: '';
    position: relative;
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #d6d6d6;
    margin-right: 15px;
  }
`;

const CategoryItem = ({ title }: CategoryItemProps) => {
  return (
    <MenuItem
      sx={{
        position: 'unset',
        width: '100%',
        p: 0,
        listStyle: 'none',
        borderBottom: 'thin solid #e9e9e9',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <CustomizedLink href={`/product/?category=${title}`}>{title}</CustomizedLink>
    </MenuItem>
  );
};

export default CategoryItem;
