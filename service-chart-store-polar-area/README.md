# MICROSERVICE

## Store polar area chart

This microservice plugs in to Kafka and subscribes to topics:

- Polar area chart save request, from where it receives the chart data (svg, pdf, svg, json) and saves it to its database,
- Polar area chart-list get request, causing it to find all polar area charts owned by a particular user, and publish it to the corresponding "response" topic,
- Polar area chart download request, causing it to return a specific chart in the form requested (png, pdf, or svg). It doesn't return HTML, since HTML downloads are handled on the client side.

**Important**: even though the topic names include "response" and "request", it should be noted that there is **no temporal coupling** between these topics -or any other topics for that matter-, and the names are only used for convenience.
