<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#install-dependencies">Install Dependencies</a></li>
        <li><a href="#start-metro">Start Metro</a></li>
        <li><a href="#for-android">For Android</a></li>
        <li><a href="#for-ios">For iOS</a></li>
        <li><a href="#for-web">For Web</a></li>
        <li><a href="#using-icon-set">Using Icon Set</a></li>
      </ul>
    </li>
    <li>
      <a href="#appwrite-database-setup">AppWrite Database Setup</a>
      <ul>
        <li><a href="#create-collection-posts">Create Collection: Posts</a></li>
        <li><a href="#create-collection-post-data">Create Collection Post Data</a></li>
        <li><a href="#appwrite-authentication">AppWrite Authentication</a></li>
        <li><a href="#appwrite-storage">AppWrite Storage</a></li>
        <li><a href="#generate-env-file">Generate env File</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>


### Built With
 
This project is built with React Native and React Native web.

[![React Native][React Native]][React Native-url]



# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup]



## Install Dependencies

```bash
# using npm
npm install
```

```bash
# OR using Yarn
yarn install
```

## Start Metro

```bash
# using npm
npm start
```

```bash
# OR using Yarn
yarn start
```

### For Android

```bash
# using npm
npm run android
```

```bash
# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios
```

```bash
# OR using Yarn
yarn ios
```

### For Web

```bash
# using npm
npm run web
```

```bash
# OR using Yarn
yarn web
```

### For macOS and Windows
not properly tested in both environments.

### Using Icon Set,
React-icomoon package is used for Icon set.
[Icomoon github](github.com/aykutkardas/react-icomoon)

Icons are used from here: 
[Icons Library](https://icomoon.io/app/#/select)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### AppWrite Database Setup
<p><a href="https://appwrite.io/">AppWrite</a></p>
To set up your custom blog, you need to create the following databases and collections in AppWrite.

#### Create Database

Crate below collections inside that database

#### Create Collection Posts

Fields for the `Posts` collection:

- **category**: `[String]` - List of categories added.
- **shareUrl**: `String` - URL for sharing.
- **likes**: `Integer` - Number of likes.
- **githubUrl**: `Url` - URL to the GitHub repository.
- **uploadedBy**: `String` - Name of the uploader.
- **status**: `[pending | expired | unpublished | published]` - Current status of the post.
- **title**: `String` - Title of the post.
- **contents**: `[String]` - Array of IDs from the **Post Data** collection.
- **tldr**: `String` - Summary (Too Long Didn't Read).
- **videoUrl**: `String` - YouTube URL.

#### Create Collection Post Data

This collection contains individual items from the list of post data. The application will recognize the items by adding their IDs to the `contents[]` array in the `Posts` collection.

Fields for the `Post Data` collection:

- **title**: `String` - Title of the content.
- **subtitle**: `String` - Smaller text for the content.
- **content_type**: `String` - Type of content.
- **image_id**: `String` - ID of the image uploaded to the bucket.
- **content**: `String` - Main content.
- **postID**: `String` - ID of the post from the `Posts` collection.

#### AppWrite Authentication
<p><a href="https://appwrite.io/docs/products/auth">Authentication</a></p>
AppWrite enabling authentication process is very easy. Follow the process form the AppWrite documentation.

Note: Add the label `admin` for users who should have admin access.

#### AppWrite Storage
<p><a href="https://appwrite.io/docs/products/storage/buckets">Buckets</a></p>

Create a storage bucket.

#### Generate env File

Add the following values to your `.env` file:

```bash
REACT_APP_PROJECT_ID="Project ID of the AppWrite"
REACT_APP_ENDPOINT="https://cloud.appwrite.io/v1" // AppWrite might update later

REACT_APP_POSTS_DATABASE="Main Database ID"
REACT_APP_POSTS_COLLECTION="Posts collection ID"
REACT_APP_POSTS_DATA_COLLECTION="Post data ID" //Item data of list of contents in pos
REACT_APP_POSTS_BUCKET="Storage bucket id here"
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/roitpak/Blog.svg?style=for-the-badge
[contributors-url]: https://github.com/roitpak/Blog/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/roitpak/Blog.svg?style=for-the-badge
[forks-url]: https://github.com/roitpak/Blog/network/members
[stars-shield]: https://img.shields.io/github/stars/roitpak/Blog.svg?style=for-the-badge
[stars-url]: https://github.com/roitpak/Blog/stargazers
[issues-shield]: https://img.shields.io/github/issues/roitpak/Blog.svg?style=for-the-badge
[issues-url]: https://github.com/roitpak/Blog/issues
[license-shield]: https://img.shields.io/github/license/roitpak/Blog.svg?style=for-the-badge
[React Native]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFBß
[React Native-url]: https://reactnative.dev/
[license-url]: https://github.com/roitpak/Blog/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rohit-pakhrin-86242a171/
