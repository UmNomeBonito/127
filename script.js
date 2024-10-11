// Definir variáveis para coordenadas e pontuações dos pulsos
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;
let leftWristScore = 0;  // Pontuação do pulso esquerdo
let rightWristScore = 0; // Pontuação do pulso direito

// Variáveis de status das músicas
let leftWristMusicStatus = "";
let rightWristMusicStatus = "";

let music1, music2;
let video;
let poseNet;

function preload() {
    // Carregar os dois arquivos de música
    music1 = loadSound('music.mp3'); // Substitua pelos arquivos de música que você baixou
    music2 = loadSound('music2.mp3');
}

function setup() {
    // Criar a tela e posicioná-la no centro
    createCanvas(640, 480).position((windowWidth - width) / 2, 150);
    
    // Acessar a webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();  // Ocultar a visualização padrão da webcam

    // Inicializar o PoseNet
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);  // Executar PoseNet quando houver poses detectadas
}

function modelLoaded() {
    console.log('Modelo PoseNet carregado');
}

function gotPoses(results) {
    if (results.length > 0) {
        let pose = results[0].pose;

        // Buscar coordenadas dos pulsos esquerdo e direito
        leftWristX = pose.leftWrist.x;
        leftWristY = pose.leftWrist.y;
        rightWristX = pose.rightWrist.x;
        rightWristY = pose.rightWrist.y;

        // Obter pontuação dos pulsos
        leftWristScore = results[0].pose.keypoints[9].score;  // Pulso esquerdo
        rightWristScore = results[0].pose.keypoints[10].score; // Pulso direito

        console.log(`Pulso Esquerdo - X: ${leftWristX}, Y: ${leftWristY}, Score: ${leftWristScore}`);
        console.log(`Pulso Direito - X: ${rightWristX}, Y: ${rightWristY}, Score: ${rightWristScore}`);
    }
}

function draw() {
    // Desenhar o vídeo da webcam diretamente no canvas
    image(video, 0, 0, width, height);

}

function modelLoaded() {
    console.log('PoseNet foi inicializado.');
}

    // Detectar se o pulso esquerdo está sendo mostrado
    leftWristMusicStatus = music1.isPlaying();
    if (leftWristScore > 0.2) {
        // Desenhar círculo no pulso esquerdo
        circle(leftWristX, leftWristY, 20);

        // Parar a música 2
        music2.stop();

        // Se a música 1 não estiver tocando, tocá-la
        if (leftWristMusicStatus == false) {
            music1.play();
            document.getElementById("music-name").innerText = "Peter Pan Theme";
        }
    }

    // Detectar se o pulso direito está sendo mostrado
    rightWristMusicStatus = music2.isPlaying();
    if (rightWristScore > 0.2) {
        // Desenhar círculo no pulso direito
        circle(rightWristX, rightWristY, 20);

        // Parar a música 1
        music1.stop();

        // Se a música 2 não estiver tocando, tocá-la
        if (rightWristMusicStatus == false) {
            music2.play();
            document.getElementById("music-name").innerText = "Harry Potter Theme";
        }
    }
}
