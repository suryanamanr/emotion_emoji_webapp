prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "jpg",
    jpg_quality: 90
})

var camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snap() {
    Webcam.snap(function(data_uri) {
        document.getElementById("Result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2vh5kK8Vc/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function speech() {
    var synth = window.speechSynthesis;
    data1 = "The First Prediction Is " + prediction_1;
    data2 = "And The Second Prediction Is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("error found");
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        speech();

        if (results[0].label == "happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (results[0].label == "sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (results[0].label == "angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if (results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
        if (results[0].label == "laugh") {
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if (results[1].label == "laugh") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
    }
}