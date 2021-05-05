export default function truncate(str, maxLength) {
  if (str) {
    return str.length <= maxLength
      ? str
      : str.substring(0, maxLength) + "...";
  } else {
    return "...";
  }
}
