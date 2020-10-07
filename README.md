# Discover Australia Website

## User Experience (UX)

### User Stories

### Design

#### Colour Scheme

- The three main colours used in the website are white, light blue and dark blue. 
- These colours were chosen because the white/light blue contrasts with the dark blue.

#### Typography

- The main font used throughout the website is Montserrat. 
- This font was chosen because it makes the content easy to read.
- Sans Serif is the fallback font which is used in the event that the specified font fails to import into the website correctly.

#### Imagery

- The hero images were chosen because they give the user an idea of what they can expect to experience in each destination should they choose to book a holiday there.

### Wireframes

## Features

### Existing Features

1. Brand Logo

    - This familiarises users with the organisation's logo and is also a link which the user can access from any page to take them back to the home page.

2. Navigation links

    - These enable users to access the different pages of the website so they can easily find the content they are looking for.

3. Home Page Hero Image Slider

    - This provides users with an image which gives them an idea of the kind of experience they can expect if they choose to visit the destination and a link to the destination's page.

4. Discover the Best of Australia Carousel

    - This enables users to find out about the top attractions across Australia and view key information about each attraction such as an image of the attraction, it's name, it's rating and a link to it's website.

5. Gallery

    - This allows users to view images which give them an idea of the kind of experience they can expect if they choose to visit Australia.

6. Destination Hero Image

    - This provides users with an idea of the kind of experience they can expect if they choose to visit the destination.

7. Dropdown Menu

    - This enables the user to select the type of places they would like to be displayed on the map. A new search is then conducted and new markers are displayed on the map.

8. Google Map

    - This displays a map of the destination's city centre with a markers for each place returned by the place search. If the user drags the map a new search is conducted and new markers are displayed on the map.

9. InfoWindow

    - This provides users with the place's name, address, telephone number, rating, website link and place type icon. The relevant infowindow is opened when the user clicks on a marker or a results table row.

10. Place Search Results Table

    - This displays the marker, name and vicinity for each result returned by the place search.

11. Contact us form

    - This enables users to contact the cafe about any questions they may have by completing the form.

12. Social Media links

    - These provide users with links to the different social media platforms where the cafe has a presence.

13. Responsive Design
   
    - Bootstrap grids and CSS media queries are used throughout the website to ensure that it is optimised for use on devices with a wide range of screen sizes.

### Features Left to Implement

1. More Destinations

    - Add more destinations including city, costal and countryside destinations.

2. Check in Date Selector

    - Add a check in date selector which is displayed when the user selects hotels from the main map dropdown.

3. Length of Stay Dropdown

    - Add a length of stay dropdown which is displayed when the user selects hotels from the main map dropdown.

4. Hotel Price Markers

    - Display the price per night as the marker for each hotel. This information can be obtained by conducting a Hotel Prices search using the Google Hotel Prices API. 

5. Add Attraction Entry Prices to Infowindows.

    - Amend the attraction infowindows to include the attraction's entry price. This information can be obtained by amending the place details search. 

6. Add Restaurant Price Levels to Infowindows.

    - Amend the restaurant infowindows to include the restaurant's price level. This information can be obtained by amending the place details search.

7. Add Hotel Star Rating and Facilities to Infowindows.

    - Amend the hotel infowindows to include hotel star rating and details of hotel facilities. This information can be obtained by conducting a hotel content search using the Google Hotel Content API.

8. Custom Markers

    - Add custom markers for each type of place (excluding hotels).

## Technologies Used

### Languages Used

