import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {Autocomplete as MuiAutocomplete} from "@material-ui/lab";
import useHttp from "../../../common/network/useHttp";
import getPeripherals from "../presenter/getPeripherals";
import { error } from "../../../common/utils/logger/logger";
import isEmpty from "../../../common/components/validation/is-empty";
import { CircularProgress, TextField, Typography } from "@material-ui/core";

const Autocomplete = function({ exclusion, autoFocus,  onChange }) {

  const timeout = useRef(undefined);
  const [peripherals, setPeripherals] = useState([]);
  const [peripheral, setPeripheral] = useState("")

  const [isGettingPeripherals, runGetPeripherals] = useHttp(
    useCallback((filters) => getPeripherals(filters), []),
    useCallback((result) => setPeripherals(result), []),
    useCallback((throwable) => {
      error(throwable, "Autocomplete.jsx");
    }, [])
  );

  const doOnChange = useCallback((event) => {
    clearTimeout(timeout.current);
    const search = event.target.value;
    timeout.current = setTimeout(() => {
      runGetPeripherals(true, { uid: search , pageSize: 5 })
    }, 1000)
  }, [timeout, exclusion, runGetPeripherals])

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [timeout])

  return (
    <MuiAutocomplete
      id={"peripherals-autocomplete"}
      freeSolo
      fullWidth
      value={peripheral}
      options={peripherals}
      onChange={(event, value) => {
        setPeripheral(value)
        onChange(value);
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (isEmpty(option)) {
          return "";
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return `${option.uid}`;
      }}
      renderOption={(option) => `${option.uid}`}
      loading={isGettingPeripherals}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus={autoFocus}
          onFocus={doOnChange}
          onChange={doOnChange}
          label="Search Peripherals"
          size={"medium"}
          variant={"outlined"}
          helperText={
            <span>
              Search the Peripheral by its <b>UID</b>
            </span>
          }
          FormHelperTextProps={{
            component: Typography,
            noWrap: true
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isGettingPeripherals ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

export default memo(Autocomplete);