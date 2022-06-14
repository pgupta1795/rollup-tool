import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import * as Api from "../../utils/Api";
import StorageConstants from "../../utils/StorageConstants";
import { authenticateTableData } from "../Auth/RequireAuth";
import * as Props from "../GridTable/props";
import * as TableUtils from "../GridTable/tableUtils";
import throttle from "lodash/throttle";
import { useNavigate } from "react-router-dom";
import { SearchDiv, SearchIconDiv } from "../../Styles/StyledDiv";
import { StyledInputBase } from "../../Styles/StyledInputBase";
import Paths from "../../utils/Paths";

const type = "VPMReference";

const TechniaSearch = () => {
  const headerKeys = Props.DEFAULT_COLUMN_KEYS;
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([
    {
      id: "",
      type: "",
      name: "",
      revision: "",
      title: "",
      current: "",
      description: "",
      owner: "",
    },
  ]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const navigate = useNavigate();

  const fetch = React.useMemo(
    () =>
      Api.debounce(
        throttle(async ({ type, spaceUrl, input }, callback) => {
          setLoading(true);
          const response = await Api.searchObjects(
            type,
            spaceUrl,
            30,
            0,
            input
          );
          callback(response);
          setLoading(false);
          return response;
        }, 800),
        500
      ),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    const spaceUrl = localStorage.getItem(StorageConstants.SPACE3d);

    fetch({ type: type, spaceUrl: spaceUrl, input: inputValue }, (response) => {
      if (active && authenticateTableData(response)) {
        const allRows = TableUtils.getRows(response, headerKeys);
        setOptions(allRows);
      }
    });

    return () => {
      active = false;
      setLoading(false);
    };
  }, [value, inputValue, fetch, headerKeys]);

  const renderOption = (props, option) => {
    return (
      <li key={option.id} {...props}>
        <Grid container alignItems="center">
          <Grid item>
            <Box sx={{ color: "text.secondary", mr: 2 }}>
              {options.revision}
            </Box>
          </Grid>
          <Grid item xs>
            <Typography
              component={"span"}
              variant="subtitle1"
              color="text.secondary"
              style={{
                fontWeight: 700,
              }}
            >
              {option.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Name : {option.name}-{option.revision}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Owner : {option.owner}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description : {option.description}
            </Typography>
          </Grid>
        </Grid>
      </li>
    );
  };

  return (
    <Autocomplete
      id="enovia-api-search"
      loading={loading}
      options={options}
      value={value}
      includeInputInList
      filterSelectedOptions
      autoComplete
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      renderTags={() => null}
      noOptionsText="No Objects Found"
      disableCloseOnSelect
      onChange={(event, newValue) => {
        event.preventDefault();
        setValue(null);
        const path = `${Paths.HOME}/${type}/${newValue.id}`;
        navigate(path);
        setLoading(false);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={renderOption}
      renderInput={(params) => (
        <SearchDiv component="div">
          <SearchIconDiv>
            <SearchIcon />
          </SearchIconDiv>
          <StyledInputBase
            ref={params.InputProps.ref}
            placeholder="Search…"
            inputProps={params.inputProps}
            endAdornment={
              loading ? (
                <CircularProgress color="inherit" style={{ padding: "10px" }} />
              ) : null
            }
          />
        </SearchDiv>
      )}
    />
  );
};

export default TechniaSearch;
