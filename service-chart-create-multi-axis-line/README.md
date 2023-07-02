# MICROSERVICE

## Create multi axis line chart

This microservice plugs in to Kafka and subscribes to the topic of "Multi axis line chart creation requests". It uses ChartJSNodeCanvas to create png, pdf and svg files, from the chart JSON description included in the received message. It then publishes these three files, as well as the JSON description it received, to the topic of "Multi axis line chart save requests", so anyone that wants to know if a multi axis line chart has been created successfully can be notified.
