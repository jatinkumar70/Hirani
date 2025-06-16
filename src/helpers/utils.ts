import moment from "moment";

/**
 * Formats the video publish date relative to the current time.
 *
 * @param {Date | string | moment.Moment} videoPublishDate - The publish date to format.
 * @returns {string} - The formatted date string relative to now.
 */
export function formatVideoPublishDate(videoPublishDate: string): string {
  const now = moment(); // Current date and time
  const publishMoment = moment(videoPublishDate);
  const diffInSeconds = now.diff(publishMoment, "seconds");

  if (diffInSeconds < 60) {
    return "less than a minute ago";
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = now.diff(publishMoment, "minutes");
    return `${diffInMinutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = now.diff(publishMoment, "hours");
    return `${diffInHours} hours ago`;
  } else if (diffInSeconds < 2592000) {
    // 30 days
    const daysAgo = now.diff(publishMoment, "days");
    return daysAgo === 1 ? "yesterday" : `${daysAgo} days ago`;
  } else if (diffInSeconds < 31536000) {
    // 1 year
    const diffInMonths = now.diff(publishMoment, "months");
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = now.diff(publishMoment, "years");
    return `${diffInYears} years ago`;
  }
}

/**
 * Formats a date into a readable string.
 *
 * @param {Date | string} date - The date to format. Can be a Date object or a date string.
 * @returns {string} - The formatted date string.
 */
// export function formatDate(date: string): string {

//   // Create a Date object from the input if it's a string
//   const dateObject = typeof date === "string" ? new Date(date) : date;

//   // Check if the date is valid
//   if (isNaN(dateObject.getTime())) {
//     throw new Error("Invalid date");
//   }

//   // Format the date using toLocaleDateString
//   return dateObject.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

/**
 * Formats a number into a readable string with suffixes for thousands, millions, and billions.
 *
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number string.
 */
export const formatNumber = (num: number): string => {
  if (isNaN(num)) {
    throw new Error("Invalid number");
  }

  let formattedNumber: string;

  if (num >= 1_000_000_000) {
    formattedNumber = (num / 1_000_000_000).toFixed(2);
    formattedNumber = parseFloat(formattedNumber).toString();
    return formattedNumber + "B";
  } else if (num >= 1_000_000) {
    formattedNumber = (num / 1_000_000).toFixed(2);
    formattedNumber = parseFloat(formattedNumber).toString();
    return formattedNumber + "M";
  } else if (num >= 1_000) {
    formattedNumber = (num / 1_000).toFixed(2);
    formattedNumber = parseFloat(formattedNumber).toString();
    return formattedNumber + "K";
  } else {
    return num.toString();
  }
};

export const landingPageTitle =
  "24x7 Roadside Assistance & Car Helpline Service | Nearby Mechanic";

export const description =
  "Crossroads Helpline is India's trusted solution for roadside emergency car services. We have the largest network of service providers for car breakdowns.";
