import TopHeader from './TopHeader/TopHeader';
import Navbar from './Navbar/Navbar';
import ContentHeader from './ContentHeader/ContentHeader';

export default function AppHeader() {
  return (
    <>
      <TopHeader />
      <ContentHeader />
      <Navbar />
    </>
  );
}
