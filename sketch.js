// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/gwkL_R6B/';

let caption;



// Video
let video;
let flippedVideo;
// To store the classification
let label = "waiting...";
let china_snail = [], NUM = 3, index=0;
let bird = [4];
let cman = [4];
let dog = [4];
let dov = [5];
let face = [3];
let finger = [4];
let fish = [3];


let myCanvas;
let chk = 0;
let w = 1200;
let h = 800;
let seq1 = seq2 = seq3 = seq4 = seq5 = [];
let snail = [];
let img ;

let stringSnail_en = [];
let stringSnail_kr = [];
let stringDog_en = [];
let stringDog_kr = [];
let stringGirl_en = [];
let stringGirl_kr = [];
let stringMonster_en = [];
let stringMonster_kr = [];
let stringLion_en = [];
let stringLion_kr = [];

let char0,char1,char2, cahr3, char4, char5, char6, char7, char8, char9, char10, char11, char12, char13, char14, char15, char17, char18;
let tag0,tag1,tag2, tag3, tag4, tag5, tag6,tag7,tag8, tag9, tag10, tag11, tag12, tag13,tag14, tag15,tag16,tag17, tag18;
let timer = 5;

// Load the model first
function preload() {

  classifier = ml5.imageClassifier(imageModelURL + 'model.json');

    tag0 = "snail";
    char0 = new Charac(-70,-20,NUM, tag0,0,seq1);
    char0.load();


    tag1 = "man_";
    char1 = new Charac(w-350,0,NUM+1,tag1,0,seq2);
    char1.load();

    tag2 = "heart";
    char2 = new Charac(250,100,NUM-1,tag2,0,seq3);
    char2.load();

    tag3 = "bird";
    char3 = new Charac(0,h-400,NUM+1,tag3,0,seq4);
    char3.load();

    tag4 = "fish";
    char4 = new Charac(w-300,0,NUM,tag4,0,seq5);
    char4.load();

    tag5 = "rabbit";
    char5 = new Charac(0,0,NUM,tag5,0,seq1);
    char5.load();

    tag6 = "lamb";
    char6 = new Charac(0,0,NUM+3,tag6,0,seq1);
    char6.load();

    tag7 = "china";
    char7 = new Charac(w-350,0,NUM+1,tag7,0,seq1);
    char7.load();

    tag8 = "dog";
    char8 = new Charac(w-700,h-500,NUM+1,tag8,0,seq1);
    char8.load();

    tag9 = "face";
    char9 = new Charac(0,h-300,NUM,tag9,0,seq1);
    char9.load();

    tag10 = "dov";
    char10 = new Charac(0,h-300,NUM+2,tag10,0,seq1);
    char10.load();

    tag11 = "ghost";
    char11 = new Charac(w - 300,0,NUM+1,tag11,0,seq1);
    char11.load();

    tag12 = "godes";
    char12 = new Charac(0,0,NUM+2,tag12,0,seq1);
    char12.load();

    tag13 = "yelfish";
    char13 = new Charac(w - 300,h-300,NUM+2,tag13,0,seq1);
    char13.load();


    tag14 = "wale";
    char14 = new Charac(0,0,NUM+2,tag14,0,seq1);
    char14.load();

    tag15 = "socks";
    char15 = new Charac(0,0,NUM+1,tag15,0,seq1);
    char15.load();

    tag16 = "leg";
    char16 = new Charac(0,0,NUM+4,tag16,0,seq1);
    char16.load();

    tag17 = "finger";
    char17 = new Charac(0,0,NUM+1,tag17,0,seq1);
    char17.load();

    tag18 = "octo";
    char18 = new Charac(0,0,NUM+3,tag18,0,seq1);
    char18.load();

  stringSnail_en = ["snail, a man with green clothes and a creature with a heart","narrowness, a havoc with green motors and a happenstance with a dramatist"
  ,"witness, a applause with green results and a imputation with a cowboy", "friar, a progressivity with green guises and a replacement with a bottleneck","underworld , a riddance with green mittens and a dyeing with a churchyard",
"knowledge , a fur with green keypads and a client with a lust"];
  stringSnail_kr = ["달팽이, 녹색 옷을 입은 남자와 심장을 가진 어떤 생물","좁음, 초록색 모터로 인한 혼란과 극작가와의 사건","목격자, 녹색 결과와 박수, 카우보이와 대치",
  "수도자, 녹색 모양의 진보 및 병목 현상의 대체","언더 월드, 녹색 장갑이 달린 조롱과 교회가있는 염색","지식, 녹색 키패드가있는 모피 및 허영끼있는 클라이언트"];
  stringDog_en = ["a lamb, a dog with sharp nose, an chinese official, a blue space man","a issue , a confidant with sharp pregnancy , an dispensation official , a blue hander investigation",
  "a drag , a chairmanship with sharp gag , an cause official, a blue mica fulcrum","a joblessness , a predator with sharp photofinishing , an garter official , a blue indenture mower",
  "a lamb, a dog with sharp nose, an chinese official, a blue space man"];
  stringDog_kr = ["양, 날카로운 코를 가진 개, 중국 관리, 푸른 우주인","문제, 날카로운 임신에 대한 자신감, 분배 관리, 푸른 전달자에 대한 조사", "끌기, 날카로운 개그가 있는 의장, 원인 관리, 파란 운모광물의 받침",
  "실직, 날카로운 사진 마무리 작업을하는 포식자, 훈장을 받은 관리, 푸른 색 깎는 기계","양, 날카로운 코를 가진 개, 중국 관리, 푸른 우주인"];
  stringGirl_en = ["The Ugly Duckling has a happy time meeting a dreamy girl","The Ugly fur is in a happy wedding , meeting with a dreamy uncertainty",
  "The Ugly april has a happy duplex meeting a dreamy cosmetology","The Strange Duckling has a happy time meeting a dreamy girl", "The Ugly fur is in a happy wedding , meeting with a dreamy uncertainty"];
  stringGirl_kr = ["미운오리새끼는 한 몽상적인 소녀를 만나 행복한 시간을 보낸다","미운 모피는 행복한 결혼식에 있으며, 꿈꾸는 불확실성과 만나다",
  "추악한 4월에는 꿈꿔 온 여러 미용술과의 행복한 만남이 있다","이상한 오리새끼는 한 몽상적인 소녀를 만나 행복한 시간을 보낸다","미운 모피는 행복한 결혼식에 있으며, 꿈꾸는 불확실성과 만나다"];
  stringMonster_en = ["I am happy","I am sad","I am mad","I play a piano", "I like Music"];
  stringMonster_kr = ["에메랄드 색의 사납지만 귀여운 몬스터, 깜짝 놀란 빨간색의 문어, 살짝 다리 한쪽을 들었다","에메랄드 야생적이지만 귀여운 회개, 깜짝 놀란 빨간 정상 회담은 약간의 매력을 올렸다",
  "야생에 귀여운 에메랄드 홀더, 깜짝 놀란 빨간 캔, 벽돌 하나를 약간 들어 올렸다", "에메랄드 색의 사납지만 귀여운 몬스터, 깜짝 놀란 빨간색의  문어, 살짝 다리 한쪽을 들었다",
  "에메랄드 야생적이지만 귀여운 회개, 깜짝 놀란 빨간 정상 회담은 약간의 매력을 올렸다","야생에 귀여운 에메랄드 홀더, 깜짝 놀란 빨간 캔, 벽돌 하나를 약간 들어 올렸다"];
  stringLion_en = ["a Lion with a mask, lying goddess, lurking ghost, yellow fish,pink skin, pigeon  and red faced man in a cave","a negro with a resilience, lying nameplate, lurking paean, yellow devotee, pink decompression, state and red faced relativism in a outfit",
  "a mart with a trough , lying politeness , lurking newspaperman , yellow revolt , pink copper , astrology and red faced bed in a kiln","a delle with a amusement , lying quality , lurking opener , yellow styling , pink forgiveness , amendment and red faced fledgling in a chef",
  "a Lion with a mask, lying goddess, lurking ghost, yellow fish,pink skin, pigeon  and red faced man in a cave", "a negro with a resilience , lying nameplate , lurking paean , yellow devotee , pink decompression , state and red faced relativism in a outfit"];
  stringLion_kr = ["가면을 쓴 사자, 누운 여신, 숨어있는 유령, 노란 물고기, 분홍색 피부, 비둘기, 동굴속의 붉은 얼굴의 남자","탄력성, 거짓말하는 명판, 숨어있는 창백한, 노란색 신봉자, 분홍색 감압상태 및 복장에 있는 상대성",
  "여물통, 거짓말 정중함, 숨어있는 신문사, 노란색 반란, 분홍색 구리, 점성술 및 가마에 붉은 얼굴 침대가있는 마트", "요리사, 놀이, 거짓말 품질, 숨어있는 오프너, 노란색 스타일링, 분홍색 용서, 수정 및 붉은 얼굴을 가진 델리",
  "가면을 쓴 사자, 누운 여신, 숨어있는 유령, 노란 물고기, 분홍색 피부, 비둘기, 동굴속의 붉은 얼굴의 남자","탄력성, 거짓말하는 명판, 숨어있는 창백한, 노란색 신봉자, 분홍색 감압상태 및 복장에 있는 상대성"];

}

