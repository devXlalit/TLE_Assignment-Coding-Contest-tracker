import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PastContests from "./pages/PastContests";
import Profile from "./pages/Profile";
// import Footer from "./components/Footer";
import { BookmarkProvider } from "./Context/BookmarkContext";
import Bookmark from "./pages/Bookmark";
const App = () => {
  return (
    <BookmarkProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/past-contests" element={<PastContests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmark />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </BookmarkProvider>
  );
};

export default App;
