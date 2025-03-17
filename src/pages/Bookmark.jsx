import React from "react";
import { useBookmarks } from "../Context/BookmarkContext";
import ContestCard from "../components/ContestCard";

const Bookmark = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div>
      <h1 className="text-2xl px-4 md:px-14 py-8 font-bold">
        Bookmarked Contests
      </h1>
      {bookmarks.length === 0 ? (
        <p className="px-4 md:px-14 py-8">No bookmarks yet!</p>
      ) : (
        <div className="px-4 md:px-20 grid md:grid-cols-3 gap-5">
          {bookmarks.map((contest) => (
            <ContestCard key={contest.name} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
