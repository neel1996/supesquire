import { Grid } from "@mui/material";
import History from "./History";
import Hero from "./Hero";

export default function Chat() {
  return (
    <Grid container xs={12}>
      <Grid xs={3}>
        <History />
      </Grid>
      <Grid xs={9}>
        <Hero />
      </Grid>
    </Grid>
  );
}
