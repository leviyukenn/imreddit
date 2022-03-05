import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import NextLink from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchCommunitiesLazyQuery } from "../../generated/graphql";
import { createCommunityHomeLink } from "../../utils/links";
import CommunityIcon from "../community/CommunityIcon";

interface CommunitySearchBarProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    inputRoot: {
      height: 36,
      boxSizing: "border-box",
      '&&[class*="MuiOutlinedInput-root"]': {
        padding: 0,
      },
    },
    input: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    communityInfo: {
      marginLeft: "1rem",
      flex: 1,
    },
    communityName: {
      lineHeight: "20px",
      fontSize: "12px",
      color: theme.palette.text.primary,
      fontWeight: 700,
    },
  })
);

const CommunitySearchBar = ({}: CommunitySearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [
    searchCommuniites,
    { data: searchResult, loading },
  ] = useSearchCommunitiesLazyQuery();
  const options = useMemo(() => searchResult?.searchCommunities || [], [
    searchResult,
  ]);
  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );
  useEffect(() => {
    if (!searchValue) return;
    searchCommuniites({ variables: { communityName: searchValue } });
  }, [searchValue]);

  const classes = useStyles();

  return (
    <Autocomplete
      classes={{
        root: classes.root,
        inputRoot: classes.inputRoot,
        input: classes.input,
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      //   getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderOption={(option) => (
        <NextLink href={createCommunityHomeLink(option.name)} passHref>
          <Box display="flex" alignItems="center" marginBottom="0.5rem">
            <CommunityIcon icon={option.icon} size="small" />
            <Box className={classes.communityInfo}>
              <Typography className={classes.communityName}>
                {"r/" + option.name}
              </Typography>
              <Typography variant="caption" component="p">
                {option.totalMemberships +
                  (option.totalMemberships > 1 ? " members" : " member")}
              </Typography>
            </Box>
          </Box>
        </NextLink>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          value={searchValue}
          onChange={onSearch}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {/* {params.InputProps.endAdornment} */}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
export default CommunitySearchBar;
