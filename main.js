let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar')

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}
document.getElementById("feedback-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
  
    fetch("http://localhost:3000/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    })
    .then(res => res.text())
    .then(data => {
      document.getElementById("response-message").innerText = data;
      document.getElementById("feedback-form").reset();
    })
    .catch(err => {
      document.getElementById("response-message").innerText = "Failed to send feedback.";
    });
  });
  