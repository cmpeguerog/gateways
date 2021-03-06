export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const upperCase = /[A-Z]/;
export const lowerCase = /[a-z]/;
export const number = /[0-9]/;
export const specialCharacter = /[-_=+.,<>/?{}!@#$%^&*()]/;
export const whiteSpace = /\s/;
export const ipAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
export const dns = /^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5]))(,\s*(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])))*$/;
export const phone = /^(1\s?)((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/;
