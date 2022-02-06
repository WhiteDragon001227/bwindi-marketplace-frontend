/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 18/01/2022 - 21:38:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { alpha, styled } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import { TextField,Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const CssTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
  },
});

const SearchInput = () => {
  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #A2A9AF',
        borderRadius: '30px',
        width: 'fit-content',
        minWidth: '400px',
        height: '45px'
      }}
    >
      {/* <Search sx={{ margin: '8px 13px', color: '#A2A9AF' }}/>
      <TextField id="outlined-search" type="search" sx={{ border: 'none' }}/>  */}
      <CssTextField
        className="ml-2 w-full border-none"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search ..."
        type="search"
      />
    </Box>
    
  )
}

export default SearchInput;