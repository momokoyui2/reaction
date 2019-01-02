// Post reactions with real time counter by Hung1001
var script = document.createElement("script");
script.src = "https://www.gstatic.com/firebasejs/5.7.2/firebase.js"; // firebase sdk js
script.onload = function() {
    firebase.initializeApp({
        	apiKey: "AIzaSyDvvXSdJfCbiBM3oqT8IHY8L4LNqthElNY",
    authDomain: "gaixinhxinh-baa65.firebaseapp.com",
    databaseURL: "https://gaixinhxinh-baa65.firebaseio.com",
    projectId: "gaixinhxinh-baa65",
    storageBucket: "gaixinhxinh-baa65.appspot.com",
    messagingSenderId: "284490494774"
    }); /* replace with your info */
    (function(doc, fb) {
        function reaction(_button, _action) {
            var btn = doc.getElementsByClassName(_button)[0],
                id = btn.getAttribute("data-post-id"),
                count;

            if (localStorage.getItem(_action) !== null) {
                var j = JSON.parse(localStorage[_action]);
                for (i = 0; i < j.length; i++) {
                    if (j[i] === id) btn.classList.add(_action);
                }
            };

            fb.ref(_action + "/" + id + "/total").on("value", function(e) {
                count = e.val() || 0;
                btn.querySelector(".total").innerText = count;
            });

            btn.addEventListener("click", function(t) {
                t.preventDefault();
                this.classList.toggle(_action);
                if (this.classList.contains(_action)) {
                    if (localStorage.getItem(_action) === null) {
                        localStorage.setItem(_action, JSON.stringify([id]));
                    } else {
                        var all = JSON.parse(localStorage[_action]),
                            repeated = all.filter(function(e) {
                                return e == id
                            }).length;
                        if (!repeated) {
                            all.push(id);
                            localStorage.setItem(_action, JSON.stringify(all));
                        }
                    }
                    count++;
                } else {
                    var json = JSON.parse(localStorage[_action]);
                    for (var i = 0; i < json.length; i++) {
                        if (json[i] === id) json.splice(i, 1);
                    }
                    localStorage.setItem(_action, JSON.stringify(json));
                    count--;
                }
                fb.ref(_action + "/" + id + "/total").set(count);
            })
        }
        reaction("like-button", "like"); // start like button
        reaction("love-button", "love"); // start love button
        reaction("haha-button", "haha"); // start love button
        reaction("wow-button", "wow"); // start love button
        reaction("sad-button", "sad"); // start love button
        reaction("angry-button", "angry"); // start love button
        reaction("dizzy-button", "dizzy"); // start love button
        reaction("yay-button", "yay"); // start love button
        // More button here
    })(document, firebase.database());
};
document.getElementsByTagName("body")[0].append(script);