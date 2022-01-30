import {
  Box,
  createStyles,
  InputBase,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import NextLink from "next/link";
import React, { useEffect, useMemo } from "react";
import { SERVER_URL } from "../../const/const";
import { useCommunitiesQuery } from "../../generated/graphql";
import {
  CommunitySelectionOption,
  CommunitySelectionOptionGroupType,
  CommunitySelectionOptionIconType,
} from "../../utils/factory/communitySelectionOption";
import { createCommunityPageLink } from "../../utils/links";

interface SelectCommunityProps {
  setCommunityId: React.Dispatch<React.SetStateAction<string>>;
  communityId: string;
  userId: string;
}

const iconMap = new Map<CommunitySelectionOptionIconType, JSX.Element>([
  [CommunitySelectionOptionIconType.HOME, <HomeIcon />],
  [CommunitySelectionOptionIconType.CREATE_COMMUNITY, <AddIcon />],
]);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputBase: {
      display: "flex",
      alignItems: "center",
      width: "300px",
      height: "40px",
      backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      padding: "0 0.5em",
      borderRadius: 4,
      "& input": {
        height: "100%",
        color: "#1c1c1c",
        fontWeight: 500,
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontSize: "0.875rem",
        padding: "0 0.75em",
        "&:focus": {
          borderColor: theme.palette.primary.main,
        },
        "&::placeholder": {
          color: "#1c1c1c",
          fontWeight: 500,
          opacity: 1,
        },
      },
    },
    circle: {
      boxSizing: "border-box",
      width: 25,
      height: 22,
      borderRadius: 22,
      border: "1px dashed #878a8c",
    },
    paper: {
      boxShadow: "none",
      margin: 0,
      color: "#586069",
      border: "1px solid #ced4da",
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
    text: {
      flexGrow: 1,
      marginLeft: "0.5rem",
    },
    iconImage: {
      width: 20,
      height: 20,
      backgroundColor: "rgb(0 121 211)",
      borderRadius: "100%",
    },
  })
);

function useCommunitySelectionOption(userId: string) {
  const { data: communitiesResponse } = useCommunitiesQuery({
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
        name: "r/" + community.name,
        icon: community.icon,
        link: "",
        group: CommunitySelectionOptionGroupType.MY_COMMUNITIES,
      })
    );
    const createCommunity = CommunitySelectionOption.createOption({
      id: "createCommunity",
      name: "Create Community",
      icon: CommunitySelectionOptionIconType.CREATE_COMMUNITY,
      link: createCommunityPageLink,
      group: CommunitySelectionOptionGroupType.MY_COMMUNITIES,
    });

    return [createCommunity, ...myCommunities];
  }, [communities]);

  return [...myCommunitiesItems];
}

export default function SelectCommunity({
  setCommunityId,
  userId,
}: SelectCommunityProps) {
  const classes = useStyles();

  const communitySelectionOptions = useCommunitySelectionOption(userId);

  const [
    pendingValue,
    setPendingValue,
  ] = React.useState<CommunitySelectionOption | null>(null);

  const inputIcon = useMemo(() => {
    if (!pendingValue?.icon) {
      return <span className={classes.circle}></span>;
    }
    if (typeof pendingValue.icon === "string") {
      return (
        <img
          src={SERVER_URL + pendingValue.icon}
          className={classes.iconImage}
        />
      );
    }
    return pendingValue.icon;
  }, [pendingValue]);

  useEffect(() => {
    if (!pendingValue) {
      setCommunityId("");
      return;
    }
    setCommunityId(pendingValue.id);
  }, [pendingValue]);

  return (
    <Autocomplete
      classes={{
        paper: classes.paper,
        option: classes.option,
      }}
      value={pendingValue}
      onChange={(event, newValue) => {
        setPendingValue(newValue);
      }}
      // disablePortal
      renderTags={() => null}
      noOptionsText="Nothing found"
      groupBy={(option) => option.group}
      renderOption={(option) => (
        <React.Fragment>
          {typeof option.icon === "string" ? (
            <img src={SERVER_URL + option.icon} className={classes.iconImage} />
          ) : (
            iconMap.get(option.icon)
          )}
          {option.link ? (
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
          ) : (
            <Box key={option.id} className={classes.text}>
              {option.name}
            </Box>
          )}
        </React.Fragment>
      )}
      options={communitySelectionOptions}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => {
        return (
          <InputBase
            fullWidth
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            classes={{ root: classes.inputBase }}
            startAdornment={
              (params.inputProps as { ["aria-controls"]: string })[
                "aria-controls"
              ] ? (
                <SearchIcon />
              ) : (
                inputIcon
              )
            }
            endAdornment={
              <ExpandMoreRoundedIcon
                onClick={() =>
                  (params.inputProps as {
                    onMouseDown: () => void;
                  }).onMouseDown()
                }
              />
            }
            placeholder={
              (params.inputProps as { ["aria-controls"]: string })[
                "aria-controls"
              ]
                ? "Search communities"
                : "Choose a community"
            }
          />
        );
      }}
    />
  );
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     select: {
//       display: "flex",
//       minWidth: 240,
//       background: "white",
//       borderStyle: "none",
//       borderRadius: 8,
//       paddingLeft: 24,
//       paddingTop: 14,
//       paddingBottom: 15,
//       boxShadow: "none",
//       "&:focus": {
//         borderRadius: 8,
//         background: "white",
//       },
//       '&[aria-expanded="true"]': {
//         background: grey[50],
//       },
//       "& > div": {
//         display: "inline-flex", // this shows the icon in the SelectInput but not the dropdown
//       },
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
//       marginTop: 8,
//     },
//     list: {
//       paddingTop: 0,
//       paddingBottom: 0,
//       paddingRight: 8,
//       paddingLeft: 8,
//       background: "white",
//       "& li": {
//         paddingTop: 12,
//         paddingBottom: 12,
//         paddingRight: 8,
//         paddingLeft: 8,
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

// const SelectCommunity = ({
//   communityId,
//   setCommunityId,
//   userId,
// }: SelectCommunityProps) => {
//   const outlineSelectClasses = useStyles();
//   const {
//     data: communitiesResponse,
//   } = useCommunitiesQuery({ variables: { userId } });

//   const communities = useMemo(() => communitiesResponse?.communities || [], [
//     communitiesResponse,
//   ]);

//   const communityName = useMemo(
//     () =>
//       communities.find((community) => community.id === communityId)?.name || "",
//     [communities, communityId]
//   );

//   const handleChange = useCallback(
//     (
//       event: React.ChangeEvent<{
//         name?: string;
//         value: unknown;
//       }>
//     ) => {
//       const communityId =
//         communities.find(
//           (community) => community.name === (event.target.value as string)
//         )?.id || "";
//       setCommunityId(communityId);
//     },
//     [communities]
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

//   return (
//     <FormControl>
//       <Select
//         disableUnderline
//         classes={{ root: outlineSelectClasses.select }}
//         MenuProps={menuProps}
//         IconComponent={iconComponent}
//         value={communityName}
//         onChange={handleChange}
//         displayEmpty
//         renderValue={(selected) =>
//           (selected as string) ? (
//             <div>{("r/" + selected) as string}</div>
//           ) : (
//             <div>Choose a community</div>
//           )
//         }
//       >
//         <MenuItem disabled>
//           <ListItemText
//             primary="MY COMMUNITIES"
//             primaryTypographyProps={{
//               className: outlineSelectClasses.labelText,
//             }}
//           />
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
// export default SelectCommunity;
