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

    document.getElementById("commentDisplay").appendChild(commentElement);
    document.getElementById("commentText").value = "";
    commentText++
    loadComments();



})
addComment()

}



function addComment() {
    const commentText = document.getElementById("commentText").value;
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'comment': commentText,
        'id': currentIndex // Add the image index for association
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById("commentText").value = "";
      loadComments(); // Refresh comments after adding a new one
    })
    //.catch(error => console.error("Error adding comment:", error)); // Handle errors
  }
  


  function loadComments() {
    fetch("http://localhost:3000/comments")
      .then((response) => response.json())
      .then((data) => {
        const commentDisplay = document.getElementById("commentDisplay");
        commentDisplay.innerHTML = ""; // Clear previous comments

        // Find comments for the current image
        const currentImageComments = data.comments.filter(
          (comment) => comment.id === currentIndex 
        );

        // Update like and dislike counts based on comments
        likeCount = 0;
        dislikeCount = 0;
        currentImageComments.forEach((comment) => {
          if (comment.like) likeCount++;
          if (comment.dislike) dislikeCount++;
        });

        // Update DOM elements with like and dislike counts
        document.getElementById("likeCount").innerText = likeCount;
        document.getElementById("dislikeCount").innerText = dislikeCount;

        // ... rest of your logic to display comments ...
        console.log(loadComments);
      });
  }






  
addComment()
  loadComments();
 reset();
displayImage()

})