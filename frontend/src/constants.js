var ServerApi;

if (window.location.hostname === "localhost") {
  // Frontend is opened on localhost
  ServerApi = "http://localhost:8000/api";
} else {
  // Frontend is opened on LAN IP
  // Replace with your LAN IP backend address
  ServerApi = "http://192.168.1.67:8000/api";
}

export { ServerApi };
