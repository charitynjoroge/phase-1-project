document.addEventListener("DOMContentLoaded", () => {
   const images = document.getElementById("images")
   let currentIndex = 0
   let likeCount = 0
   let dislikeCount = 0
   



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
})
console.log();

    function reset(){
    let isLiked = false
   let isDisLiked = false
    document.getElementById("likeCount").innerText = likeCount;
    document.getElementById("dislikeCount").innerText = dislikeCount;
    


document.getElementById("likeButton").addEventListener("click", function(){
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
})



document.getElementById("dislikeButton").addEventListener("click", function(){
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



})


displayImage();


document.getElementById("commentButton").addEventListener("click",function(){
    let commentText = document.getElementById("commentText").value;
    let commentElement = document.createElement("p")
    commentElement.textContent = commentText;

    document.getElementById("commentDisplay").appendChild(commentElement);
    document.getElementById("commentText").value = "";





})


    }
reset();

})