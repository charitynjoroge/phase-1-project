 document.addEventListener("DOMContentLoaded", () => {
   const images = document.getElementById("images")
   let commentbtn = document.getElementById('commentButton')
   let currentIndex = 0
   let likeCount = 0
   let dislikeCount = 0
   
   

   

   commentbtn.addEventListener('click', (e) => e.preventDefault())


   function displayImage(){
    
    images.src = `https://picsum.photos/id/${currentIndex}/200/300`
    //reset likes and dislikes for a new image 
     document.addEventListener("click", (e) => {
         e.preventDefault();
     })

} 

document.getElementById("previousButton").addEventListener("click",function(){
    if(currentIndex < 1)currentIndex = 1
    currentIndex --
    displayImage() 
})

document.getElementById("nextButton").addEventListener("click",function(){
    currentIndex ++
    displayImage()
    loadComments()
    })








console.log();

    function reset(){
    let isLiked = false
   let isDisLiked = false
    document.getElementById("likeCount").innerText = likeCount;
    document.getElementById("dislikeCount").innerText = dislikeCount;


    document.getElementById("likeButton").addEventListener("click",function(e){

      e.preventDefault()
      changeLikes()
    })


    document.getElementById("dislikeButton").addEventListener("click",function(e){

      e.preventDefault()
      changeDislikeCount()
    })
    


function changeLikes(){
    if(!isLiked){
    likeCount ++; 
    document.getElementById("likeCount").innerText = likeCount
    isLiked = true;

    if(isDisLiked){
       dislikeCount --;
        document.getElementById("dislikeCount").innerText = dislikeCount
        isDisLiked = false
    }
    }
}



 function changeDislikeCount(){
    if(!isDisLiked){
    dislikeCount ++;
    document.getElementById("dislikeCount").innerText = dislikeCount
    isDisLiked = true

    if(isLiked){
       likeCount --;
        document.getElementById("likeCount").innerText = likeCount
        isLiked = false
    }

   }



}


displayImage();


document.getElementById("commentButton").addEventListener("click",function(){
    let commentText = document.getElementById("commentText").value;
    let commentElement = document.createElement("p")
    commentElement.textContent = commentText;

  
    document.getElementById("commentText").value = "";
    commentText++
    loadComments();



})
addComment()

}



function addComment() {
    const commentText = document.getElementById("commentText").value;
    fetch('./db.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById("commentText").value = "";
      loadComments(); // Refresh comments after adding a new one
    })
    .catch(error => console.error("Error adding comment:", error)); // Handle errors
  }
  


  function loadComments() {
    fetch("./db.json") //adjust path if db.json is located elsewhere
      .then((response) => response.json())
      .then((data) => {
      //const commentsDisplay = document.getElementById("commentsDisplay").value
        commentsDisplay.innerHTML = ''; 
        //create a new element
        const ul = document.createElement("ul");
        //filter comments for the current image
        // Find comments for the current image
        const comments = data.comments.filter(
          (comment) => comment.id === currentIndex.toString()
        );
        

        //loop through the comments and add them to the list
        comments.forEach(comment => {
          const li = document.createElement("li")
          li.textContent = comment.comment;
          ul.appendChild(li);
          
        })
        //append the list to the comments container
        commentsDisplay.appendChild(ul)
        

      })
      .catch(error => console.error("Error loading comments",error))
    }
    loadComments()
        

      document.getElementById("commentButton").addEventListener("click", function(){
        const commentInput = document.getElementById("commentText");
        const commentText = commentInput.value.trim();

        if (commentText){
          const li = document.createElement("li");
          li.textContent = commentText;

          if (commentsDisplay.getElementsByTagName("ul").length === 0) {
            const ul = document.createElement("ul");
            commentsDisplay.appendChild(ul)
          }
          commentsDisplay.getElementsByTagName("ul")[0].appendChild(li)
          commentInput.value = ""; //clear the input after adding the comment
        }
      })
      displayImage()

addComment()
  loadComments();
 reset();
displayImage()

})