<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/34fame/sandbox-filemanager">
    <img src="logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">File Manager Sandbox</h3>

  <p align="center">
    Demonstrates building a file manager module for your application (e.g. upload, view, delete).
    <br />
    <a href="https://github.com/34fame/sandbox-filemanager"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/34fame/sandbox-filemanager">View Demo</a>
    ·
    <a href="https://github.com/34fame/sandbox-filemanager/issues">Report Bug</a>
    ·
    <a href="https://github.com/34fame/sandbox-filemanager/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![File Manager Screen Shot][product-screenshot]](https://example.com)


### Built With

* [VueJS](https://vuejs.org)
* [Quasar Framework](https://quasar.dev)
* [Firebase](https://firebase.google.com)
   * [Cloud Functions](https://firebase.google.com/docs/functions)
   * [Storage](https://firebase.google.com/docs/storage)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

* Firebase account

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/34fame/sandbox-filemanager.git
```

1. Install NPM packages
```sh
npm install
```

1. Create client environment files
```sh
cd client
cp .env.sample .env.development
cp .env.sample .env.production
```

1. Update client environment files with Firebase project details

1. Create a Firebase service account and place it in `server/service-account.json`

<!-- Key Aspects -->
## Key Aspects

### User Interface

The UI is built with Quasar Framework.  It is a very simple implementation that is entirely found in the `pages/Index
.vue` component.  It uses the Quasar Uploader component.

### Server (API)

In my case I wanted to completely handle all Firebase interactions from the backend.  The server is built as a
 Firebase Cloud Function, written in Node.js.  It handles methods for:

- getFiles
- getFile
- uploadFile
- deleteFile

It is strictly using the Firebase Admin SDK so no user authorization is in use.

### Setup

This demonstration does have a very basic concept of tenancy.  Uploaded files are placed in a directory named after
 the tenant identifier.  A user can only retrieve or delete files from their tenant.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Troy Moreland - [@34fame_troy](https://twitter.com/#34fame_troy)

Project Link: [https://github.com/34fame/sandbox-filemanager](https://github.com/34fame/sandbox-filemanager)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/34fame/sandbox-filemanager.svg?style=flat-square
[contributors-url]: https://github.com/34fame/sandbox-filemanager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/34fame/sandbox-filemanager.svg?style=flat-square
[forks-url]: https://github.com/34fame/sandbox-filemanager/network/members
[stars-shield]: https://img.shields.io/github/stars/34fame/sandbox-filemanager.svg?style=flat-square
[stars-url]: https://github.com/34fame/sandbox-filemanager/stargazers
[issues-shield]: https://img.shields.io/github/issues/34fame/sandbox-filemanager.svg?style=flat-square
[issues-url]: https://github.com/34fame/sandbox-filemanager/issues
[license-shield]: https://img.shields.io/github/license/34fame/sandbox-filemanager.svg?style=flat-square
[license-url]: https://github.com/34fame/sandbox-filemanager/blob/master/LICENSE.txt
[product-screenshot]: screenshot.png
