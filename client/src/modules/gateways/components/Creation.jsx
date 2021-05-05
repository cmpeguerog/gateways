import React, { memo, useCallback, useState } from "react";
import { createStyles, Grid, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import { useGateways } from "../context/Context";
import "../../../common/components/validation/yup-validation";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "../../../common/utils/logger/logger";
import Scrollbar from "../../../common/components/scrollbars/Scrollbar";
import isEmpty from "../../../common/components/validation/is-empty";
import Button from "../../../common/components/buttons/Button";
import Autocomplete from "./Autocomplete";
import Hidden from "../../../common/components/permissions/Hidden";
import Peripheral from "./Peripheral";
import useHttp from "../../../common/network/useHttp";
import addGateway from "../presenter/addGateway";

const useStyles = makeStyles(({typography: {pxToRem}, palette: {grey}}) => createStyles({
  root: {
    padding: "8px 0",
    width: "100%",
    height: "100%",
  },

  container: {
    padding: "0 16px"
  },

  header: {
    padding: "0 8px 8px",
  },

  title: {
    fontSize: pxToRem(17),
    fontWeight: 600,
    margin: "0 0 0 8px",
    color: "inherit"
  },

  info: {
    fontSize: pxToRem(15),
    color: grey[600],
    fontWeight: 450,
    margin: "8px 0",
  },

  "input-root": {
    padding: "8px 0",
    width: "100%",
  },

  input: {
    width: "100%"
  },

  peripheral: {
    fontSize: pxToRem(15),
    color: grey[600],
    fontWeight: 450,
    margin: "8px 0",
  },

  autocomplete: {
    width: "100%",
    margin: "16px 0 8px",
  },

  action: {
    margin: "4px 0 0 8px"
  },

  item: {
    width: "100%"
  },

  footer: {
    padding: "8px 8px 0"
  }
}))

const schema = yup.object().shape({
  name: yup.string().name(
    <span>
      Gateway <b>Name</b> is required
    </span>
  ),
  address: yup.string().ip(
    (
      <span>
        Invalid Gateway <b>IP Address</b>
      </span>
    ),
    (
      <span>
         Gateway <b>IP Address</b> is required
      </span>
    )
  )
})

const forms = [
  {
    key: "name",
    label: "Name *",
    helperText: (
      <span>
        Enter gateway <b>Name</b>
      </span>
    ),
  },
  {
    key: "address",
    label: "IP Address *",
    helperText: (
      <span>
        Enter gateway <b>IP Address</b>
      </span>
    ),
  },
];

const Creation = function() {
  const classes = useStyles();
  const {updateGatewaysCtx} = useGateways();
  const [peripherals, setPeripherals] = useState([]);
  const [peripheral, setPeripheral] = useState(undefined);

  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const [isCreating, runCreate] = useHttp(
    useCallback((params) => addGateway(params), []),
    useCallback(() => {
      updateGatewaysCtx({ fetch: true, create: false })
    }, [updateGatewaysCtx]),
    useCallback((throwable) => error(throwable, "Creation.jsx"), [])
  )

  const doOnSubmit = useCallback(({ name, address }) => {
    runCreate(true, {
      name,
      address,
      peripherals: peripherals.map(({_id}) => _id)
    })
  }, [runCreate, peripherals])

  return (
    <Grid
      className={classes.root}
      container
      direction={"column"}
      alignItems={"stretch"}
      component={"form"}
      onSubmit={handleSubmit(doOnSubmit)}
    >
      <Grid
        className={classes.header}
        container
        item
        alignItems={"center"}
      >
        <IconButton
          aria-label={"menu"}
          onClick={() => updateGatewaysCtx({ create: false })}
        >
          <Close />
        </IconButton>

        <Typography
          className={classes.title}
        >
          New Gateway
        </Typography>
      </Grid>

      <Grid
        item
        xs
      >

        <Scrollbar scale={"match parent"}>
          <Grid
            className={classes.container}
            container
            alignItems={"stretch"}
          >
            <Typography
              className={classes.info}
            >
              <li>
                Add the <b>Name</b> and <b>IP Address</b> for the new Gateway.
              </li>
            </Typography>

            {forms.map(({ key, label, helperText }, index) => (
              <Grid
                className={classes["input-root"]}
                item
                key={index}
              >
                <Controller
                  name={key}
                  control={control}
                  render={({field}) => (
                    <TextField
                      className={classes.input}
                      autoFocus={index === 0}
                      fullWidth
                      {...field}
                      label={label}
                      variant={"outlined"}
                      FormHelperTextProps={{
                        component: Typography,
                        noWrap: true,
                      }}
                      helperText={errors[key]?.message ?? helperText}
                      error={!isEmpty(errors[key]?.message)}
                    />
                  )}
                />
              </Grid>
            ))}

            <Typography
              className={classes.peripheral}
            >
              <li>
                Type the UID of the <b>Peripheral</b> and then click add.
              </li>
              <li>
                Only 10 peripherals pero Gateway is allowed.
              </li>
            </Typography>

            <Hidden when={peripherals?.length >= 10}>
              <Grid
                className={classes.autocomplete}
                container
                item
                alignItems={"flex-start"}
              >
                <Grid
                  item
                  xs
                >
                  <Autocomplete
                    autoFocus={false}
                    onChange={setPeripheral}
                  />
                </Grid>

                <Grid
                  item
                >
                  <Hidden when={isEmpty(peripheral)}>
                    <IconButton
                      className={classes.action}
                      onClick={() => {
                        setPeripherals(prev => {
                          const exist = prev.findIndex(({_id}) => peripheral?._id === _id);
                          if (exist === -1) {
                            return prev.concat(peripheral)
                          }
                          return prev
                        })
                        setPeripheral(undefined)
                      }}
                    >
                      <Add/>
                    </IconButton>
                  </Hidden>
                </Grid>
              </Grid>
            </Hidden>

            {peripherals?.map((element, index) => (
              <Grid
                className={classes.item}
                item
                key={index}
              >
                <Peripheral
                  peripheral={element}
                  onDelete={(value) => {
                    setPeripherals(prev => prev
                      .filter(({ _id }) => _id !== value._id)
                    )
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Scrollbar>
      </Grid>

      <Grid
        className={classes.footer}
        container
        item
        justify={"flex-end"}
      >
        <Button
          variant={"contained"}
          type={"submit"}
          color={"primary"}
          withProgress={isCreating}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default memo(Creation);