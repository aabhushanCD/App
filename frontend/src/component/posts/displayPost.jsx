import { Box, Grid2, Container, Typography } from "@mui/material";

function DisplayPost() {
  return (
    <>
      <form action="Submit">
        <Grid2>
          <Grid2 item>
            <Typography variant="h6">{"Username"}</Typography>
            <Box>{"image/video"}</Box>
            <Box>{"Like / comment / share"}</Box>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
}

export default DisplayPost;
