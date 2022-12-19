import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, CircularProgress } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import * as Api from '../../helper/Api';
import Paths from '../../helper/Paths';
import StorageConstants from '../../helper/StorageConstants';
import toast from '../../helper/toast';
import { SearchDiv, SearchIconDiv } from '../../Styles/StyledDiv';
import StyledInputBase from '../../Styles/StyledInputBase';
import { authenticateTableData } from '../../utils/CommonUtils';
import { debounce } from '../../utils/fetchUtils';
import * as Props from '../GridTable/props';
import * as TableUtils from '../GridTable/tableUtils';
import Options from './options';

const type = 'VPMReference';

const TechniaSearch = () => {
  const headerKeys = Props.DEFAULT_COLUMN_KEYS;
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([
    {
      id: '',
      type: '',
      name: '',
      revision: '',
      title: '',
      current: '',
      description: '',
      owner: '',
    },
  ]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const fetch = React.useMemo(
    () =>
      debounce(
        _.throttle(async ({ spaceUrl, input }, callback) => {
          try {
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
          } catch (error) {
            console.error(error);
            toast.error(error);
            auth.logout();
            navigate(Paths.LOGIN);
          }
          return null;
        }, 800),
        500
      ),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    const spaceUrl = localStorage.getItem(StorageConstants.SPACE3d);

    fetch({ spaceUrl, input: inputValue }, (response) => {
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
        typeof option === 'string' ? option : option.title
      }
      renderTags={() => null}
      noOptionsText="No Objects Found"
      disableCloseOnSelect
      onChange={(event, newValue) => {
        event.preventDefault();
        setValue(null);
        const path = `${Paths.TYPE}/${type}/${newValue.id}`;
        navigate(path);
        setLoading(false);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option) => (
        <Options props={props} option={option} key={option.id} />
      )}
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
                <CircularProgress color="inherit" style={{ padding: '10px' }} />
              ) : null
            }
          />
        </SearchDiv>
      )}
    />
  );
};

export default TechniaSearch;
