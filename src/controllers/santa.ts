import transporter from "../configs/smtp";
import fetch from "node-fetch";
import { NextFunction, Request, Response } from "express";
import dayjs from "dayjs";

interface User {
  username: string;
  uid: string;
}
interface UserProfile {
  userUid: string;
  address: string;
  birthdate: string;
}

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const emailQueue: EmailOptions[] = [];
let isProcessing = false;

const processQueue = () => {
  isProcessing = true;
  if (emailQueue.length > 0) {
    const mailOptions = emailQueue.shift();
    transporter.sendMail(mailOptions, (err) => {
      if (err) console.log(err);
    });
    setTimeout(processQueue, 1000 * 15);
  } else {
    isProcessing = false;
  }
};

export const addRequestToQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersDataFetch: Promise<User[]> = fetch(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
    ).then(async (res) => await res.json());
    const userProfilesDataFetch: Promise<UserProfile[]> = fetch(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
    ).then(async (res) => await res.json());

    const [users, userProfiles]: [User[], UserProfile[]] = await Promise.all([
      usersDataFetch,
      userProfilesDataFetch,
    ]);

    const { userid, wish } = req.body;

    // Check username exist in users.username
    const foundUser = users.find((user) => user.username === userid);
    if (!foundUser) {
      return res.redirect("/error?msg=Invalid username");
    }

    // Check if child is less than 10 years old by using uid.
    const userProfile = userProfiles.find(
      (profile) => profile.userUid === foundUser.uid
    );
    const age = dayjs().diff(dayjs(userProfile.birthdate), "y");
    if (age >= 10) {
      return res.redirect("/error?msg=Sorry, you are over 10 years old.");
    }

    const requestsText = `Child's username: ${userid}\nChild's address: ${userProfile.address}\nRequest: ${wish}\n`;
    const mailOptions = {
      from: "do_not_reply@northpole.com",
      to: "santa@northpole.com",
      subject: `New request from ${userid}`,
      text: requestsText,
    };
    emailQueue.push(mailOptions);
    if (!isProcessing) processQueue();
    return res.redirect("/sent");
  } catch (error) {
    next(error);
    return res.status(500).send("Error fetching URLs");
  }
};
