import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import React, { useEffect, useState } from "react";
import { OrderType } from "../../graphql/types/types";
import { createComposedClasses } from "../../utils/utils";

interface PostOrderTypeTabsProps {
  orderType: OrderType;
  setOrderType: React.Dispatch<React.SetStateAction<OrderType>>;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      marginBottom: theme.spacing(2),
      borderRadius: 4,
      border: "1px solid #ccc",
      padding: 12,
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 700,
      lineHeight: "1.25rem",
      borderRadius: 20,
      color: "#9b9b9b",
    },
    menuList: {
      display: "flex",
    },
    durationButton: {
      fontWeight: 700,
      fontSize: "0.875rem",
      color: "#9b9b9b",
    },
    selected: {
      color: "#0079d3",
    },
  })
);

enum TopDuration {
  TODAY = "Today",
  THIS_WEEK = "This Week",
  THIS_MONTH = "This Month",
  THIS_YEAR = "This Year",
  ALL_TIME = "All Time",
}

const PostOrderTypeTabs = ({
  orderType,
  setOrderType,
}: PostOrderTypeTabsProps) => {
  const classes = useStyles();
  const [topDuration, setTopDuration] = useState<TopDuration>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleDurationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleCloseDurationMenu = () => {
    setAnchorEl(null);
  };

  const onClickDurationButton = (duration: TopDuration) => {
    return () => {
      setTopDuration(duration);
      handleCloseDurationMenu();
    };
  };

  const topDurationList = Object.values(TopDuration);
  const composeButtonClasses = (selected: boolean) =>
    createComposedClasses(classes.button, selected ? classes.selected : "");

  useEffect(() => {
    if (!topDuration) return;
    switch (topDuration) {
      case TopDuration.TODAY:
        setOrderType(OrderType.TOP_1DAY);
        break;
      case TopDuration.THIS_WEEK:
        setOrderType(OrderType.TOP_1WEEK);
        break;
      case TopDuration.THIS_MONTH:
        setOrderType(OrderType.TOP_1MONTH);
        break;
      case TopDuration.THIS_YEAR:
        setOrderType(OrderType.TOP_1YEAR);
        break;
      default:
        break;
    }
  }, [topDuration]);

  return (
    <Box className={classes.root}>
      <Button
        startIcon={<NewReleasesIcon />}
        className={composeButtonClasses(orderType === OrderType.NEW)}
        onClick={() => {
          setOrderType(OrderType.NEW);
          setTopDuration(undefined);
        }}
      >
        new
      </Button>
      <Button
        startIcon={<WhatshotIcon />}
        className={composeButtonClasses(
          orderType === OrderType.TOP_1DAY && !topDuration
        )}
        onClick={() => {
          setOrderType(OrderType.TOP_1DAY);
          setTopDuration(undefined);
        }}
      >
        hot
      </Button>
      <Button
        startIcon={<TrendingUpIcon />}
        className={composeButtonClasses(!!topDuration)}
        onClick={() => {
          setOrderType(OrderType.TOP_ALL_TIME);
          setTopDuration(TopDuration.ALL_TIME);
        }}
      >
        top
      </Button>
      {topDuration ? (
        <Button
          endIcon={<ExpandMoreIcon />}
          className={createComposedClasses(
            classes.button,
            topDuration ? classes.selected : ""
          )}
          onClick={toggleDurationMenu}
        >
          {topDuration}
        </Button>
      ) : null}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseDurationMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        classes={{ list: classes.menuList }}
      >
        {topDurationList.map((duration) => {
          return (
            <MenuItem
              key={duration}
              onClick={onClickDurationButton(duration)}
              className={createComposedClasses(
                classes.durationButton,
                duration === topDuration ? classes.selected : ""
              )}
            >
              {duration}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
export default PostOrderTypeTabs;
