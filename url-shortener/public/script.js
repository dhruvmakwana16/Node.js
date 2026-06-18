async function shortenUrl() {

 const originalUrl =
 document.getElementById("url").value;

 const response =
 await fetch("/shorten", {

   method:"POST",

   headers:{
    "Content-Type":
    "application/json"
   },

   body: JSON.stringify({
      originalUrl
   })

 });

 const data =
 await response.json();

 document
 .getElementById("result")
 .innerHTML =
 `<a href="${data.shortUrl}">
 ${data.shortUrl}
 </a>`;
}