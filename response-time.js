import { Trend } from "k6/metrics";
import http from "k6/http";
import { check, group } from "k6";

// We can customise the metrics for the console output by using the Trend class
const uptimeCheck = new Trend("/GET API uptime");

export let options = {
  stages: [{ duration: "0.5m", target: 4 }],
};

export default function () {
  group("API uptime check", () => {
    const response = http.get(
      "https://aqueous-brook-60480.herokuapp.com/todos/"
    );
    // uptimeCheck to track the response time
    uptimeCheck.add(response.timings.duration);
    // using the check function to verify the response code is 200
    check(response, {
      "status code should be 200": (res) => res.status === 200,
    });
  });
}
