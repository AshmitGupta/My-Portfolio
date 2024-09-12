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
});
