//Grab the form
const form = document.querySelector('form');

//grab the loader img
const loadingElement = document.querySelector('.loading');

//grab the mews element class in html
const mewsElement = document.querySelector('.mews');

//hide loader on page load
loadingElement.style.display = '';

//this url is use for POSTing and querying(GET) data from this route, with db name 'mews'
const API_URI = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/mews'
  : 'https://thwinger-api.now.sh/mews';
//when the page loads request for mews
listAllMews();


//listen to events
form.addEventListener('submit', (event) => {
  //prevent default form submit behavior
  event.preventDefault();
  //grab form data
  const formData = new FormData(form);
  //get username
  const name = formData.get('name');
  //get usercontent
  const content = formData.get('content');

  //creat an object of mew to contain name $ content
  const mew = {
    name,
    content
  };

  //after submitting the form, hide the form $ show loader
  form.style.display = 'none';
  loadingElement.style.display = '';
  
  //attemp to send off data to backend server using fetch
  fetch(API_URI, {
    //specify method, body and headers
    method: 'POST',
    //turn js object to json for server to parse & understand
    body: JSON.stringify(mew),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(createdMew => {
      //after POST request, hide spinner then reset and show form again
      form.reset();
      //display the form after 30sec
      setTimeout(() => {
        form.style.display = '';
      }, 30000);
      //list all mews
      listAllMews();
    }); //get back the result json object and extract createdmew
});

//function listAllMews
function listAllMews() {
  //clear elements before appending 
  mewsElement.innerHTML = '';
  //make a GET request to the same url that we POSTed to 
  //with GET request in fetch, you don't have to specify any options 
  fetch(API_URI).
  //get back response and parse it as json
  then(response => response.json()).
  //then get all mews
  then(mews => {
    console.log(mews);

    //reverse to show recent post
    mews.reverse();

    //now iterate thru the mews from the response and add them to page
    mews.forEach(mew => {
      //for every element in the array append it to the page, first creat a div
      const div = document.createElement('div');
      //create header to show persons' name
      const header = document.createElement('h3');
      //give header a background color
      header.style.backgroundColor = '#f7eae4';
      header.style.color = '#9bf2e1';
      header.style.paddingLeft = '5px';
      header.style.fontStyle = 'italic';
      //set the content of the header to mew.name, every mew has a name
      header.textContent = mew.name;

      //create a paragraph tag for content
      const content = document.createElement('p');
      //give content a background color
      content.style.backgroundColor = '#f5f7f5';
      content.style.fontSize = '1.2rem';
      //set the content to mew.content, every mew has a content
      content.textContent = mew.content;

      //create the small tag to display date
      const date = document.createElement('small');
      //set date content
      date.textContent = new Date(mew.created);
      date.style.color = '#b53e02';

      //append header to div
      div.appendChild(header);
      //append content to div
      div.appendChild(content);
      //append date to div
      div.appendChild(date);

      //now append the entire div to the class mewsElementn
      mewsElement.appendChild(div);

    });
    //when you finish loading, hide the loading spinner
    loadingElement.style.display = 'none';
  });
}