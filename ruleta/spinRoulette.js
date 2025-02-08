const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const resultat = document.getElementById("resultat");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
let noms = [];
let angle = 0;
let spinning = false;

// Función para dibujar la ruleta
function drawRoulette(names, currentAngle = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const numSegments = names.length;
    if (numSegments === 0) return;
    const segmentAngle = (2 * Math.PI) / numSegments;

    const pastelColors = ["#4de98e", "#f594d8", "#79b3ff", "#ffba82", "#88e695", "#a09afc", "#8df7d3", "#fffd98"];

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate((currentAngle * Math.PI) / 180);
    ctx.translate(-150, -150);
    
    names.forEach((name, index) => {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, index * segmentAngle, (index + 1) * segmentAngle);
        ctx.fillStyle = pastelColors[index % pastelColors.length]; 
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(index * segmentAngle + segmentAngle / 2);
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px Arial"; 
        ctx.fillText(name, 70, 5);
        ctx.restore();
    });
    ctx.restore();

    // Dibujar una flecha más estilizada
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(295, 145);
    ctx.lineTo(310, 150);
    ctx.lineTo(295, 155);
    ctx.lineTo(285, 150);
    ctx.closePath();
    ctx.fill();
}

// Girar la ruleta
spinButton.addEventListener("click", function () {
    if (noms.length === 0) {
        alert("Carrega primer la llista de noms!");
        return;
    }
    if (spinning) return;
    
    spinning = true;
    spinSound.play();
    let rotation = Math.random() * 360 + 360 * 3;
    let duration = 3000;
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let easing = Math.min(progress / duration, 1);
        angle = easing * rotation;

        drawRoulette(noms, angle);

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            winSound.play();
            let segmentAngle = 360 / noms.length;
            let adjustedAngle = (angle % 360) + segmentAngle / 2;
            let winningIndex = Math.floor((360 - adjustedAngle) / segmentAngle) % noms.length;
            resultat.innerText = `Nom seleccionat: ${noms[winningIndex]}`;
        }
    }

    requestAnimationFrame(animate);
});

document.getElementById("loadNames").addEventListener("click", function () {
    loadNames(function(loadedNames) {
        noms = loadedNames;
        drawRoulette(noms); 
    });
});
