import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useBookmarks } from "../Context/BookmarkContext";
import { FaArrowRight } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

const ContestCard = ({ contest }) => {
  const { name, start_time, site, url, duration } = contest;
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [remainingTime, setRemainingTime] = useState("");
  const [admin, setAdmin] = useState(true);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const contestStart = new Date(start_time).getTime();
      const diff = contestStart - now;

      if (diff <= 0) {
        setRemainingTime("Started");
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;

      setRemainingTime(
        days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`
      );
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [start_time]);

  const isBookmarked = bookmarks.some((item) => item.name === name);
  return (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      <div className="rounded-lg relative shadow-2xl ring-zinc-700 ">
        <img
          className="rounded-t-lg"
          src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
          alt=""
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(contest);
          }}
          className="absolute top-3 text-white right-4 cursor-pointer"
        >
          {isBookmarked ? (
            <FaBookmark size={22} />
          ) : (
            <FaRegBookmark size={22} />
          )}
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p>Time remaining: {remainingTime}</p>
          <p>Duration: {duration}</p>
        </div>
        {site.includes("leetcode") && (
          <SiLeetcode size={25} className="absolute text-white top-3 left-3" />
        )}
        {site.includes("codeforces") && (
          <SiCodeforces
            size={25}
            className="absolute text-white top-3 left-3"
          />
        )}
        {site.includes("codechef") && (
          <SiCodechef size={25} className="absolute text-white top-3 left-3" />
        )}
        {contest && (
          <a href={contest.videoUrl} target="_blank" rel="noopener noreferrer">
            <button
              className="flex items-center gap-1 cursor-pointer absolute px-2 py-1 text-white rounded-sm bg-blue-800 bottom-0 right-0"
              type="button"
            >
              View Solution <FaArrowRight />
            </button>
          </a>
        )}
        {admin && (
          <>
            <BsThreeDotsVertical
              onClick={(e) => {
                e.preventDefault();
                setMenu((prev) => !prev);
              }}
              className="absolute bottom-20 right-4"
            />
            {menu && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="flex items-center gap-1 absolute bottom-26 shadow-2xl bg-zinc-800 px-4 py-2 rounded-lg"
              >
                Change link -{" "}
                <input
                  className="p-1 outline-none bg-transparent ring-1 ring-zinc-400 rounded-lg"
                  contentEditable
                  type="text"
                  placeholder="New youtube link here."
                />
                <FaCheckCircle
                  onClick={(e) => {
                    e.preventDefault();
                    setMenu((prev) => !prev);
                  }}
                />
              </span>
            )}
          </>
        )}
      </div>
    </Link>
  );
};

export default ContestCard;
