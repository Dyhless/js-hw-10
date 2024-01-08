## Interaction with the backend

### Tasks - Acceptance criteria

- The repository js-hw-10 is created.
- When you submit your homework, there are two links: to the source files and to
  the work page on the GitHub Pages.
- There are no errors or warnings in the console when you visit the live task
  page.
- The project is assembled with
  [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- The code is formatted with `Prettier`.

### Start files

[Download the start file index.html](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/goitacademy/javascript-homework/tree/main/v2/10/src)
with the basic markup of the task. Copy it to your project in the folder src in
[parcel-project-template](https://github.com/goitacademy/parcel-project-template).

### Assignment - Cat Search

Create the frontend part of an application for searching information about a cat
by its breed. Watch a demo video of the app, use it as a reference for the
required functionality.

### HTTP-requests

Use the public [The Cat API](https://thecatapi.com/). To get started, you need
to register and get a unique access key, which must be attached to each request.
Go to [the main page](https://thecatapi.com/) and click the button Signup for
free below. Follow the instructions. The key will be sent to the specified
email.

The key must be used in the HTTP header `x-api-key`. It is recommended to use
axios and add the header for all requests.

```javascript
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'your key';
```

### The Breed Collection

When the page loads, an HTTP request for a collection of breeds must be
performed. To do this, you need to make a GET request to the resource
`https://api.thecatapi.com/v1/breeds` that returns an array of objects. If the
request is successful, you must complete the `select.breed-select` with options
so that the value of the option contains the id of the breed, and the user
interface displays the name of the breed.

Write a function `fetchBreeds()` which makes an HTTP request and returns a
promis with an array of breeds - the result of the request. Put it into the
`cat-api.js` file and make named export.

### Information about a cat

When the user chooses an option in the selector, it is necessary to query for
complete information about the cat on the resource
`https://api.thecatapi.com/v1/images/search`. Don't forget to specify the query
string parameter `breed_ids` with the breed identifier.

This is what the request URL for full information about the dog by breed ID will
look like.

`https://api.thecatapi.com/v1/images/search?breed_ids=breed_identifier`

Write a function `fetchCatByBreed(breedId)` which expects breed ID, performs an
HTTP request, and returns a promise with cat data - the request result. Put it
into the `cat-api.js` file and make named export.

If the request was successful, under the selector an image and detailed
information about the cat (breed name, description and temperament) appears in
the `div.cat-info` block.

### Load status processing

As long as there is any HTTP request, you must show the loader - element
p.loader. As long as there are no requests, or when the request has finished,
the loader must be hidden. Use additional CSS classes for this.

- While the request for a list of breeds is going on, it is necessary to hide
  select.breed-select and show p.loader.
- While the request for an information about cats is going on, it is necessary
  to hide div.cat-info and show p.loader.
- After finishing any request, the p.loader should be hiden.

### Processing an error

If a user had an error in any HTTP request, such as a network crash, packet
loss, etc., which means that the promise was rejected, you should display the
`p.error` element and hide it at each subsequent request. Use additional CSS
classes for this

It is very easy to test if the error is displayed correctly - change the request
address by adding any character to the end, for example, instead of
`https://api.thecatapi.com/v1/breeds` try
`https://api.thecatapi.com/v1/breeds123`. A request for a breed list will be
rejected with an error. Similarly for requesting information about a cat by
breed.

### The interface

- Add minimal design to the interface elements.
- You can use any library with beautiful select instead of
  `select.breed-select`. For example,
  [https://slimselectjs.com/](https://slimselectjs.com/)
- You can use any library with beautiful CSS-loaders instead of p.loader. For
  example, [https://cssloaders.github.io/](https://cssloaders.github.io/) You
  can use any library with beautiful notifications instead of p.error For
  example, [Notiflix](https://github.com/notiflix/Notiflix#readme)
