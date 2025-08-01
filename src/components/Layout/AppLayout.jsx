import { Outlet } from "react-router";
import Footer from "../Ui/Footer";
import Header from "../Ui/Header";
import ScrollToTop from "../Ui/ScrollToTop";
import { BackToTop } from "../Ui/BackToTop";

const AppLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  );
};

export default AppLayout;
