import axios from "axios";

export const api_key = "AIzaSyBVewXTsR8N6I7L81pvPm41GvwYUOzfMEc";


const convertNumber = (num) => {
  let number;

  if (num < 1000) {
    return num;
  } else if (num > 1000 && num < 1000000) {
    number = Math.floor(num / 1000) + "K";
    return number;
  } else if (num > 1000000) {
    number = Math.floor(num / 1000000) + "M";
    return number;
  }
};
const convertTime = time=>{

  let timeVideo = "";
  let currentDate = new Date(); //تاریخ فعلی
  let publishedDateTime = new Date(time);
  let timePasse = currentDate - publishedDateTime; //میزان زمان سپری شده
  let daysPassed = Math.floor(timePasse / (1000 * 60 * 60 * 24));
  let hoursPassed = Math.floor(timePasse / (1000 * 60 * 60));
  let weeksPassed = Math.floor(daysPassed / 7);
  let mounthPassed = Math.floor(daysPassed / 31);
  let yearPassed = Math.floor(daysPassed / 365);

  if (daysPassed < 1) {
    timeVideo = hoursPassed + "hours ago";
  } else if (daysPassed >= 1 && daysPassed <= 7) {
    timeVideo = daysPassed + " days ago ";
  } else if (daysPassed > 7 && daysPassed <= 31) {
    timeVideo = weeksPassed + "weeks ago";
  } else if (daysPassed > 31 && daysPassed <= 365) {
    timeVideo = mounthPassed + "mounth ago";
  } else if (daysPassed > 366) {
    timeVideo = yearPassed + "years ago";
  }
  return timeVideo
}

export {
  convertNumber,
  convertTime
};