1. [HTML5:](https://en.wikipedia.org/wiki/HTML5)
   - HTML5 was used for the sturcture of the webpages.
2. [CSS3:](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
   - CSS3 was used for the styling of the webpages.
3. [JavaScript:](https://en.wikipedia.org/wiki/JavaScript)
   - JavaScript was used for the interactive features on the webpages.

### Frameworks, Libraries & Programs Used

1. [Bootstrap 4.4.1](https://getbootstrap.com/)
    - Bootstrap was used for the jumbotron containing the hero image text, testimonials carousel, menu items cards, nutritional information modals contact us form. Bootstrap was also used for the grid which assists with the responsiveness of the website and for the styling.
2. [Hover.css](https://ianlunn.github.io/Hover/)
    - Hover.css was used for the hover effects on the navbar links and social media icons.
3. [Google Fonts](https://fonts.google.com/)
    - Google fonts was used to import the 'Montserrat' font into the style.css file which is used on all pages throughout the project.
4. [Font Awesome](https://fontawesome.com/)
    - Font Awesome was used throughout the website to enhance the user experience by adding icons.
5. [Popper.js](https://popper.js.org/)
    - Bootstrap uses Popper.js to make the navbar responsive.
6. [jQuery](https://jquery.com/)
    - JQuery was used throughout the website for the interactive features.
7. [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview)
    - Google Maps API was used for the maps on each destination page.
8. [Google Places API](https://developers.google.com/places/web-service/overview)
    - Google Places API was used for the place details in the Discover the Best of Australia slider, results tables and map information windows.
9. [Instagram Grabber API](https://rapidapi.com/victor.beck123123/api/instagram-grabber/endpoints)
    - Instagram Grabber API was used to request the images used in the gallery.
10. [Cities Slider](https://codepen.io/suez/pen/OjGQza)
    - Cities Slider was used for the hero image slider. License is [here](assets/licenses/cities-slider-license.md).
11. [Owl Carousel 2.3.4](https://owlcarousel2.github.io/OwlCarousel2/)
    - Owl Carousel was used for the discover the best of Australia carousel. License is [here](assets/licenses/owl-carousel-license.md).
12. [Gitpod](https://www.gitpod.io/) 
    - Gitpod was used to write the code for this project and gitpod terminal was used to commit changes to Git and Push them to GitHub.
13. [Git](https://git-scm.com/)
    - Git was the version control system used for this project.
14. [GitHub](https://github.com/)
    - GitHub is used to store the project's code and any other required files.
15. B[Balsamiq](https://balsamiq.com/)
    - Balsamiq was used to create the wireframes during the design phase of the project.

## Testing

### WC3 Validation

### Testing User Stories from User Experience (UX) Section

### Manual Testing

### Jasmine Testing

### Further Testing

- The Website was tested on a variety of different web browsers including Google Chrome, Microsoft Edge and Safari.
- The Website was also viewed on a number of different devices with a range of screen widths including an iMac, MacBook, iPad and iPhone.
- Family and friends were asked to review the site and documentation and identify any bugs or other issues that were affecting the user experience.

### Fixed Bugs

1. Back to top button was appearing much larger than expected on hover. 
    - Fixed error in code which was allowing the social media icons hover effect to override the back to top button hover effect. 

2. When the contact form modal was closed the navbar was still expanded and the links remained in active status.
    - Added jQuery to fix the issue.

3. Results table spinner was not appearing both horizontally and vertically centered.
    - Fixed an error in the code preventing the spinner from displaying in the correct position.

4. InfoWindows were appearing with the previous result or no result in them.
    - Changed the code to ensure that the results had been returned before the InfoWindow was opened.

5. Hero image slider was not loading.
    - Defered the running of the hero-image-slider.js script. 

### Known Bugs

- Images in the Discover the Best of Australia carousel randomly fail to be returned by the Google Places API when the getURL function is called. 

## Deployment

### GitHub Pages

The project was deployed to GitHub Pages using the following steps:

1.  Log in to GitHub and click on the relelavant [GitHub Repository](https://github.com/jonathan-odonnell/milestone-project-2).
2.  Click on the "Settings" button at the top of the repository.
![Image showing the settings button](assets/images/github_pages/github_pages_1.png)
3.  Scroll down to the "GitHub Pages" section.
![Image showing the github pages section](assets/images/github_pages/github_pages_2.png)
4.  In the source section, click the branch dropdown and select "master".
![Image showing the branch dropdown](assets/images/github_pages/github_pages_3.png)
5.  Click save and wait for the page to refresh.
![Image showing the save button](assets/images/github_pages/github_pages_4.png)
6.  Scroll back down to the "Github Pages" section and locate the link to the published site.
![Image showing the link](assets/images/github_pages/github_pages_5.png)

More information about deploying a website to GitHub Pages is available [here](https://docs.github.com/en/github/working-with-github-pages/creating-a-github-pages-site#creating-your-site).

### Forking the GitHub repository

The GitHub Repository can be forked using the following steps:

1.  Log in to GitHub and locate the project's [GitHub Repository](https://github.com/jonathan-odonnell/milestone-project-2).
2.  At the top-right of the repository, click the "Fork" Button.
![Image showing the fork button](assets/images/fork/fork.png)

More information about forking a GitHub repository is available [here](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

### Making a Local Clone

A local clone of the project can be created using the following steps:

1.  Log in to GitHub and locate the project's [GitHub Repository](https://github.com/jonathan-odonnell/milestone-project-2).
2.  Under the repository name, click the "Code" button.
![Image showing the code button](assets/images/clone/clone1.png)
3.  To clone the repository using HTTPS, under "Clone with HTTPS", click the clipboard button to copy the repository URL. 
![Image showing the clipboard button](assets/images/clone/clone2.png)
    To clone using SSH click "Use SSH" and then click the clipboard button.
![Image showing the use ssh button](assets/images/clone/clone3.png)
![Image showing the clipboard button](assets/images/clone/clone4.png)
4.  Open Git Bash
5.  Change the current working directory to the location where you want to store the cloned repository.
6.  Type ```git clone``` and then paste the URL you copied in Step 3.
```
$ git clone https://github.com/jonathan-odonnell/milestone-project-2.git
```
7.  Press enter to create your clone.
```
Cloning into 'milestone-project-2'...
remote: Enumerating objects: 375, done.
remote: Counting objects: 100% (375/375), done.
remote: Compressing objects: 100% (231/231), done.
remote: Total 671 (delta 219), reused 270 (delta 116), pack-reused 296
Receiving objects: 100% (671/671), 9.99 MiB | 5.69 MiB/s, done.
Resolving deltas: 100% (378/378), done.
```

More information about making a local clone of a GitHub repository is available [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

## Credits

### Code

### Content

### Media

- The brand logo was designed using [Hatchful](https://hatchful.shopify.com/).
- The home page hero image slider Sydney image was from [Shutterstock](https://www.shutterstock.com/image-photo/aerial-view-sydney-australia-drone-shot-1580548351).
- The home page hero image slider Melbourne image was from [Pixabay](https://pixabay.com/photos/central-station-melbourne-victoria-2661255/).
- The home page hero image slider Brisbane image was from [Shutterstock](https://www.shutterstock.com/image-photo/brisbane-city-skyline-river-twilight-australia-657755617).
- The Discover the Best of Australia images were from the [Google Places API](https://developers.google.com/places/web-service/overview).
- The Gallery images were from the [Instagram Grabber API](https://rapidapi.com/victor.beck123123/api/instagram-grabber/endpoints).
- The Sydney page hero image was from [Shutterstock](https://www.shutterstock.com/image-photo/sydney-nswaustralia-surfers-leaving-bondi-beach-1075866242).
- The Melbourne page hero image was from [Shutterstock](https://www.shutterstock.com/image-photo/melbourne-australia-december-18-2016-degraves-558010618).
- The Brisbane page hero image was from [Shutterstock](https://www.shutterstock.com/image-photo/arches-covered-pink-bougainvillea-flowers-southbank-379090987).

### Acknowledgements

- I received inspiration for this project from [Tourism Australia](https://www.australia.com/).