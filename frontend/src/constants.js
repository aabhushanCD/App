var ServerApi;

var SocketApi;
if (window.location.hostname === "localhost") {
  // Frontend is opened on localhost
  ServerApi = "http://localhost:8000/api";
  SocketApi = "http://localhost:8000";
} else {
  // Frontend is opened on LAN IP
  // Replace with your LAN IP backend address
  ServerApi = "http://192.168.1.64:8000/api";
  SocketApi = "http://192.168.1.64:8000";
}

export { ServerApi, SocketApi };

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return diffInMinutes === 1
      ? "1 minute ago"
      : `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4)
    return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12)
    return diffInMonths === 1 ? "1 month ago" : `${diffInMonths} months ago`;

  const diffInYears = Math.floor(diffInDays / 365);
  return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
};
