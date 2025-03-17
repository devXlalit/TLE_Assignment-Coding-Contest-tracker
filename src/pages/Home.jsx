import React, { useState, useEffect } from "react";
import ContestCard from "../components/ContestCard";

const Home = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [platform, setPlatform] = useState("all");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Fetching separately for each platform
        const leetcodePromise = fetch(
          `https://clist.by/api/v4/contest/?upcoming=true&format=json&host=leetcode.com&username=lalit&api_key=${apikey}`
        ).then((res) => res.json());

        const codeforcesPromise = fetch(
          `https://clist.by/api/v4/contest/?upcoming=true&format=json&host=codeforces.com&username=lalit&api_key=${apikey}`
        ).then((res) => res.json());

        const codechefPromise = fetch(
          `https://clist.by/api/v4/contest/?upcoming=true&format=json&host=codechef.com&username=lalit&api_key=${apikey}`
        ).then((res) => res.json());

        // Await all responses
        const [leetcodeData, codeforcesData, codechefData] = await Promise.all([
          leetcodePromise,
          codeforcesPromise,
          codechefPromise,
        ]);

        // Combine all contests
        const allContests = [
          ...leetcodeData.objects,
          ...codeforcesData.objects,
          ...codechefData.objects,
        ];

        // Format the data
        const formattedContests = allContests.map((contest) => ({
          id: contest.id,
          name: contest.event,
          site: contest.host.replace(".com", ""), // Extract platform name
          url: contest.href,
          start_time: new Date(contest.start).toLocaleString(),
          end_time: new Date(contest.end).toLocaleString(),
          duration: (contest.duration / 3600).toFixed(2) + " hrs", // Convert to hours
        }));

        setContests(formattedContests);
        setFilteredContests(formattedContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  // Apply filtering based on platform selection
  useEffect(() => {
    if (platform === "all") {
      setFilteredContests(contests);
    } else {
      setFilteredContests(
        contests.filter((contest) =>
          contest.site.toLowerCase().includes(platform)
        )
      );
    }
  }, [platform, contests]);

  return (
    <div>
      <h1 className="text-2xl font-bold px-4 md:px-14 py-8">
        Upcoming Contests
      </h1>

      {/* Platform Filter Buttons */}
      <div className="flex flex-wrap gap-4 px-4 md:px-14 pb-5">
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

      {/* Contest Cards */}
      <div className="px-4 md:px-20 grid md:grid-cols-3 gap-5">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))
        ) : (
          <p>No contests available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
