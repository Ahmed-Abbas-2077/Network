document.addEventListener('DOMContentLoaded', function () {
    // Add a delegated event listener to handle the "Edit" button click
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const postId = event.target.dataset.postid;
            replacePostContentWithTextarea(postId);
        }
    });

    // add a delegated event listener to handle the "Like" button click
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('like')) {
            const postId = event.target.dataset.postid;
            likePost(postId);
        }
    });
});





    function replacePostContentWithTextarea(postId) {
        console.log(postId)
    //   // Get the post element
    //   const post = document.getElementById(`post-${postId}`);
      // Get the post content element
      const postContent = document.getElementById(`post-content-${postId}`);
      // Get the post content
      const content = postContent.textContent;
      console.log(content);
      // Create a textarea element
      const textarea = document.createElement('textarea');
      // Set the textarea's rows
      textarea.setAttribute('rows', '3');
      // Set the textarea's class
      textarea.classList.add('form-control');
      // Set the textarea's value
      textarea.value = content;
      // Replace the post content with the textarea element
        postContent.parentNode.replaceChild(textarea, postContent);
      // Get the post's "Edit" button
      const editBtn = document.querySelector(`#edit-btn-${postId}`);
      // Change the "Edit" button's text to "Save"
      editBtn.textContent = 'Save';
      // Remove the "Edit" button's "edit-btn" class
      editBtn.classList.remove('edit-btn');
      // Add the "save-btn" class to the "Edit" button
      editBtn.classList.add('save-btn');
  }
  
// Update the event listener to target the "Save" button specifically
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('save-btn')) {
        const postId = event.target.parentElement.dataset.postid;
        const textarea = event.target.parentElement.querySelector('textarea');
        const editedContent = textarea.value;
        saveEditedPost(postId, editedContent);
    }
});
  
  // Function to save the edited post
  function saveEditedPost(postId, editedContent) {
      // Send an AJAX request to update the post on the server
      fetch(`/edit-post/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({ content: editedContent }),
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
          },
      })
      .then(response => {
          if (response.ok) {
              // Refresh the page or update the post content locally
              location.reload();
          } else {
              console.error('Error updating the post');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  
  // Function to get the value of a CSRF cookie
  function getCookie(name) {
      const cookieValue = document.cookie.match('(^|;)\\s*' + name + '=([^;]+)');
      return cookieValue ? cookieValue.pop() : '';
  }

  function likePost(postId) {
    // Send an AJAX request to like the post
    fetch(`/like/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
    .then(response => {
        if (response.ok) {
            // Refresh the page or update the post content locally
            location.reload();
        } else {
            console.error('Error liking the post');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}