const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkczQ1NDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTg0OCwiaWF0IjoxNzc3NzAwOTQ4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzdmMjcxNTYtZDQ5Yy00MTU2LWI4YzYtZTc2NTYyNjYwY2IzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGhldmVudGgucyIsInN1YiI6IjcxYjgyNzFkLTQ3ZDQtNDc2Yy05NzJmLWMxYTlkMTBjZWRkZiJ9LCJlbWFpbCI6ImRzNDU0MUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImRoZXZlbnRoLnMiLCJyb2xsTm8iOiJyYTIzMTEwMjYwMTA1NDciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI3MWI4MjcxZC00N2Q0LTQ3NmMtOTcyZi1jMWE5ZDEwY2VkZGYiLCJjbGllbnRTZWNyZXQiOiJCSEt3eHpVWWNiQkNHQWpaIn0.T9e4yV07XFDJRf2BeMoSe5YYQrDjPRs8S7TrP8Q6kxA";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Log sent:", response.data);

  } catch (error) {
    if (error.response) {
      console.log("Logging failed:", error.response.data);
    } else {
      console.log("Logging error:", error.message);
    }
  }
}

module.exports = Log;