import {
  Box,
  createStyles,
  InputBase,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Autocomplete, AutocompleteCloseReason } from "@material-ui/lab";
import React, { useMemo } from "react";
import { useCommunitiesQuery } from "../../generated/graphql";
import {
  CommunitySelectionOption,
  CommunitySelectionOptionGroupType,
} from "../../utils/factory/communitySelectionOption";
import {
  createCommunityHomeLink,
  createCommunityPageLink,
} from "../../utils/links";

interface SelectCommunityProps {
  setCommunityId: React.Dispatch<React.SetStateAction<string>>;
  communityId: string;
  userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputBase: {
      width: "300px",
      height: "40px",
      "& input": {
        height: "100%",
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        padding: "0 0.5em",
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

    return [createCommunity, ...myCommunities];
  }, [communities]);

  return [...myCommunitiesItems];
}

export default function SelectCommunity({ userId }: SelectCommunityProps) {
  const classes = useStyles();

  const communitySelectionOptions = useCommunitySelectionOption(userId);

  const [
    pendingValue,
    setPendingValue,
  ] = React.useState<CommunitySelectionOption | null>(null);
  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    console.log(reason);
    if (reason === "toggleInput") {
      return;
    }
  };

  return (
    <Autocomplete
      classes={{
        paper: classes.paper,
        option: classes.option,
        popperDisablePortal: classes.popperDisablePortal,
      }}
      value={pendingValue}
      // onClose={handleClose}
      onChange={(event, newValue) => {
        setPendingValue(newValue);
      }}
      // disablePortal
      renderTags={() => null}
      noOptionsText="Nothing found"
      groupBy={(option) => option.group}
      renderOption={(option) => (
        <React.Fragment>
          {option.icon ? option.icon : null}
          <Box key={option.id} className={classes.text}>
            {option.name}
          </Box>
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
