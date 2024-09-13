document.addEventListener('DOMContentLoaded', function () {
    const words = ["Developer", "Tech Enthusiast", "Problem Solver", "Student"];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        let loopTyping = function () {
            if (word.length > 0) {
                document.getElementById('typed-text').innerHTML += word.shift();
                timer = setTimeout(loopTyping, 100);
            } else {
                setTimeout(deletingEffect, 1500);
            }
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        let loopDeleting = function () {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typed-text').innerHTML = word.join("");
                timer = setTimeout(loopDeleting, 50);
            } else {
                i = (i + 1) % words.length;
                typingEffect();
            }
        };
        loopDeleting();
    }

    typingEffect();

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting normally
    
        // Collect form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };
    
        // Send form data to Make.com webhook via AJAX
        fetch('https://hook.us1.make.com/ifqyh9coi2hiyyyyd2ifklg3pjxwn65x', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                document.getElementById("form-response").innerHTML = "<p class='text-success'>Thank you! Your message has been sent.</p>";
                document.getElementById("contact-form").reset(); // Reset form
            } else {
                // Show error message
                document.getElementById("form-response").innerHTML = "<p class='text-danger'>Something went wrong. Please try again later.</p>";
            }
        })
        .catch(error => {
            // Show error message
            document.getElementById("form-response").innerHTML = "<p class='text-danger'>There was an error: " + error.message + "</p>";
        });
    });
    
});
