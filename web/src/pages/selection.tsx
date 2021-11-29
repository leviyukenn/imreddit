/* eslint-disable no-use-before-define */
import { Box, Link } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import Popper from "@material-ui/core/Popper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import HomeIcon from "@material-ui/icons/Home";
import Autocomplete, {
  AutocompleteCloseReason,
} from "@material-ui/lab/Autocomplete";
import NextLink from "next/link";
import React, { useMemo } from "react";
import { useCommunitiesQuery, useUserRolesQuery } from "../generated/graphql";
import {
  CommunitySelectionOption,
  CommunitySelectionOptionGroupType,
} from "../utils/factory/communitySelectionOption";
import {
  createCommunityHomeLink,
  createCommunityPageLink,
} from "../utils/links";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: "0.875rem",
    },
    button: {
      width: 270,
      height: 36,
      display: "flex",
      justifyContent: "space-between",
      color: "#586069",
      border: "1px solid #fff",
      padding: "0 1em",
      fontWeight: 600,
      "&:hover,&:focus": {
        border: "1px solid rgb(237, 239, 241)",
      },
      "& svg": {
        width: 20,
        height: 20,
      },
    },
    icon: {},
    placeholder: {
      marginLeft: "0.75em",
    },
    tag: {
      padding: ".15em 4px",
      fontWeight: 600,
    },
    popper: {
      border: "1px solid rgba(27,31,35,.15)",
      boxShadow: "0 3px 12px rgba(27,31,35,.15)",
      borderRadius: 3,
      width: 300,
      zIndex: 1,
      color: "#586069",
      backgroundColor: "#f6f8fa",
    },
    header: {
      borderBottom: "1px solid #e1e4e8",
      padding: "8px 10px",
      fontWeight: 600,
    },
    inputBase: {
      padding: 10,
      width: "100%",
      borderBottom: "1px solid #dfe2e5",
      "& input": {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        padding: "0.5em",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        border: "1px solid #ced4da",
        fontSize: "0.875rem",
        "&:focus": {
          borderColor: theme.palette.primary.main,
        },
      },
    },
    paper: {
      boxShadow: "none",
      margin: 0,
      color: "#586069",
      fontSize: "0.875rem",
    },
    option: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    popperDisablePortal: {
      position: "relative",
    },
    iconSelected: {
      width: 17,
      height: 17,
      marginRight: 5,
      marginLeft: -2,
    },
    color: {
      width: 14,
      height: 14,
      flexShrink: 0,
      borderRadius: 3,
      marginRight: 8,
      marginTop: 2,
    },
    text: {
      flexGrow: 1,
    },
  })
);

function useCommunitySelectionOption(userId: string) {
  const { data: communitiesResponse } = useCommunitiesQuery({
    variables: { userId },
  });
  const { data: userRolesResponse } = useUserRolesQuery({
    variables: { userId },
  });

  const communities = useMemo(() => communitiesResponse?.communities || [], [
    communitiesResponse,
  ]);
  const myCommunitiesItems: CommunitySelectionOption[] = useMemo(() => {
    if (communities.length == 0) return [];
    const myCommunities = communities.map((community) =>
      CommunitySelectionOption.createOption({
        id: community.id,
        name: community.name,
        icon: "",
        link: createCommunityHomeLink(community.name),
        group: CommunitySelectionOptionGroupType.MY_COMMUNITIES,
      })
    );
    const createCommunity = CommunitySelectionOption.createOption({
      id: "createCommunity",
      name: "Create Community",
      icon: <AddIcon />,
      link: createCommunityPageLink,
      group: CommunitySelectionOptionGroupType.MY_COMMUNITIES,
    });

    return [...myCommunities, createCommunity];
  }, [communities]);

  const userRoles = useMemo(() => userRolesResponse?.userRoles || [], [
    userRolesResponse,
  ]);

  const moderatingCommunities = useMemo(
    () =>
      communities.filter(
        (community) =>
          userRoles.find((userRole) => userRole?.communityId == community.id)
            ?.role === "moderator"
      ),
    [communities, userRoles]
  );

  const moderatingItems = useMemo(
    () =>
      moderatingCommunities.map((community) =>
        CommunitySelectionOption.createOption({
          id: community.id,
          name: community.name,
          icon: "",
          link: createCommunityHomeLink(community.name),
          group: CommunitySelectionOptionGroupType.MODERATING,
        })
      ),
    [moderatingCommunities]
  );

  return [...moderatingItems, ...myCommunitiesItems];
}

export default function CommunitySelection({ userId }: { userId: string }) {
  const classes = useStyles();

  const communitySelectionOptions = useCommunitySelectionOption(userId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    pendingValue,
    setPendingValue,
  ] = React.useState<CommunitySelectionOption | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === "toggleInput") {
      return;
    }
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "community-name" : undefined;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.button}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Box display="flex" alignItems="center">
            {!pendingValue ? (
              <>
                <HomeIcon />
                <Box className={classes.placeholder}>Home</Box>
              </>
            ) : (
              <div className={classes.tag}>{pendingValue.name}</div>
            )}
          </Box>
          <ExpandMoreRoundedIcon className={classes.icon} />
        </ButtonBase>
      </div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <div className={classes.header}>Filter</div>
        <Autocomplete
          open
          onClose={handleClose}
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          onChange={(event, newValue) => {
            setPendingValue(newValue);
          }}
          disablePortal
          renderTags={() => null}
          noOptionsText="Nothing found"
          groupBy={(option) => option.group}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <DoneIcon
                className={classes.iconSelected}
                style={{ visibility: selected ? "visible" : "hidden" }}
              />
              <NextLink href={option.link} passHref>
                <Link key={option.id} className={classes.text}>
                  {option.name}
                </Link>
              </NextLink>
            </React.Fragment>
          )}
          options={communitySelectionOptions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => {
            return (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
              />
            );
          }}
        />
      </Popper>
    </React.Fragment>
  );
}
