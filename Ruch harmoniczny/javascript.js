const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth - 100;
canvas.height = innerHeight;

var slider = document.getElementById("myRange");

//Funkcja pokazująca wartość powtarzania timera (dla użytkownika wartość prędkości),
//nie jest używana ponieważ szybkość obrotu koła jest tym większa im mniejsza wartość prędkości, 
//nie jest to logiczne dla użytkownika

/*var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = 1 / this.value;
}*/


var r = 200

c.lineWidth = 5;


srodekkolax = canvas.width / 2;
srodekkolay = canvas.height / 2;

//Pierwsza linia promienia koła

c.beginPath();
c.moveTo(canvas.width / 2, canvas.height / 2)
c.lineTo(canvas.width / 2 + r, canvas.height / 2 + r)
c.stroke();

//Klasa Linia odpowiedzialna za tworzenie obiektu który podczas rysowania przyjmuje wygląd linii


class Linia {
    constructor(xs, ys, x, y, color, width){
        this.xs = xs;
        this.ys = ys;
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        
    }
    draw() {
        c.save();
        c.beginPath();
        c.moveTo(this.xs, this.ys);
        c.lineTo(this.x, this.y);
        c.strokeStyle = this.color;
        c.lineWidth = this.width;
        c.stroke();
        c.restore();
    }
    drawdotted() {
        c.save();
        c.beginPath();
        c.setLineDash([5, 5]);
        c.moveTo(this.xs, this.ys);
        c.lineTo(this.x, this.y);
        c.strokeStyle = this.color;
        c.lineWidth = this.width;
        c.stroke();
        c.restore();
    }
}


const linia = new Linia(srodekkolax, srodekkolay, srodekkolax - r, srodekkolay, 'black', 5)
const linia2 = new Linia(linia.x, linia.y, srodekkolax / 4, linia.y, 'blue', 1)
const sprezyna = new Linia(srodekkolax / 4, srodekkolay - r, srodekkolax / 4, linia.y, 'black', 7)

//Klasa odpowiedzialna za tworzenie obiektów które przyjmą kształt koła
//umożliwia rysowanie okręgów jak i wypełnionego koła

class Kolo {
    constructor(srodekx, srodeky, promien, katstart, katkoniec, kolor) {
        this.srodekx = srodekx
        this.srodeky = srodeky
        this.promien = promien
        this.katstart = katstart
        this.katkoniec = katkoniec
        this.kolor = kolor
    }
    draw() {
        c.beginPath();
        c.arc(this.srodekx, this.srodeky, this.promien, this.katstart, this.katkoniec);
        c.stroke();
    }
    drawpelne() {
        c.save();
        c.beginPath();
        c.arc(this.srodekx, this.srodeky, this.promien, this.katstart, this.katkoniec)
        c.fillStyle = this.kolor;
        c.fill();
        c.lineWidth = 1
        c.strokeStyle = this.kolor;
        c.stroke();
        c.restore();
    }
}
const kolo = new Kolo(srodekkolax, srodekkolay, r, 0, 2 * Math.PI)
const punkt = new Kolo(linia.x, linia.y, 10, 0, 2 * Math.PI, 'red')
const punkt2 = new Kolo(srodekkolax / 4, linia.y, 10, 0, 2 * Math.PI, 'red')

//funkcja rekurencyjna która w nieskończoność powtarza rysowanie obiektów

function  animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
    kolo.draw();
    linia.draw();
    punkt.drawpelne();
    punkt2.drawpelne();
    linia2.draw();
    sprezyna.drawdotted();
}

var katpodcos = 0
var katpodsin = 0 

//Wcześniejsza wersja funkcji zmianawczasie, 
//Nie różni się niczym od funkcji zmianawczasie oprócz tego, ze jest dużo mniej przejrzysta
//nie posiada też możliwości zmiany czasu powtarzania się timera
//timer nie funkcjonował prawidłowo ponieważ funkcja w jego środku nie była definiowana za pomocą zmiennej


/*var timer = setInterval(() => {
    katpodcos += -0.01;
    katpodsin += -0.01;
    linia.x = srodekkolax - r*Math.cos(katpodcos);
    linia.y = srodekkolay - r*Math.sin(katpodsin);
    punkt.srodekx = linia.x;
    punkt.srodeky = linia.y;
    punkt2.srodeky = linia.y;
    linia2.xs = linia.x;
    linia2.ys = linia.y;
    linia2.y = linia.y;
    sprezyna.y = linia.y;
}, 1 )*/

//Funkcja i zmienne odpowiedzialne za zmianę pozycji x i y w czasie rysowania
//Umożliwia tworzenie ruchomych animacji

var counter = slider.value;
var zmianawczasie = function(){
    clearInterval(timer);
    counter = slider.value
    katpodcos += -0.01;
    katpodsin += -0.01;
    linia.x = srodekkolax - r*Math.cos(katpodcos);
    linia.y = srodekkolay - r*Math.sin(katpodsin);
    punkt.srodekx = linia.x;
    punkt.srodeky = linia.y;
    punkt2.srodeky = linia.y;
    linia2.xs = linia.x;
    linia2.ys = linia.y;
    linia2.y = linia.y;
    sprezyna.y = linia.y;
    timer = setInterval(zmianawczasie, counter);
}
var timer = setInterval(zmianawczasie, counter);

animate();