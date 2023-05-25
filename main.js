Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90,
});
camera=document.getElementById("camera");

Webcam.attach('#camera')

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>'
    }
  );
}

console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/P5trhioy8/model.json', modelLoaded);
function modelLoaded(){
    console.log("model loaded!");
}

function speak(){
    var synth =window.speechSynthesis;
    speak_data1="The first prediction is-"+prediction_1;
    speak_data2="The second prediction is-"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function Check() {
    img=document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
if(error){
    console.error(error);
} else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label==answer){
        document.getElementById("update_emoji").innerHTML="&#129305;"
    }
    if(results[0].label==hello){
        document.getElementById("update_emoji").innerHTML="&#9995;"
    }
    if(results[0].label==awesome){
        document.getElementById("update_emoji").innerHTML="&#128076;"
    }
    if(results[0].label==good){
        document.getElementById("update_emoji").innerHTML="&#128077;"
    }
    if(results[0].label==peace){
        document.getElementById("update_emoji").innerHTML="&#9996;"
    }
    if(results[1].label==answer){
        document.getElementById("update_emoji").innerHTML="&#129305;"
    }
    if(results[1].label==hello){
        document.getElementById("update_emoji").innerHTML="&9995;"
    }
    if(results[1].label==awesome){
        document.getElementById("update_emoji").innerHTML="&#128076;"
    }
    if(results[1].label==good){
        document.getElementById("update_emoji").innerHTML="&#128077;"
    }
    if(results[1].label==peace){
        document.getElementById("update_emoji").innerHTML="&#9996;"
    }
}
}