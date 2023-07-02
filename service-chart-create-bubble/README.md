# MICROSERVICE

## Create bubble chart

This microservice plugs in to Kafka and subscribes to the topic of "Bubble chart creation requests". It uses ChartJSNodeCanvas to create png, pdf and svg files, from the chart JSON description included in the received message. It then publishes these three files, as well as the JSON description it received, to the topic of "Bubble chart save requests", so anyone that wants to know if a bubble chart has been created successfully can be notified.
