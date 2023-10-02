import http from "k6/http";
import { check, group } from "k6";

// below we are creating a todo and then checking if the todo was created
// ramping up the number of VUs during the test
export let options = {
  stages: [
    { duration: "0.5m", target: 3 },
    { duration: "0.5m", target: 4 },
    { duration: "0.5m", target: 0 },
  ],
};

export default function () {
  group("API uptime check", () => {
    const response = http.get(
      "https://aqueous-brook-60480.herokuapp.com/todos/"
    );
    // checking if the API is up and running
    // using the check function to verify the response code is 200
    check(response, {
      "status code should be 200": (res) => res.status === 200,
    });
  });

  let todoID;
  // using the group function to group the requests
  group("Create a Todo", () => {
    const response = http.post(
      "https://aqueous-brook-60480.herokuapp.com/todos/",
      { task: "write k6 tests" }
    );
    todoID = response.json()._id;
    check(response, {
      "status code should be 200": (res) => res.status === 200,
    });
    check(response, {
      "response should have created todo": (res) =>
        res.json().completed === false,
    });
  });
}
