# MICROSERVICE

## Frontend adapter for chart uploads

Since we are using kafka, someone has to publish and consume from the relevant topics in order for the app to work. It's not a good idea for the frontend to do that, as:

- It would put too much load on the frontend
- It would make our UI coupled to the implementation of the backend. What if we decided to ditch Kafka for RabbitMQ tomorrow? Would he have to change all of the frontend code?

We could create a frontend adapter that handles all of the frontend's requests and translates them to Kafka publish/subscribe operations, but that is also not a good idea, since we have introduced a single-point-of-failure in our application.

Our solution is to split this adapter to 3 pieces:

- One for handling chart downloads
- One for handling chart uploads (**This one is implemented here!**)
- One for handling user data requests
