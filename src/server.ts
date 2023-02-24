import app from "./app";
import env from "./configs/env";

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`);
});
