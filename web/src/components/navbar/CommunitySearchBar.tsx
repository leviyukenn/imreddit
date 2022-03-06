import {
  Box,
  Chip,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  SearchCommunitiesQuery,
  useSearchCommunitiesLazyQuery,
} from "../../generated/graphql";
import { useCommunity } from "../../graphql/hooks/useCommunity";
import theme from "../../theme";
import { usePostInfoRoute } from "../../utils/hooks/usePostInfoRoute";
import {
  createCommunityHomeLink,
  createSearchResultPageLink,
} from "../../utils/links";
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
    chip: {
      padding: "0px 6px",
      fontWeight: 500,
      height: 24,
    },
  })
);

type SearchResult = SearchCommunitiesQuery["searchCommunities"];
type SelectedCommunity = SearchResult[0];

const CommunitySearchBar = ({}: CommunitySearchBarProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    setSearchValue((router.query.keyword || "") as string);
  }, [router]);

  const [
    selectedOption,
    setSelectedOption,
  ] = useState<SelectedCommunity | null>(null);
  const { communityName: postInfoCommunityName } = usePostInfoRoute();
  const [communityName, setCommunityName] = useState(
    () =>
      postInfoCommunityName ||
      (router.query.communityName as string) ||
      undefined
  );
  const { community } = useCommunity(communityName);

  const [
    searchCommuniites,
    { data: searchResult, loading },
  ] = useSearchCommunitiesLazyQuery();
  const options = useMemo(() => searchResult?.searchCommunities || [], [
    searchResult,
  ]);
  const onSearchValueChange = useCallback((event: any, value: string) => {
    setSearchValue(value);
  }, []);

  const onSearch = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" || !searchValue) return;
      router.push(createSearchResultPageLink(searchValue, community?.name));
    },
    [searchValue, router, community]
  );

  useEffect(() => {
    if (!searchValue) return;
    searchCommuniites({ variables: { communityName: searchValue } });
  }, [searchValue]);

  useEffect(() => {
    if (!selectedOption) return;
    router.push(createCommunityHomeLink(selectedOption.name));
  }, [selectedOption]);

  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();

  return (
    <Autocomplete
      classes={{
        root: classes.root,
        inputRoot: classes.inputRoot,
        input: classes.input,
      }}
      open={open}
      clearOnBlur={false}
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
      onKeyPress={onSearch}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      clearOnEscape={true}
      forcePopupIcon={false}
      renderOption={(option) => (
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
      )}
      inputValue={searchValue}
      onInputChange={onSearchValueChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          //   value={searchValue}
          //   onChange={onSearchValueChange}
          placeholder="Search"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <SearchIcon color="disabled" />

                {community && matches ? (
                  <Chip
                    avatar={
                      <CommunityIcon icon={community.icon} size="extraSmall" />
                    }
                    onDelete={() => setCommunityName(undefined)}
                    label={"r/" + community.name}
                    className={classes.chip}
                  />
                ) : null}
              </>
            ),
          }}
        />
      )}
    />
  );
};
export default CommunitySearchBar;
