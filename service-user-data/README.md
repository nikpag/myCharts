# MICROSERVICE

## Store and manipulate user data

This microservice plugs in to Kafka and subscribes to topics:

- Update credits request, causing it to update the server's
- Update last login request, causing it to update the desired user's last login on its database,
- Create user request, causing it to create a new user with the email included in the kafka message
- Get user request, causing it to return the desired user's data, by publishing it to the "Get user response" topic,
- Save chart request, in order to subtract the chart's credits from the corresponding user.

**Important**: even though the topic names include "response" and "request", it should be noted that there is **no temporal coupling** between these topics -or any other topics for that matter-, and the names are only used for convenience.
