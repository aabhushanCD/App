var ServerApi;

var SocketApi;
if (window.location.hostname === "localhost") {
  // Frontend is opened on localhost
  ServerApi = "http://localhost:8000/api";
  SocketApi = "http://localhost:8000";
} else {
  // Frontend is opened on LAN IP
  // Replace with your LAN IP backend address
  ServerApi = "http://192.168.1.66:8000/api";
  SocketApi = "http://192.168.1.66:8000";
}

export { ServerApi, SocketApi };
