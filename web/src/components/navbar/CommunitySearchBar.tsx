import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SearchCommunitiesQuery,
  useSearchCommunitiesLazyQuery,
} from "../../generated/graphql";
import { createCommunityHomeLink } from "../../utils/links";
import CommunityIcon from "../community/CommunityIcon";

interface CommunitySearchBarProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      maxWidth: 300,
    },
    inputRoot: {
      height: 36,
      boxSizing: "border-box",
      '&&[class*="MuiOutlinedInput-root"]': {
        padding: 0,
        paddingLeft: "0.5rem",
      },
    },
    input: {
      fontSize: "0.75rem",
      fontWeight: 500,
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
    optionLink: {
      flex: 1,
      padding: "0.5rem 1rem",
    },
  })
);

type SearchResult = SearchCommunitiesQuery["searchCommunities"];
type SelectedCommunity = SearchResult[0];

const CommunitySearchBar = ({}: CommunitySearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [
    selectedOption,
    setSelectedOption,
  ] = useState<SelectedCommunity | null>(null);
  const router = useRouter();
  const [
    searchCommuniites,
    { data: searchResult, loading },
  ] = useSearchCommunitiesLazyQuery();
  const options = useMemo(() => searchResult?.searchCommunities || [], [
    searchResult,
  ]);
  const onSearchValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (!searchValue) return;
    searchCommuniites({ variables: { communityName: searchValue } });
  }, [searchValue]);

  useEffect(() => {
    if (!selectedOption) return;
    router.push(createCommunityHomeLink(selectedOption.name));
  }, [selectedOption]);

   

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
      value={selectedOption}
      onChange={(event: any, value: typeof selectedOption) =>
        setSelectedOption(value)
      }
      getOptionSelected={(option, value) => option.name === value.name}
      onKeyPress={(event) => console.log(event)}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      clearOnEscape={true}
      forcePopupIcon={false}
      //   renderTags={(value: SearchResult, getTagProps) => {
      //     // console.log(value, getTagProps);

      //     debugger;
      //     return value.map((option: SelectedCommunity, index: number) => (
      //       <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      //     ));
      //   }}
      renderOption={(option) => (
        // <NextLink href={createCommunityHomeLink(option.name)} passHref>
        //   <Link
        //     underline="none"
        //     color="textPrimary"
        //     className={classes.optionLink}
        //   >
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
        //   </Link>
        // </NextLink>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          value={searchValue}
          onChange={onSearchValueChange}
          placeholder="Search Communities"
          InputProps={{
            ...params.InputProps,
            // endAdornment: (
            //   <IconButton onClick={() => setSearchValue("")} size="small">
            //     <CloseIcon />
            //   </IconButton>
            // ),

            startAdornment: <SearchIcon color="disabled" />,
          }}
        />
      )}
    />
  );
};
export default CommunitySearchBar;
