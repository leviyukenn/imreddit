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
import React, { useMemo, useState } from "react";
import {
  useCommunitiesQuery,
  useUserRolesQuery,
} from "../../generated/graphql";
import {
  CommunitySelectionOption,
  CommunitySelectionOptionGroupType,
} from "../../utils/factory/communitySelectionOption";
import {
  createCommunityHomeLink,
  createCommunityPageLink,
} from "../../utils/links";

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
      borderRadius: "4px",
      padding: "0 1em",
      fontWeight: 600,
      cursor: "pointer",
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
      width: 270,
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

  const userRoles = useMemo(() => userRolesResponse?.userRoles || [], [
    userRolesResponse,
  ]);

  const myCommunities = useMemo(
    () =>
      communities.filter(
        (community) =>
          userRoles.find((userRole) => userRole?.communityId == community.id)
            ?.isMember
      ),
    [communities, userRoles]
  );

  const myCommunitiesItems: CommunitySelectionOption[] = useMemo(() => {
    if (communities.length == 0) return [];
    const myCommunityOptions = myCommunities.map((community) =>
      CommunitySelectionOption.createOption({
        id: community.id,
        name: community.name,
        icon: "",
        link: createCommunityHomeLink(community.name),
        group: CommunitySelectionOptionGroupType.MY_COMMUNITIES,
      })
    );
    const createCommunityItem = CommunitySelectionOption.createOption({
      id: "createCommunity",
      name: "Create Community",
      icon: <AddIcon />,
      link: createCommunityPageLink,
      group: CommunitySelectionOptionGroupType.MY_COMMUNITIES,
    });

    return [createCommunityItem, ...myCommunityOptions];
  }, [myCommunities]);

  const moderatingCommunities = useMemo(
    () =>
      communities.filter(
        (community) =>
          userRoles.find((userRole) => userRole?.communityId == community.id)
            ?.isModerator
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [
    pendingValue,
    setPendingValue,
  ] = React.useState<CommunitySelectionOption | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === "toggleInput") {
      return;
    }
    if (reason === "blur" && isButtonClicked) {
      setIsButtonClicked(false);
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
          onMouseDown={(e) => setIsButtonClicked(true)}
          onMouseUp={(e) => setIsButtonClicked(false)}
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
              {option.icon ? option.icon : null}
              <NextLink href={option.link} passHref>
                <Link
                  key={option.id}
                  className={classes.text}
                  underline="none"
                  color="textPrimary"
                >
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

// import {
//   Box,
//   createStyles,
//   FormControl,
//   ListItemText,
//   makeStyles,
//   MenuItem,
//   MenuProps,
//   Select,
//   SvgIconProps,
//   TextField,
//   Theme,
// } from "@material-ui/core";
// import { blue } from "@material-ui/core/colors";
// import AddIcon from "@material-ui/icons/Add";
// import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
// import HomeIcon from "@material-ui/icons/Home";
// import { useRouter } from "next/router";
// import React, { useCallback, useMemo, useState } from "react";
// import {
//   useCommunitiesQuery,
//   useUserRolesQuery,
// } from "../../generated/graphql";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     select: {
//       display: "flex",
//       width: 270,
//       height: 36,
//       backgroundColor: "#fff",
//       borderRadius: 4,
//       boxSizing: "border-box",
//       padding: "0 0.75em",
//       marginLeft: "1.5em",
//       border: "1px solid #fff",
//       justifyContent: "space-between",
//       alignItems: "center",
//       // borderStyle: "none",
//       // boxShadow: "none",
//       "&:focus": {
//         borderRadius: "0.5rem",
//         backgroundColor: "#fff",
//         border: "1px solid rgb(237, 239, 241)",
//       },
//       "&:hover": {
//         border: "1px solid rgb(237, 239, 241)",
//       },
//       '&[aria-expanded="true"]': {
//         border: "1px solid rgb(237, 239, 241)",
//       },
//       // "& > div": {
//       //   display: "inline-flex", // this shows the icon in the SelectInput but not the dropdown
//       // },
//     },

//     placeholder: {
//       display: "flex",
//       alignItems: "center",
//       paddingLeft: "0.5em",
//     },
//     icon: {
//       color: blue[500],
//       right: 12,
//       position: "absolute",
//       userSelect: "none",
//       pointerEvents: "none",
//     },
//     paper: {
//       borderRadius: 4,
//       marginTop: "0.5em",
//     },
//     list: {
//       padding: "0 0.5em",
//       background: "white",
//       "& li": {
//         fontSize: "0.875rem",
//         padding: "0.75em 0.5em",
//       },
//       "& li:hover": {
//         background: blue[50],
//       },
//       "& li.Mui-selected": {
//         color: "black",
//         background: "white",
//       },
//       "& li.Mui-selected:hover": {
//         background: blue[50],
//       },
//     },
//     filter: {
//       width: "100%",
//       margin: "12px 0",
//     },
//     listIcon: {
//       minWidth: 32,
//       display: "none", // hide the ListItemIcon in the dropdown
//     },
//     labelText: {
//       fontSize: "10px",
//       fontWeight: 700,
//     },
//   })
// );

// const CommunitySelection = ({ userId }: { userId: string }) => {
//   const outlineSelectClasses = useStyles();
//   const { data: communitiesResponse } = useCommunitiesQuery({
//     variables: { userId },
//   });
//   const { data: userRolesResponse } = useUserRolesQuery({
//     variables: { userId },
//   });
//   const [keyword, setKeyword] = useState("");

//   const communities = useMemo(() => {
//     const communities = communitiesResponse?.communities || [];
//     return communities.filter((community) =>
//       community ? community.name.includes(keyword) : false
//     );
//   }, [communitiesResponse, keyword]);

//   const userRoles = useMemo(() => userRolesResponse?.userRoles || [], [
//     userRolesResponse,
//   ]);

//   const moderatingCommunity = useMemo(
//     () =>
//       communities.filter(
//         (community) =>
//           userRoles.find((userRole) => userRole?.communityId === community?.id)
//             ?.role === "moderator"
//       ) || [],
//     [communities, userRoles]
//   );

//   const [communityName, setCommunityName] = useState("");

//   const router = useRouter();

//   const goToCreateCommunity = useCallback(
//     (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
//       router.push("/create-community");
//       event.stopPropagation();
//     },
//     [router]
//   );

//   const iconComponent = (props: SvgIconProps) => {
//     return (
//       <ExpandMoreRoundedIcon
//         className={props.className + " " + outlineSelectClasses.icon}
//       />
//     );
//   };

//   // moves the menu below the select input
//   const menuProps: Partial<MenuProps> = {
//     classes: {
//       paper: outlineSelectClasses.paper,
//       list: outlineSelectClasses.list,
//     },
//     anchorOrigin: {
//       vertical: "bottom",
//       horizontal: "left",
//     },
//     transformOrigin: {
//       vertical: "top",
//       horizontal: "left",
//     },
//     getContentAnchorEl: null,
//   };

//   const handleSelectionChange = useCallback(
//     (
//       event: React.ChangeEvent<{
//         name?: string;
//         value: unknown;
//       }>
//     ) => {
//       setCommunityName(event.target.value as string);
//     },
//     [setCommunityName]
//   );

//   const handleKeywordChange = useCallback(
//     (
//       event: React.ChangeEvent<{
//         name?: string;
//         value: unknown;
//       }>
//     ) => {
//       setKeyword(event.target.value as string);
//     },
//     [setKeyword]
//   );

//   const placeholder = useMemo(
//     () => (
//       <Box display="flex" alignItems="center">
//         <HomeIcon />
//         <Box marginLeft="8px" fontSize="14px">
//           Home
//         </Box>
//       </Box>
//     ),
//     []
//   );

//   // return (
//   //   <Box className={outlineSelectClasses.select}>
//   //     {!communityName ? placeholder : null}
//   //     <Box></Box>
//   //   </Box>
//   // );

//   return (
//     <FormControl>
//       <Select
//         disableUnderline
//         classes={{ root: outlineSelectClasses.select }}
//         MenuProps={menuProps}
//         IconComponent={iconComponent}
//         onChange={handleSelectionChange}
//         displayEmpty
//         value={communityName}
//         renderValue={(selected) =>
//           (selected as string) ? (
//             <div>{("r/" + selected) as string}</div>
//           ) : (
//             placeholder
//           )
//         }
//       >
//         <TextField
//           placeholder="Filter"
//           inputProps={{ "aria-label": "description" }}
//           className={outlineSelectClasses.filter}
//           variant="outlined"
//           value={keyword}
//           onChange={handleKeywordChange}
//           // autoFocus
//         />
//         <MenuItem disabled>
//           <ListItemText
//             primary="MODERATING"
//             primaryTypographyProps={{
//               className: outlineSelectClasses.labelText,
//             }}
//           />
//         </MenuItem>
//         {moderatingCommunity.map((community) =>
//           community ? (
//             <MenuItem key={community.id} value={community.name}>
//               {/* <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
//             <SortIcon />
//           </ListItemIcon> */}
//               <span style={{ marginTop: 3 }}>{"r/" + community.name}</span>
//             </MenuItem>
//           ) : null
//         )}
//         <MenuItem disabled>
//           <ListItemText
//             primary="MY COMMUNITIES"
//             primaryTypographyProps={{
//               className: outlineSelectClasses.labelText,
//             }}
//           />
//         </MenuItem>
//         <MenuItem onClick={goToCreateCommunity} value="">
//           <AddIcon />
//           <span>Create Community</span>
//         </MenuItem>
//         {communities.map((community) =>
//           community ? (
//             <MenuItem key={community.id} value={community.name}>
//               {/* <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
//             <SortIcon />
//           </ListItemIcon> */}
//               <span style={{ marginTop: 3 }}>{"r/" + community.name}</span>
//             </MenuItem>
//           ) : null
//         )}
//       </Select>
//     </FormControl>
//   );
// };
// export default CommunitySelection;
