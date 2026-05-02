# Notification System Design

---

## Stage 1: API Design

In this stage, we design the basic APIs required for a notification system. The system should allow users to receive notifications, mark them as read, and support real-time updates.

### 1. Get Notifications

GET /notifications

Headers:
Authorization: Bearer <token>

Query Parameters:
- page (optional)
- limit (optional)

Response:
{
  "notifications": [
    {
      "id": "string",
      "type": "Event / Result / Placement",
      "message": "string",
      "timestamp": "datetime",
      "isRead": false
    }
  ]
}

---

### 2. Mark Notification as Read

PATCH /notifications/:id/read

Response:
{
  "message": "Notification marked as read"
}

---

### 3. Send Notification

POST /notifications

Request:
{
  "userId": "string",
  "type": "Event",
  "message": "New event available"
}

---

### Real-time Approach

To support real-time notifications, WebSockets can be used. If WebSockets are not available, short polling can be used as a fallback.

---

## Stage 2: Database Design

For storing notifications, I would prefer using MongoDB (NoSQL) because it can handle large amounts of data and provides flexibility.

### Schema (notifications collection)

{
  _id,
  userId,
  type,
  message,
  isRead,
  createdAt
}

---

### Potential Issues

- Data size will increase over time
- Queries may slow down

### Solutions

- Use indexing (userId, isRead)
- Implement pagination
- Archive old data if needed

---

## Stage 3: Query Optimization

### Given Query

SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;

### Problem

This query may be slow if indexing is not used.

### Solution

Add a compound index:

(studentID, isRead, createdAt DESC)

---

### Additional Query

To fetch placement notifications from last 7 days:

SELECT * FROM notifications
WHERE type = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;

---

### Note

Adding indexes on all columns is not a good idea because it increases write cost and storage.

---

## Stage 4: Performance Improvement

### Problem

Notifications are fetched on every page load which increases DB load.

### Improvements

- Use caching (Redis) to store recent notifications
- Use pagination instead of loading everything
- Lazy loading (load more when needed)

---

## Stage 5: Reliable Notification System

### Problem in given approach

- If email sending fails, system breaks
- No retry mechanism
- Everything runs synchronously

### Improved Approach

Use a message queue (like Kafka or RabbitMQ)

### Flow

1. Save notification in database
2. Push task to queue
3. Worker processes the queue and sends email

### Benefit

- More reliable
- Supports retries
- Faster response time

---

## Stage 6: Priority Notification System

### Requirement

Show top important unread notifications based on:
- Impact
- Recency

### Approach

- Calculate score based on impact and time
- Sort notifications
- Return top 10

### Example Logic

function getTopNotifications(notifications) {
  return notifications
    .map(n => {
      const recency = 1 / (Date.now() - new Date(n.timestamp));
      const score = n.impact + recency;
      return { ...n, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

---

### Optimization

- Use a priority queue (heap) for better performance
- Only maintain top 10 elements

---

## Final Thoughts

This system focuses on:
- scalability
- performance
- reliability
- real-time delivery

It can handle large number of users and notifications efficiently.