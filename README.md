### Install Dependencies

```bash
npm i
```

1. Counter Function

```bash
npm run counter
```

2. HTTP Request Handling

```bash
npm run http
```

## Services Interaction

### 1. Question

What options do we have to establish such communication?

### Answer

1. synchronous
2. Asynchronous,pub/sub

commonly user communication protocols are http, grpc, websockets, mqtt amqp,zeromq etc..

<br />

### 2. Question

For each option describe what are the pros and cons of this solution?

### Answer

1. Synchronous <br />

   #### pros

   - Easier to debug

   * Easy to implement

   ### cons

   - Coupling,Service Discovery Overhead,increased Load

2. Asynchronous,pub/sub

   #### pros

   - A “fire & forget” method

   * It’s easy to scale horizontally

   ### cons

   - Higher System Complexity,Eventual Consistency

   * Difficult to debug issues

   - Requires integrating with another system to handle message flow.

### 3. Question

For each option describe what are the cases the solution fits best?

### Answer

1. Synchronous
   eg. If service A depends on the data from service B (order service depends on auth service to validate the user)

2. Asynchronous,pub/sub
   eg . If Service A has to notify one or more service (once user places order, order service has to notify notification service to send notifications and inventory service to reduce the stock)

<br />
* for http,grpc,websockets both clients has to be online
* if service A needs to fetch some data from service B then http, grpc are most suitable    protocols
- If service A need to notify service B and don't care about the response from service B then mqtt, amqp
- When using broker based protocols if receiver service offline due to some reason the data will be delivered once its online

<br />

## DB Models

- please check the `schema.prisma` file prisma folder
