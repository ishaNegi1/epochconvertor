const currentEpochTime = document.querySelector(".currentEpochTime");
const currentLocalTime = document.querySelector(".currentLocalTime");
const currentUTCTime = document.querySelector(".currentUTCTime");
const epochUnix = document.getElementById("epochUnix");
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const zone = new Intl.DateTimeFormat().resolvedOptions();
const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

setInterval(() => {
  const currentDetails = new Date();
  const epoch = Date.now();
  const epochSeconds = Math.floor(epoch / 1000);
  currentEpochTime.innerHTML = epochSeconds;
  currentLocalTime.innerHTML = currentDetails.toLocaleString(zone.locale, {
    timeZone: zone.timeZone,
  });
  currentUTCTime.innerHTML = currentDetails.toLocaleString(zone.locale, {
    timeZone: "GMT",
  });
}, 1000);

epochUnix.setAttribute("value", Math.floor(Date.now() / 1000));
let date = new Date();
year.setAttribute("value", date.getFullYear());
month.setAttribute("value", date.getMonth() + 1);
day.setAttribute("value", date.getDate());
hour.setAttribute("value", date.getHours());
minute.setAttribute("value", date.getMinutes());
second.setAttribute("value", date.getSeconds());

btn0.addEventListener("click", changeToHuman);
let initialTimestamp = null;
function changeToHuman() {
  let a = parseInt(epochUnix.value, 10) * 1000;
  let convertedDate = new Date(a);
  let gmtTime = convertedDate.toLocaleString(zone.locale, { timeZone: "GMT" });
  let localTime = convertedDate.toLocaleString(zone.locale, {
    timeZone: zone.timeZone,
  });
  const relativeDate = new Date();
  const relativeTimestamp = relativeDate.getTime();
  const relativeSeconds = Math.floor(relativeTimestamp / 1000);
  let output;
  if (initialTimestamp === null) {
    initialTimestamp = relativeSeconds;
    output = "few seconds ago";
  } else {
    const difference = relativeSeconds - initialTimestamp;
    if (difference < 60) {
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
      output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
      output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
      output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
      output = `${Math.floor(difference / 31449600)} years ago`;
    }
  }
  result1.innerHTML =
    "<b>GMT:</b> " +
    gmtTime +
    "<br><b>Your time zone:</b> " +
    localTime +
    "<br><b>Relative</b> " +
    output;
}

btn1.addEventListener("click", changeToUnix);
function changeToUnix() {
  let setYear = year.value;
  let setMonth = month.value;
  let setDay = day.value;
  let setHour = hour.value;
  let setMinute = minute.value;
  let setSecond = second.value;
  let b = new Date(
    setYear,
    setMonth - 1,
    setDay,
    setHour,
    setMinute,
    setSecond
  );
  timeInUnix = b.getTime();
  let unixTimestamp = Math.floor(timeInUnix / 1000);
  let displayInDateTime = new Date(timeInUnix);
  result2.innerHTML =
    "<b>Timestamp in seconds: </b> " +
    unixTimestamp +
    "<br><b>GMT:</b> " +
    displayInDateTime.toLocaleString(zone.locale, { timeZone: "GMT" }) +
    "<br><b>Your time zone:</b> " +
    displayInDateTime.toLocaleString(zone.locale, { timeZone: zone.timeZone });
}
