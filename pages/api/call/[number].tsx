import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const Number = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // Get user mobile number
    const {
      query: { number = "" }
    } = req;

    // Ensure we have a number
    const parsedNumber = String(number);
    const regex = /^\d{8}$/;
    const isValidNumber = parsedNumber.match(regex);

    // Throw error if number is missing or malformed
    // eslint-disable-next-line no-restricted-globals
    if (!number) {
      throw new Error("Skjerpings! Mobilnummeret mangler.");
    }

    if (number.length !== 8 || !isValidNumber) {
      throw new Error("Skjerpings! Mobilnummeret har feil format (8 siffer)");
    }

    // Throw error if not one of the pre-allowed numbers
    const isAllowedNumber =
      process.env.ALLOWED_NUMBERS?.includes(parsedNumber) || false;
    if (!isAllowedNumber) {
      throw new Error(
        "Sorry, vi kan for øyeblikket kun ringe godkjente nummer. Skal vi legge deg til på listen? Send en mail!"
      );
    }

    const message = {
      To: `+47${parsedNumber}`,
      From: process.env.FROM_NUMBER,
      Url: "https://kanduringemeg.no/voice.xml"
    };
    const formData = querystring.stringify(message);

    // Base 64 encode login data
    const login = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString("base64");

    const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Calls.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${login}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default Number;
