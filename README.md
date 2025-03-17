# Contest Tracker App

A MERN website that fetch the contest details from the platforms like leetcode, codechef and codeforces and show the details to user, user can bookmark it, user get updated with all the upcomming and past contest with just one web app.

![Screenshot From 2025-03-17 10-40-59](https://github.com/user-attachments/assets/a8a5faac-9ecd-491c-bd30-80a613df5a5c)


## Demo Link

https://drive.google.com/file/d/18DVfGiKkwXLZzKNUgj-W6sLuyRRcLGQ0/view?usp=sharing


## Installation

Install my-project with bun or npm

```bash
git clone https://github.com/devXlalit/TLE_Assignment-Coding-Contest-tracker.git
```
```bash
cd TLE_Assignment-Coding-Contest-tracker
```
```bash
bun install
```
```bash
bun run dev
```
    
## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MondoDB


## API Used

#### For Contest data fetching.

```http
  https://clist.by/api/v4/constest/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get contest data by host (eg, leetcode, codechef, codeforces)

```http
GET https://clist.by/api/v4/contest/?upcoming=true&format=json&host=${host-website}.com&username=${username}&api_key=${apikey}
```

## YouTube Data API v3

#### For youtube video fetching.(find it on - Google cloud console)
```http
GET https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(contestName)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}
```
## Authors

- [@devXlalit](https://github.com/devXlalit)

