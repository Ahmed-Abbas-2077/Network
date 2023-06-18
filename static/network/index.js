document.addEventListener('DOMContentLoaded', function() {
    function replacePostContentWithTextarea(postId) {
      // Get the post element
      const post = document.getElementById(`post-${postId}`);
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
      // Replace the post content with the textarea
      post.replaceChild(textarea, postContent);
      // Get the post's "Edit" button
      const editBtn = post.querySelector('.edit-btn');
      // Change the "Edit" button's text to "Save"
      editBtn.textContent = 'Save';
      // Remove the "Edit" button's "edit-btn" class
      editBtn.classList.remove('edit-btn');
      // Add the "save-btn" class to the "Edit" button
      editBtn.classList.add('save-btn');
  }
  
  // Add an event listener to handle the "Save" button click
  document.addEventListener('click', function(event) {
      if (event.target.classList.contains('save-btn')) {
          // Get the post ID from the parent element
          const postId = event.target.parentElement.dataset.postid;
          // Get the edited content from the textarea
          const textarea = event.target.parentElement.querySelector('textarea');
          const editedContent = textarea.value;
          // Call the function to save the edited post
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
});