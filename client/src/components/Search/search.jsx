import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, CircularProgress } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as EnoviaApi from '../../api/EnoviaApi';
import Paths from '../../helper/Paths';
import toast from '../../helper/toast';
import { SearchDiv, SearchIconDiv } from '../../Styles/StyledDiv';
import StyledInputBase from '../../Styles/StyledInputBase';
import { authenticateTableData } from '../../utils/CommonUtils';
import { debounce } from '../../utils/fetchUtils';
import { TYPES } from '../../utils/ServiceUtils';
import { formatRows } from '../../utils/TableUtils';
import { DEFAULT_COLUMNS } from '../Table/Columns/DefaultColumns';
import Options from './options';

const type = TYPES[0];

const TechniaSearch = () => {
  const columns = DEFAULT_COLUMNS;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
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
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const fetch = useMemo(
    () =>
      debounce(
        _.throttle(async ({ input }, callback) => {
          try {
            setLoading(true);
            const response = await EnoviaApi.searchObjects(type, 30, 0, input);
            callback(response);
            setLoading(false);
            return response;
          } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error(`Error: ${error}`);
          }
          return null;
        }, 800),
        500
      ),
    []
  );

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (response) => {
      if (active && authenticateTableData(response)) {
        const allRows = formatRows(response, columns);
        setOptions(allRows);
      }
    });

    return () => {
      active = false;
      setLoading(false);
    };
  }, [value, inputValue, fetch, columns]);

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
