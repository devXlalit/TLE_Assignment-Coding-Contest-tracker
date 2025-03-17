import React, { useState, useEffect } from "react";
import ContestCard from "../components/ContestCard";

const YOUTUBE_API_KEY = "";

const PastContests = () => {
  const [pastContests, setPastContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("all");

  useEffect(() => {
    const fetchPastContests = async () => {
      try {
        const fetchContests = async (host) => {
          try {
            const response = await fetch(
              `https://clist.by/api/v4/contest/?upcoming=false&format=json&host=${host}&username=lalit&api_key=${apikey}`
            );
            const data = await response.json();
            return data.objects || [];
          } catch (error) {
            console.error(`Error fetching contests from ${host}:`, error);
            return [];
          }
        };

        // Fetch all platforms in parallel
        const [leetcodeData, codeforcesData, codechefData] = await Promise.all([
          fetchContests("leetcode.com"),
          fetchContests("codeforces.com"),
          fetchContests("codechef.com"),
        ]);

        let allPastContests = [
          ...leetcodeData,
          ...codeforcesData,
          ...codechefData,
        ];

        if (allPastContests.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch YouTube videos in parallel
        const youtubeResults = await Promise.allSettled(
          allPastContests.map((contest) => fetchYouTubeVideo(contest.event))
        );

        // Merge results with contest data
        const contestsWithVideos = allPastContests.map((contest, index) => ({
          id: contest.id,
          name: contest.event,
          site: contest.host.replace(".com", ""),
          url: contest.href,
          start_time: new Date(contest.start).toLocaleString(),
          end_time: new Date(contest.end).toLocaleString(),
          duration: (contest.duration / 3600).toFixed(2) + " hrs",
          videoUrl:
            youtubeResults[index].status === "fulfilled"
              ? youtubeResults[index].value
              : null,
        }));

        // Sort contests by start time (most recent first)
        const sortedContests = contestsWithVideos.sort(
          (a, b) => new Date(b.start_time) - new Date(a.start_time)
        );

        setPastContests(sortedContests);
      } catch (error) {
        console.error("Error fetching past contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastContests();
  }, []);

  // Fetch YouTube video based on contest name
  const fetchYouTubeVideo = async (contestName) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          contestName
        )}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0 && data.items[0].id.videoId) {
        return `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
      } else {
        console.warn("No YouTube video found for:", contestName);
      }
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
    return null;
  };

  // Filter contests based on selected platform
  const filteredContests =
    platform === "all"
      ? pastContests
      : pastContests.filter((contest) =>
          contest.site.toLowerCase().includes(platform)
        );

  return (
    <div className="px-4 md:px-14 py-8">
      <h2 className="text-2xl font-bold pb-5">Past Contests</h2>

      <div className="flex flex-wrap gap-4 pb-5">
        {["all", "leetcode", "codeforces", "codechef"].map((site) => (
          <button
            key={site}
            className={`px-4 py-2 rounded-lg ${
              platform === site
                ? "bg-blue-500 text-white"
                : "ring-1 ring-zinc-400"
            }`}
            onClick={() => setPlatform(site)}
          >
            {site.charAt(0).toUpperCase() + site.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredContests.length === 0 ? (
        <p>No past contests available.</p>
      ) : (
        <div className="md:px-6 grid  md:grid-cols-3 gap-5">
          {filteredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PastContests;
