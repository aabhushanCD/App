import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../header/navBar";
import Footer from "../footer/Footer";
const Home = () => {
  const images = [
    "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
    "https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896",
    "https://static.vecteezy.com/system/resources/thumbnails/021/746/785/small/holding-a-tree-in-a-ball-ecology-and-environment-concept-with-generative-ai-photo.jpg",
    "https://img.freepik.com/free-photo/animal-eye-staring-close-up-watch-nature-generative-ai_188544-15471.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const cardStyles = {
    feature: {
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      color: "#fff",
    },
    quickStats: {
      background: "linear-gradient(135deg, #ff6a00, #ee0979)",
      color: "#fff",
    },
    welcome: {
      background: "linear-gradient(135deg, #56ab2f, #a8e063)",
      color: "#fff",
    },
  };

  return (
    <>
      <Navbar />
      <Container>
        {/* Carousel Section */}
        <Box mb={4}>
          <Slider {...settings}>
            {images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    filter: "brightness(70%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h3" fontWeight="bold">
                    Explore Emerging World
                  </Typography>
                  <Typography variant="h5">Learn, Grow</Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Content Section */}
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12} md={6}>
            <Card style={cardStyles.welcome}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Welcome Back!
                </Typography>
                <Typography variant="body1">
                  Ready to dive into your data? Let's make today productive!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={6}>
            <Card style={cardStyles.quickStats}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Quick Stats
                </Typography>
                <Typography variant="body1">
                  120 New Users | 45 Tasks Pending | 10 Alerts
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Cards */}
          <Grid item xs={12} md={4}>
            <Card style={cardStyles.feature}>
              <CardContent>
                <Typography variant="h6">Feature 1</Typography>
                <Typography variant="body2">
                  Advanced analytics and insights to boost performance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={cardStyles.feature}>
              <CardContent>
                <Typography variant="h6">Feature 2</Typography>
                <Typography variant="body2">
                  Seamless collaboration tools for your team.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={cardStyles.feature}>
              <CardContent>
                <Typography variant="h6">Feature 3</Typography>
                <Typography variant="body2">
                  Fully customizable dashboards for your needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
