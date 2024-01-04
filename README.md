<div align="center" >

# `problem-details-http`

[![NPM Version](https://badgen.net/npm/v/problem-details-http?color=red)](https://www.npmjs.com/package/problem-details-http)
![License](https://badgen.net/npm/license/problem-details-http?color=yellow)
![Last Commit](https://badgen.net/github/last-commit/carlosupreme/problem-details-http/main?color=blue&icon=github)

![Open Issues](https://badgen.net/github/open-issues/carlosupreme/problem-details-http?color=green&icon=github)
![Dependencies](https://badgen.net/badge/dependencies/none/green)
[![GZIP Size](https://img.badgesize.io/https://unpkg.com/problem-details-http@latest/dist/index.js?compression=gzip)](https://unpkg.com/problem-details-http@latest/dist/index.js)
</div>


## Overview

Welcome to the documentation for the **HTTP Problem Details Library**. This library is designed to facilitate the implementation of the HTTP Problem Details convention as specified in [RFC 7807](https://tools.ietf.org/html/rfc7807). The library helps you structure and return error responses in a consistent and standardized format.

## Installation

To use this library in your project, you can install it via [npm](https://www.npmjs.com/). Run the following command in your project directory:

```bash
npm install problem-details-http
```

## Intro

A problem details object looks like this:

```json
{
  "type": "https://example.com/probs/out-of-credit",
  "status": 403,
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc"
}
```

When the members are:

- **type** (string): URI to the explanation of the error type
- **status** (number): HTTP status code
- **title** (string): Short description of the error
- **detail** (string): Specific explanation of the error
- **instance** (string) (optional): URI to some instance where the error ocurred

This object also allows to store member extensions, e.g :

```json
{
  "type": "https://example.com/probs/out-of-credit",
  "status": 403,
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc",
  "balance": 30,
  "accounts": ["/account/12345", "/account/67890"]
}
```

```json
{
  "type": "https://example.net/validation-error",
  "status": 422,
  "title": "Your request is not valid.",
  "detail": "The are some validation errors in your request",
  "errors": [
    {
      "detail": "must be a positive integer",
      "pointer": "#/age"
    },
    {
      "detail": "must be 'green', 'red' or 'blue'",
      "pointer": "#/profile/color"
    }
  ]
}
```

## Usage

### Importing the Library

In your project, import the library as follows:

```js
import { PDBuilder } from "problem-details-http";
```

### Creating a Problem Details Object

To create a Problem Details object, you can use the `fromDetail` function, followed by the methods that are named the same as the members established in the document, this method is named `fromDetail` because the "detail" member should be the only required member that your application must specifically provide.

```js
const problemDetails = PDBuilder.fromDetail("This is an example error message.")
  .type("https://example.com/error")
  .title("Example Error")
  .status(400)
  .instance("URI/to/the/instance")
  .build();
```

And this will create an object like this:

```json
{
  "type": "https://example.com/error",
  "status": 400,
  "title": "Example Error",
  "detail": "This is an example error message.",
  "instance": "URI/to/the/instance"
}
```

### Creating a Problem Details Object With Default Http Data

This library provides default values for all http errors in case you do not have a specific URI for your error type or u prefer to use generic titles.

```js
const problemDetails = PDBuilder.fromDetail(
  "This is an example error message."
).build();
```

And this will create an object like the following one, 400 is the default status code:

```json
{
  "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
  "status": 400,
  "title": "Bad Request",
  "detail": "This is an example error message."
}
```

### Returning Problem Details as JSON

You can then return the Problem Details object as a JSON response in your HTTP endpoint:

```js
res.status(problemDetails.status).json(problemDetails);
```

### Handling Errors

When an error occurs in your application, use the library to create and return a Problem Details object. This ensures that error responses adhere to the RFC 7807 standard. You can take advantage of the Error instance using the `PDBuilder`, it takes the `constructor.name` as the title, and the `message` property as the detail member

```js
// OutOfCreditError.ts
export class OutOfCreditError extends Error {}
```

```js
// exampleController.ts
try {
  // some code
  if (something.goesWrong()) {
    throw new OutOfCreditError(
      `Your current balance is ${current}, but that costs ${price}.`
    );
  }
} catch (error) {
  if (error instanceof OutOfCreditError) {
    const problemDetails = PDBuilder.fromError(error)
      .status403()
      .type("https://example.com/probs/out-of-credit")
      .instance("URI/to/the/instance")
      .extensions({
        balance: 30,
        accounts: ["/account/12345", "/account/67890"],
      });

    res.status(problemDetails.status).json(problemDetails);
  }
}
```

Response of the api endpoint

```
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
```

```json
{
  "type": "https://example.com/probs/out-of-credit",
  "title": "Out of credit",
  "status": 403,
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "URI/to/the/instance",
  "balance": 30,
  "accounts": ["/account/12345", "/account/67890"]
}
```

## Contributing

We welcome contributions to improve and expand this library. If you encounter issues or have suggestions, please open an [issue](https://github.com/carlosupreme/problem-details-http/issues) or submit a [pull request](https://github.com/carlosupreme/problem-details-http/pulls) on our GitHub repository.

## License

This library is distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed.

Thank you for using the HTTP Problem Details Library!
