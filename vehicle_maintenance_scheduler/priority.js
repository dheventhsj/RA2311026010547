const axios = require("axios");

// 🔑 paste your token here
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkczQ1NDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTg0OCwiaWF0IjoxNzc3NzAwOTQ4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzdmMjcxNTYtZDQ5Yy00MTU2LWI4YzYtZTc2NTYyNjYwY2IzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGhldmVudGgucyIsInN1YiI6IjcxYjgyNzFkLTQ3ZDQtNDc2Yy05NzJmLWMxYTlkMTBjZWRkZiJ9LCJlbWFpbCI6ImRzNDU0MUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImRoZXZlbnRoLnMiLCJyb2xsTm8iOiJyYTIzMTEwMjYwMTA1NDciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI3MWI4MjcxZC00N2Q0LTQ3NmMtOTcyZi1jMWE5ZDEwY2VkZGYiLCJjbGllbnRTZWNyZXQiOiJCSEt3eHpVWWNiQkNHQWpaIn0.T9e4yV07XFDJRf2BeMoSe5YYQrDjPRs8S7TrP8Q6kxA";

// Priority mapping (higher = more important)
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    const notifications = response.data.notifications;

    // filter unread notifications
    const unread = notifications.filter(n => !n.isRead);

    // sort based on priority + recency
    unread.sort((a, b) => {
      const priorityDiff =
        (priorityMap[b.Type] || 0) - (priorityMap[a.Type] || 0);

      if (priorityDiff !== 0) return priorityDiff;

      // if same priority → sort by latest
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = unread.slice(0, 10);

    console.log("Top 10 Notifications:");
    console.log(top10);

  } catch (error) {
    console.error("Error fetching notifications:", error.message);
  }
}

getTopNotifications();