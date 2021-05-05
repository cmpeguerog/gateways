const repeat = (str, times) => new Array(times + 1).join(str);

const pad = (num, maxLength) =>
  repeat("0", maxLength - num.toString().length) + num;

const formatTime = (time) =>
  `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(
    time.getSeconds(),
    2
  )}.${pad(time.getMilliseconds(), 3)}`;

const TAG = {
  ERROR: "[ERROR]:",
  DEBUG: "[DEBUG]:",
  INFO: "[INFO]:",
  WARNING: "[WARNING]:",
};

const options = {
  logger: console,
  level: "log",
  timestamp: true,
  colors: (tag) => {
    switch (tag) {
      case TAG.ERROR:
        return "#F20404";
      case TAG.DEBUG:
        return "#4CAF50";
      case TAG.INFO:
        return "#03A9F4";
      default:
        return "#8f329e";
    }
  },
};

export const log = (tag, message, file, collapse = false) => {
  const {logger, level, colors} = options;
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const time = new Date();

  const formattedTime = formatTime(time);
  const formatMessage = (tag, time) => {
    const parts = ["LOG >>"];
    parts.push(`%c${file} >>`);
    parts.push(`%c${tag}`);
    parts.push(`%c@ ${time}`);

    return parts.join(" ");
  };

  const messageCSS = [
    "color: inherit; font-weight: lighter;",
    `color: inherit; font-weight: bold;`,
    `color: ${colors(tag)}; font-weight: bold;`,
    "color: gray; font-weight: lighter;",
  ];
  const title = formatMessage(tag, formattedTime);
  if (collapse) {
    logger.groupCollapsed(`%c ${title}`, ...messageCSS);
  } else {
    logger.group(`%c ${title}`, ...messageCSS);
  }

  logger[level](
    `%c message `,
    `color: ${colors(tag)}; font-weight: bold;`,
    message
  );
  logger.groupEnd();
};

export const debug = (message, file, collapse = false) =>
  log(TAG.DEBUG, message, file, collapse);

export const info = (message, file, collapse = false) =>
  log(TAG.INFO, message, file, collapse);

export const error = (message, file, collapse = false) =>
  log(TAG.ERROR, message, file, collapse);

export const warning = (message, file, collapse = false) =>
  log(TAG.WARNING, message, file, collapse);
