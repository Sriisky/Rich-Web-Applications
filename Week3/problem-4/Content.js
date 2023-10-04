//array of images
let sanrioImages = [
    "https://www.sanrio.com/cdn/shop/files/ecomm-CHGAL-Core2021_367x353px_07-CN_1000x.png?v=1614324462",
    "https://i0.wp.com/blog.govoyagin.com/wp-content/uploads/2019/09/%E3%80%8C%E5%A4%8F%E3%81%B2%E3%82%9A%E3%82%85%E3%83%BC%E3%82%8D2022%EF%BD%9E%E3%81%82%E3%81%AE%E5%A4%8F%E3%82%92%E3%82%82%E3%81%86%E4%B8%80%E5%BA%A6%EF%BD%9E%E3%80%8D%E3%83%92%E3%82%99%E3%82%B7%E3%82%99%E3%83%A5%E3%82%A2%E3%83%AB.jpg?fit=1191%2C842&ssl=1",
    "https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/bltfbb32a69051ba343/6467adec43cc392290e3ac7e/hellokittyjazwares.png",
    "https://wallpapers-clan.com/wp-content/uploads/2022/12/sanrio-pfp-36.jpg",
	"https://wallpapers.com/images/hd/main-sanrio-characters-7jjpu7c549ruidaf.jpg"
];

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * sanrioImages.length)
    imgs[i].src = sanrioImages[randomImg]
}
//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "HELLO KITTY IS THE BEST.";
}
//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "MEOW MEOW MEOW MEOW";
}

//change the background colour of the body
document.body.style.backgroundColor = 'pink';

 //change the font and colour of all <p> elements
 const paragraphs = document.querySelectorAll('p');
 paragraphs.forEach(paragraph => {
   paragraph.style.fontFamily = 'Cursive, Lucida Handwriting'; // Change the font family to your desired font
   paragraph.style.color = 'pink';
 });

  //change the font and colour of all <body> elements
  const bodies = document.querySelectorAll('body');
  bodies.forEach(body => {
    body.style.fontFamily = 'Fantasy, Copperplate'; // Change the font family to your desired font
    body.style.color = 'yellow';
  });

 //change the background colour of a <div> element with id "div"
const subnav = document.getElementById('subnav');
subnav.style.backgroundColor = 'lime';

//the link that all links will now bring you to
var newLink = 'https://www.sanrio.com/';
//get all the a elements
var allLinks = document.querySelectorAll('a');
//go through every link
for (var i = 0; i < allLinks.length; i++) {
  allLinks[i].href = newLink;
}