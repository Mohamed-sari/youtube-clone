import React, { useState, useEffect } from 'react';
import { fetchVideos } from './YoutubeAPI';
import VideoList from './VideoList';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('React tutorials');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchVideos(searchTerm);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      }
    };
    loadVideos();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      setSearchTerm(query);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">YouTube Clone</h1>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="border rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-r hover:bg-red-700"
          >
            Search
          </button>
        </form>
      </header>
      <main className="p-4">
        {selectedVideo ? (
          <div className="mb-4">
            <iframe
              className="w-full h-64 md:h-96"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="mt-4 text-red-600 underline"
              onClick={() => setSelectedVideo(null)}
            >
              Back to Video List
            </button>
          </div>
        ) : (
          <VideoList videos={videos} onVideoClick={handleVideoClick} />
        )}
      </main>
    </div>
  );
};

export default App;
