import React from "react";
import {
  ipAddress,
  dns as Dns,
  phone as Phone,
  upperCase,
  lowerCase,
  number,
  specialCharacter,
  whiteSpace,
} from "../../utils/regex";
import * as yup from "yup";
import isEmpty from "./is-empty";

const ip = (invalid, required = undefined) =>
  function () {
    let value = this;
    if (required !== undefined) {
      value = value.required(required);
    }
    return value.matches(ipAddress, {
      excludeEmptyString: true,
      message: invalid,
    });
  };

function equality(required, value) {
  return this.required(required)
    .lowercase()
    .test(
      "string-equality",
      <span>
        Type the word <b>{value}</b>
      </span>,
      (element) => element === value?.toLowerCase()
    );
}

function dns() {
  const invalid = "Invalid DNS servers";
  return this.matches(Dns, {
    excludeEmptyString: true,
    message: invalid,
  });
}

function name(required) {
  return this.trim().required(required);
}

function email() {
  return this.trim()
    .required("Email address is required")
    .email("Email address is invalid");
}

function phone() {
  return this.required("Phone Number is required")
    .transform(function (value) {
      if (isEmpty(value)) {
        return value;
      }
      return `1${value}`;
    })
    .matches(Phone, {
      excludeEmptyString: true,
      message: "Invalid Phone Number",
    });
}

function password() {
  return this.transform((value, originalValue) =>
    whiteSpace.test(originalValue) ? NaN : value
  )
    .required(
      <span>
        <b>fususCORE</b> password is required
      </span>
    )
    .min(
      8,
      "Password is too short, should have at least 8 characters"
    )
    .matches(upperCase, {
      excludeEmptyString: true,
      message: (
        <span>
          Password requires at least one <b>UPPER</b> case letter
        </span>
      ),
    })
    .matches(lowerCase, {
      excludeEmptyString: true,
      message: (
        <span>
          Password requires at least one <b>LOWER</b> case letter
        </span>
      ),
    })
    .matches(number, {
      excludeEmptyString: true,
      message: "Password requires at least one numeric character",
    })
    .matches(specialCharacter, {
      excludeEmptyString: true,
      message: "Use one special character: -_=+.,<>/?{}!@#$%^&*()",
    });
}

function code() {
  return this.required(
    <span>
      <b>fususCORE</b> code is required
    </span>
  ).length(
    8,
    <span>
      <b>fususCORE</b> code must have 8 characters
    </span>
  );
}

function confirm() {
  return this.required("Password confirmation is required").oneOf(
    [yup.ref("password"), null],
    "Both passwords don't match... Please re-check them."
  );
}

const subnet = ip("Invalid subnet mask", "Subnet mask is required");
const gateway = ip("Invalid gateway");

function ipv4(
  invalid = "Invalid ip address",
  required = "IP address is required"
) {
  let value = this;
  if (required !== null) {
    value = value.required(required);
  }
  return value.matches(ipAddress, {
    excludeEmptyString: true,
    message: invalid,
  });
}

yup.addMethod(yup.string, "ip", ipv4);
yup.addMethod(yup.string, "mask", subnet);
yup.addMethod(yup.string, "gateway", gateway);
yup.addMethod(yup.string, "dns", dns);
yup.addMethod(yup.string, "name", name);
yup.addMethod(yup.string, "address", email);
yup.addMethod(yup.string, "phone", phone);
yup.addMethod(yup.string, "password", password);
yup.addMethod(yup.string, "confirm", confirm);
yup.addMethod(yup.string, "code", code);
yup.addMethod(yup.string, "equality", equality);

export default yup;
