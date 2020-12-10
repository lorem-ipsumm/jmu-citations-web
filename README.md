[![Netlify Status](https://api.netlify.com/api/v1/badges/00047765-8e6d-4bb2-adf0-ef9816c4ece5/deploy-status)](https://app.netlify.com/sites/jmucitations/deploys)

## notice
Unfortunately the process that I was using to view the data has since been patched, so I no longer have access to the data. It was fun while it lasted! I ended up changing the site to show parking citations in Boulder Colorado but that stopped working too. Feel free to take a look at the screenshots to see what it was like when it was working. I wish I had more pictures of how it looked on desktop but [I was leading people to the site through QR codes](https://github.com/MickNorris/old-wandrland) so the majority of visitors were on their phones.


![Alt text](git_assets/demo_small.png?raw=true "Title")


## [JMU Live Parking Citation Data](https://jmucitations.netlify.com/)
This is a personal project that displays various forms of parking citation data at my school, James Madison University. 

# Thoughts
Overall I'm pretty impressed with this project and how quickly I got it up and running. Here are some of my thoughts:
 - I built this website in a mobile-first style, because in theory it should reduce the amount of time I'd need to spend to get the site looking nice on both mobile and desktop.
 - For the first time ever, I decided to use [Typescript](https://www.typescriptlang.org/) to clean up the quirks and messyness of javascript. It didn't take that long to get used to using it, but I feel that I'm not really using it efficiently.
 - [Firebase](https://firebase.google.com/) makes having a cloud database so easy. Google is spooky but their services are hard to beat. When I started the project I went with a "make a working version and worry about efficiency later" outlook when it came to structuring the database. The cost of this has been fairly low so far (~$1/month), I can definitely get that lower, and possibly to $0/month.

 
# What's Under the Hood?
 - [React](https://reactjs.org/) - build the UI/UX.
 - [Typescript](https://www.typescriptlang.org/) - make javascript better.
 - [Google Firebase](https://firebase.google.com/) - run cloud functions and cron jobs.
 - [Netlify](https://www.netlify.com/) - building the site from this github repo (for free).
 - [Recharts](http://recharts.org) - cool graphs
 
 
 ## (old) Screenshots
 ![Alt text](git_assets/demo1.png?raw=true "Title")
 ![Alt text](git_assets/demo2.png?raw=true "Title")
 ![Alt text](git_assets/demo3.png?raw=true "Title")
 ![Alt text](git_assets/demo4.png?raw=true "Title")
