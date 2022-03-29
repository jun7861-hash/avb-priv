import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import grey from "@material-ui/core/colors/grey";
import { getAllComments } from "store/slices/comment";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

import "app/App.css";
import logo from "app/logo.svg";

const useStyles = makeStyles((theme) => ({
  commentArea: {
    display: "flex",
    marginBottom: "20px",
  },
  commentHeader: {},
  grey: {
    color: grey[400],
  },
  loader: {
    display: "flex",
    justifyContent: "center",
  },
  displayControl: {
    display: "flex",
    justifyContent: "end",
    marginBottom: "50px",
  },
  topCommentersArea: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  topDetails: {
    display: "flex",
    alignItems: "center",
  },
  topRanking: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { comments, loading } = useSelector((state) => state.comments);

  const [filter, setFilter] = useState("all");

  const loadData = async () => {
    dispatch(getAllComments());
  };

  const handleAvatar = (name) => name && name.charAt(0).toUpperCase();

  const handleFormatName = (name) => {
    const splitName = name && name.toLowerCase().split(" ");
    for (let i = 0; i < splitName.length; i++) {
      splitName[i] =
        splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1);
    }
    return splitName.join(" ");
  };

  const findTopCommenters = (array, key) => {
    let newArray = [];

    array.forEach((x) => {
      if (
        newArray.some((val) => {
          return val[key] === x[key];
        })
      ) {
        newArray.forEach((k) => {
          if (k[key] === x[key]) {
            k["numberOfComments"]++;
          }
        });
      } else {
        let a = {};
        a[key] = x[key];
        a["numberOfComments"] = 1;
        newArray.push(a);
      }
    });

    const highetstFirst = newArray.sort(
      (a, b) => b.numberOfComments - a.numberOfComments
    );
    return highetstFirst.slice(0, 3);
  };

  const topCommenters = findTopCommenters(comments, "name");

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Header />

      <CommentModal />

      <div className="App-header" style={{ marginBottom: "50px" }}>
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      {/* xxxCOMMENTS SECTION */}

      <Container maxWidth="sm">
        <div className={classes.displayControl}>
          <FormControl variant="outlined">
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={filter}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="all">All Comments</MenuItem>
              <MenuItem value="top">Top Comments</MenuItem>
            </Select>
          </FormControl>
        </div>
        {loading === "PENDING" && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
        {loading === "FULFILLED" && filter === "all" && (
          <>
            {comments &&
              comments.map((comment) => (
                <section className={classes.commentArea} key={comment.id}>
                  <Avatar style={{ marginRight: "5px" }}>
                    {handleAvatar(comment.name)}
                  </Avatar>
                  <div>
                    <div className={classes.commentHeader}>
                      <Typography variant="h6" component="p">
                        {handleFormatName(comment.name)}
                      </Typography>
                    </div>
                    <div>
                      <Typography component="p">{comment.body}</Typography>
                    </div>
                  </div>
                </section>
              ))}
          </>
        )}

        {loading === "FULFILLED" && filter === "top" && (
          <>
            {topCommenters &&
              topCommenters.map((top, index) => (
                <section className={classes.topCommentersArea} key={index}>
                  <div className={classes.topDetails}>
                    <Avatar style={{ marginRight: "5px" }}>
                      {handleAvatar(top.name)}
                    </Avatar>
                    <Typography variant="h6" component="p">
                      {handleFormatName(top.name)}&nbsp;({top.numberOfComments})
                    </Typography>
                  </div>
                  <div
                    className={classes.topRanking}
                    style={{
                      color:
                        index === 0
                          ? "#FFD700"
                          : index === 1
                          ? "#C0C0C0"
                          : "#CD7F32",
                    }}
                  >
                    <EmojiEventsIcon fontSize="large" />
                  </div>
                </section>
              ))}
          </>
        )}
      </Container>

      {/* xxxCOMMENTS SECTION END */}
    </>
  );
}

export default App;
