import {
  createStyles,
  FormControl,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuProps,
  Select,
  SvgIconProps,
  Theme,
} from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import React, { useCallback, useMemo } from "react";
import { useCommunitiesQuery } from "../../generated/graphql";

interface SelectCommunityProps {
  setCommunityId: React.Dispatch<React.SetStateAction<string>>;
  communityId: string;
  userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      display: "flex",
      minWidth: 240,
      background: "white",
      borderStyle: "none",
      borderRadius: 8,
      paddingLeft: 24,
      paddingTop: 14,
      paddingBottom: 15,
      boxShadow: "none",
      "&:focus": {
        borderRadius: 8,
        background: "white",
      },
      '&[aria-expanded="true"]': {
        background: grey[50],
      },
      "& > div": {
        display: "inline-flex", // this shows the icon in the SelectInput but not the dropdown
      },
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

const SelectCommunity = ({
  communityId,
  setCommunityId,
  userId,
}: SelectCommunityProps) => {
  const outlineSelectClasses = useStyles();
  const {
    data: communitiesResponse,
    loading: communitiesLoading,
  } = useCommunitiesQuery({ variables: { userId } });

  const communities = useMemo(() => communitiesResponse?.communities || [], [
    communitiesResponse,
  ]);

  const communityName = useMemo(
    () =>
      communities.find((community) => community?.id === communityId)?.name ||
      "",
    [communities, communityId]
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string;
        value: unknown;
      }>
    ) => {
      const communityId =
        communities.find(
          (community) => community?.name === (event.target.value as string)
        )?.id || "";
      setCommunityId(communityId);
    },
    [communities]
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

  return (
    <FormControl>
      <Select
        disableUnderline
        classes={{ root: outlineSelectClasses.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={communityName}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) =>
          (selected as string) ? (
            <div>{("r/" + selected) as string}</div>
          ) : (
            <div>Choose a community</div>
          )
        }
      >
        <MenuItem disabled>
          <ListItemText
            primary="MY COMMUNITIES"
            primaryTypographyProps={{
              className: outlineSelectClasses.labelText,
            }}
          />
        </MenuItem>
        {communities.map((community) =>
          community ? (
            <MenuItem key={community.id} value={community.name}>
              {/* <ListItemIcon classes={{ root: outlineSelectClasses.listIcon }}>
            <SortIcon />
          </ListItemIcon> */}
              <span style={{ marginTop: 3 }}>{"r/" + community.name}</span>
            </MenuItem>
          ) : null
        )}
      </Select>
    </FormControl>
  );
};
export default SelectCommunity;
