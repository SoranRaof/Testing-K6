import http from "k6/http";
import { sleep, check } from "k6";

// k6 works with the concept of virtual users (VUs), which run your test scripts.
// VUs are essentially parallel while(true) loops. Scripts are written in JavaScript, as ES6 modules
// so you can break larger tests into smaller pieces or make reusable pieces as you like

// uncomment the below code and comment the code below:
// export default function () {
//   http.get("http://test.k6.io");

//   // sleep is a built-in function that takes a duration argument (in seconds)
//   // you can also run the command k6 run --vus 2 --duration 30s script.js to configure the number of VUs and duration
//   sleep(10);
// }
// uncomment the code above ^^

// configuring the number of VUs and duration in the script
// uncomment the below code and comment the below code:

// export const options = {
//   vus: 10,
//   duration: "30s",
// };

// export default function () {
//   http.get("http://test.k6.io");
//   sleep(10);
// }
// uncomment the code above ^^

// ramping up the number of VUs during the test
// in the first stage we ramp up the numbers of VUs to 20 over a period of 10 seconds
// in the second stage we ramp down the number of VUs to 10 over a period of 20 seconds
// in the third stage we ramp down the number of VUs to 0 over a period of 10 seconds
// uncomment the below code and comment the code below:
export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "20s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

// check is a built-in function that verifies that the response code is 200
export default function () {
  const res = http.get("http://test.k6.io");
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(10);
}