function setup() {
  frameRate(5);
  background(255);
  myCanvas = createCanvas(1920, 1080);

    var constraints = {
    audio: false,
      video: {
        facingMode: {
          exact: "environment"
        }
      }
  };
  
  
  // Create the video
  video = createCapture(constraints); //VIDEO
  

  video.size(1200, 800);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();



  //txt2img
}

function draw() {
  background(240,181,181);//252,223,185


  // Draw the video
  image(video, 360, 140, 1200,800);
  //filter(GRAY); //GRAY,THRESHOLD,OPAQUE,INVERT,POSTERIZE,DILATE,BLUR,ERODE

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height /5);
 if(frameCount % 30 == 0){
  timer--;
}
if(timer < 0){
  timer = 5;
}
  if(label == 'empty'){

    textSize(24);
    textAlign(LEFT);
    fill(0);
    text("I am boring",width-800, 50);
    text("나는 지루하다", width-800, 100);

  }else if(label == 'llion'){

    char10.draw();
    char11.draw();
    char12.draw();
    char13.draw();

  textSize(24);
  textAlign(LEFT);
  fill(0);
  text(stringLion_en[timer],360, 50);
  text(stringLion_kr[timer], 360, 100);


  }else if(label == 'monster'){

    char18.draw();

    textSize(24);
    textAlign(LEFT);
    fill(0);
    text(stringMonster_en[timer],360, 50);
    text(stringMonster_kr[timer],360, 100);

  }else if(label == 'girl'){

    char3.draw();
    char4.draw();
    char5.draw();

    textSize(24);
    textAlign(LEFT);
    fill(0);
    text(stringGirl_en[timer],360, 50);
    text(stringGirl_kr[timer], 360, 100);

  }else if(label == 'spacedog'){

    char6.draw();
    char7.draw();
    char8.draw();
    char9.draw();

    textSize(24);
    textAlign(LEFT);
    fill(0);
    text(stringDog_en[timer],360, 50);
    text(stringDog_kr[timer],360, 100);

  }else if(label == 'snailman'){

      char0.draw();
      char1.draw();
      char2.draw();


      textSize(24);
      textAlign(LEFT);
      fill(0);
      text(stringSnail_en[timer],360, 50);
      text(stringSnail_kr[timer],360, 100);

  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  //console.log(results[0].label);
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}


function gotError(error) {
  console.error(error);
}

function gotText(result) {
  // console.log(result.caption);
  fill(255);
  rect(width/2-10, 50-10, caption.width+width/2-10,caption.height+40 );

  caption = createElement('h2', result.caption);
  caption.position(width/2, 50);

}

class Charac{
  constructor(x,y,n,tag,current, seq){
    this.x = x;
    this.y = y;
    //this.img = img;
    this.num = n;
    this.tag= tag;
    this.seq = [];
    seq = [];
    this.seq = seq;
    this.cf= current;
  }

  load(){
    for(let i = 0; i < this.num; i++){
      let imgName = this.tag+ nf(i,1) + ".png";
      this.seq[i] = loadImage(imgName);
    }
  }

  draw(){
    push();
    translate(360,140);
    this.cf = ( this.cf + 1) % this.num;
    image(this.seq[ this.cf], this.x, this.y);
    pop();
     }
}
