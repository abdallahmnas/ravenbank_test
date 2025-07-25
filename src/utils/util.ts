import moment from "moment-timezone";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "./config";

const Utils = {
  currentTimestamp: () => {
    return Date.now();
  },
  dateConvert: (data: string): string => {
    var d = new Date(data);
    return (
      d.toLocaleString("en-us", { day: "2-digit" }) +
      "-" +
      d.toLocaleString("en-us", { month: "short" }) +
      "-" +
      d.toLocaleString("en-us", { year: "numeric" })
    );
  },

  dateDifference: (first: string, second: string): number => {
    var date1 = new Date(first);
    var date2 = new Date(second);
    var oneDay = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.abs((date1.getTime() - date2.getTime()) / oneDay);

    return diffDays;
  },
  generateRandomNumber: (length: number) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);
    return Math.floor(Math.random() * (max - min) + min);
  },
  randomOtp: (count = 6) => {
    return (
      Math.floor(Math.random() * 8 + 1) +
      Math.random()
        .toString()
        .slice(2, count + 1)
    );
  },

  randomRef: (keyLength = 24) => {
    let i: number,
      key = "",
      characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let charactersLength = characters.length;

    for (i = 0; i < keyLength; i++) {
      key += characters.substr(
        Math.floor(Math.random() * charactersLength + 1),
        1
      );
    }

    return key;
  },
 

   
  customRef: (): string => {
    return (
      moment.tz("Africa/Lagos").format("YYMMDDHHmmssSSS") +
      Utils.generateRandomNumber(5)
    );
  },

  hashEncrypt: (val: any) => {
    var hash = crypto.createHash("sha512");
    //passing the data to be hashed
    const data = hash.update(`${val}`, "utf-8");
    //Creating the hash in the required format
    return data.digest("hex");
  },
  paginate: (totalCount: number, limit: number, page: number) => {
    const allPages: any = Math.ceil(totalCount / limit);
    let paginate: any = { pages: 0, prev: 0, next: 0 };
    paginate.pages = allPages;
    paginate.total = totalCount;

    if (page > 1) {
      paginate.prev = page - 1;
    }
    if (page < allPages) {
      paginate.next = page + 1;
    }

    return paginate;
  },
  getSignedToken: (payload: any) => {
    return jwt.sign(payload, Config.jwtSecret);
  },
  nameSplitter: (name: string): { firstName: string; lastName: string } => {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ");

    return { firstName, lastName };
  },
};

export default Utils;
