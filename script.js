import http from "k6/http";
import { sleep } from "k6";

// k6 works with the concept of virtual users (VUs), which run your test scripts.
// VUs are essentially parallel while(true) loops. Scripts are written in JavaScript, as ES6 modules
// So you can break larger tests into smaller pieces or make reusable pieces as you like

export default function () {
  http.get("http://test.k6.io");

  // sleep is a built-in function that takes a duration argument (in seconds)
  // you can also run the command k6 run --vus 2 --duration 30s script.js to configure the number of VUs and duration
  sleep(10);
}
