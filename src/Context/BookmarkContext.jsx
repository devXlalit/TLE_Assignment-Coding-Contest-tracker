import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const toggleBookmark = (contest) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((item) => item.name === contest.name);
      const updatedBookmarks = isBookmarked
        ? prev.filter((item) => item.name !== contest.name)
        : [...prev, contest];

      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
