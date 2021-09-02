import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/



/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/


axios.get('http://api.github.com/users/matthewstack')
.then(res => {
  console.log(res.data)
  console.log(res.data.followers_url)
  document.querySelector('.cards').appendChild(githubCard(res.data))
  return axios.get(res.data.followers_url)
})
.then(res => {
  console.log(res.data)
  const followerData = res.data
  followerData.forEach(follower => {
    axios.get(follower.url)
    .then(res => {
      document.querySelector('.cards').appendChild(githubCard(res.data))
    })

  })
})


const followersArray = [
'https://api.github.com/users/tetondan',
'https://api.github.com/users/dustinmyers',
'https://api.github.com/users/justsml',
'https://api.github.com/users/luishrd',
'https://api.github.com/users/bigknell'
]



const followersLooper = (arr => {
  arr.forEach(follower => {
    axios.get(follower)
    .then(res => {
      console.log(res.data)
      document.querySelector('.cards').appendChild(githubCard(res.data))
    })
  })
})

followersLooper(followersArray)




/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const githubCard = (obj => {
  // const outerContainer = document.createElement('div')
  const cardContainer = document.createElement('div')
  const image = document.createElement('img')
  const cardInfo = document.createElement('div')
  const fullName = document.createElement('h3')
  const username = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const githubLink = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')
  const githubChart = document.createElement('img')

  // outerContainer.appendChild(cardContainer)
  // outerContainer.

  cardContainer.appendChild(image);
  cardContainer.appendChild(cardInfo);
  cardInfo.appendChild(fullName);
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  profile.appendChild(githubLink)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)
  cardInfo.appendChild(githubChart)
  

  cardContainer.classList.add('card')
  image.classList.add('cardImg')
  cardInfo.classList.add('card-info')
  fullName.classList.add('name')
  username.classList.add('username')

  
  image.src = obj['avatar_url'];
  fullName.textContent = obj['name'];
  username.textContent = obj['login'];
  location.textContent = `Location: ${obj['location']}`;
  githubLink.textContent = `${obj['html_url']}`;
  githubLink.href = obj['html_url'];
  followers.textContent = `Followers: ${obj['followers']}`;
  following.textContent = `Following: ${obj['following']}`;
  bio.textContent = `Bio: ${obj['bio']}`;

  githubChart.src = `http://ghchart.rshah.org/${obj['login']}`;
  githubChart.width = 500;

  return cardContainer
})
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
