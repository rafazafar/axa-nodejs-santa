import transporter from "../configs/smtp";
import express from "express";
import https from "https";
const router = express.Router();

const emailQueue = [];
let isProcessing = false;

// add a new request to the queue
router.get("/request", async (req, res) => {
  const usersDataSource =
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
  const userProfilesDataSource =
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";

  try {
    const [users, userProfiles] = await Promise.all(
      [usersDataSource, userProfilesDataSource].map(
        (url) =>
          new Promise((resolve, reject) => {
            https
              .get(url, (response) => {
                let data = "";

                response.on("data", (chunk) => {
                  data += chunk;
                });

                response.on("end", () => {
                  resolve(data);
                });
              })
              .on("error", (error) => {
                console.error(error);
                reject(error);
              });
          })
      )
    );

    console.table(users);
    console.table(userProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching URLs");
  }

  const { username, address, request } = req.body;
  const requestsText = `Child username: ${username}\nChild's address: ${address}\nRequest: ${request}\n`;
  const mailOptions = {
    from: "do_not_reply@northpole.com",
    to: "alexandria.spinka@ethereal.email",
    subject: `New request from ${req.query.name}`,
    text: requestsText,
  };
  emailQueue.push(mailOptions);
  if (!isProcessing) processQueue();
  res.sendStatus(200);
});

// process the queue
const processQueue = () => {
  isProcessing = true;
  if (emailQueue.length > 0) {
    const mailOptions = emailQueue.shift();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    // timout 15 seconds before processing the next request
    console.log("Remaining Emails: " + emailQueue.length);
    setTimeout(processQueue, 1000 * 60);
  } else {
    isProcessing = false;
  }
};

export default router;
