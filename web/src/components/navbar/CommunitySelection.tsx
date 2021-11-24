import {
  Box,
  createStyles,
  FormControl,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuProps,
  Select,
  SvgIconProps,
  TextField,
  Theme,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import HomeIcon from "@material-ui/icons/Home";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { useCommunitiesQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      display: "flex",
      width: 270,
      height: 36,
      backgroundColor: "#fff",
      borderRadius: 4,
      boxSizing: "border-box",
      padding: "0 12px",
      marginLeft: "24px",
      border: "1px solid #fff",
      alignItems: "center",
      // borderStyle: "none",
      // boxShadow: "none",
      "&:focus": {
        borderRadius: 8,
        backgroundColor: "#fff",
        border: "1px solid rgb(237, 239, 241)",
      },
      "&:hover": {
        border: "1px solid rgb(237, 239, 241)",
      },
      '&[aria-expanded="true"]': {
        border: "1px solid rgb(237, 239, 241)",
      },
      // "& > div": {
      //   display: "inline-flex", // this shows the icon in the SelectInput but not the dropdown
      // },
    },

    placeholder: {
      display: "flex",
      alignItems: "center",
      paddingLeft: "8",
    },
    icon: {
      color: blue[500],
      right: 12,
      position: "absolute",
      userSelect: "none",
      pointerEvents: "none",
    },
    paper: {
      borderRadius: 4,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 8,
      paddingLeft: 8,
      background: "white",
      "& li": {
        fontSize: 14,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 8,
        paddingLeft: 8,
      },
      "& li:hover": {
        background: blue[50],
      },
      "& li.Mui-selected": {
        color: "black",
        background: "white",
      },
      "& li.Mui-selected:hover": {
        background: blue[50],
      },
    },
    filter: {
      width: "100%",
      margin: "12px 0",
    },
    listIcon: {
      minWidth: 32,
      display: "none", // hide the ListItemIcon in the dropdown
    },
    labelText: {
      fontSize: "10px",
      fontWeight: 700,
    },
  })
);

const CommunitySelection = ({ userId }: { userId: string }) => {
  const outlineSelectClasses = useStyles();
  const { data: communitiesResponse } = useCommunitiesQuery({
    variables: { userId },
  });
  const [keyword, setKeyword] = useState("");

  const communities = useMemo(() => {
    const communities = communitiesResponse?.communities || [];
    return communities.filter((community) => community.name.includes(keyword));
  }, [communitiesResponse, keyword]);

  const moderatingCommunity = useMemo(
    () =>
      communities.filter(
        (community) => community.membersRole[0].role === "moderator"
      ) || [],
    [communities]
  );

  const [communityName, setCommunityName] = useState("");

  const router = useRouter();

  const goToCreateCommunity = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      router.push("/create-community");
      event.stopPropagation();
    },
    [router]
  );

  const iconComponent = (props: SvgIconProps) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  // moves the menu below the select input
  const menuProps: Partial<MenuProps> = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const handleSelectionChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string;
        value: unknown;
      }>
    ) => {
      setCommunityName(event.target.value as string);
    },
    [setCommunityName]
  );

  const handleKeywordChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string;
        value: unknown;
      }>
    ) => {
      setKeyword(event.target.value as string);
    },
    [setKeyword]
  );

  const placeholder = useMemo(
    () => (
      <Box display="flex" alignItems="center">
        <HomeIcon />
        <Box marginLeft="8px" fontSize="14px">
          Home
        </Box>
      </Box>
    ),
    []
  );

  return (
    <FormControl>
      <Select
        disableUnderline
        classes={{ root: outlineSelectClasses.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        onChange={handleSelectionChange}
        displayEmpty
        value={communityName}
        renderValue={(selected) =>
          (selected as string) ? (
            <div>{("r/" + selected) as string}</div>
          ) : (
            placeholder
          )
        }
      >
        <MenuItem>
          <TextField
            placeholder="Filter"
            inputProps={{ "aria-label": "description" }}
            className={outlineSelectClasses.filter}
            // variant="outlined"
            value={keyword}
            onChange={handleKeywordChange}
            autoFocus
          />
        </MenuItem>
        <MenuItem disabled>
          <ListItemText
            primary="MODERATING"
            primaryTypographyProps={{
              className: outlineSelectClasses.labelText,
            }}
          />
        </MenuItem>
        {moderatingCommunity.map((community) => (
          <MenuItem key={community.id} value={community.name}>
            {/* <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
            <SortIcon />
          </ListItemIcon> */}
            <span style={{ marginTop: 3 }}>{"r/" + community.name}</span>
          </MenuItem>
        ))}
        <MenuItem disabled>
          <ListItemText
            primary="MY COMMUNITIES"
            primaryTypographyProps={{
              className: outlineSelectClasses.labelText,
            }}
          />
        </MenuItem>
        <MenuItem onClick={goToCreateCommunity} value="">
          <AddIcon />
          <span>Create Community</span>
        </MenuItem>
        {communities.map((community) => (
          <MenuItem key={community.id} value={community.name}>
            {/* <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
            <SortIcon />
          </ListItemIcon> */}
            <span style={{ marginTop: 3 }}>{"r/" + community.name}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default CommunitySelection;
