
import Header from "./components/header/Navbar";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Services from "./components/home/Serives";
import Navbarmoblie from "./components/header/Navbarmoblie";
import Footer from "./components/Footer";
import Articles from "./components/Article/Article";
import Offers from "./components/Offers/Offers";
import Contact from "./components/Contacts/Contact";
export default async function Home() {
  return (
    <>
      <Header/>
      <Hero />
      <About />
      <Services />
      <Navbarmoblie />
      <Articles/>
      <Offers />
      <Contact />
      <Footer />
    </>
  );
}
