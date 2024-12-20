import React from 'react';

const VideoList = ({ videos, onVideoClick }) => {
  if (!videos || videos.length === 0) {
    return <p className="text-center text-gray-500">No videos found. Please try again.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition cursor-pointer"
          onClick={() => onVideoClick(video)}
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">{video.snippet.title}</h3>
            <p className="text-sm text-gray-500 mt-2 truncate">
              {video.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
