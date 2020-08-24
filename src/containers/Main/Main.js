import React from "react";
import PostItem from "./../../components/PostItem/PostItem";
import Logout from "../../components/Logout/Logout";

import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        loading: true,
      };
    case "loaded":
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.newData],
        after: state.after + action.newData.length,
      };
    default:
      throw new Error("Dont understand sction");
  }
};

const Main = () => {
  const [postData, setPostData] = React.useState([]);
  const [getData, setGetData] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=m2tVXOjbthfPUYDD3O1LIBslEvYFwmmw"
      )
      .then((response) => setPostData(response.data.results.books));
      console.log("get")
  }, [getData]);


  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    data: [],
    after: 0,
  });
  const { loading, data, after } = state;
  return (
    <div>
     <Logout />
      <ul>
        {data.map((item, index) => {
          return (
            <li>
              <PostItem {...item} key={index} />
            </li>
          );
        })}

        {loading && <li>Loading...</li>}
        {!loading && (
          <li>
            <button
              onClick={() => {
                dispatch({ type: "start" });
                setTimeout(() => {
                    setGetData(!getData)
                    const newData = postData;
                    dispatch({ type: "loaded", newData });
                  }, 0);

              }}
            >
              LoadMore
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Main;
