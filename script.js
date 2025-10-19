
// Progress bar animasyonu bu kisimdan yapiyorum 
window.addEventListener("scroll", () => {
  document.querySelectorAll(".skill-card").forEach(card => {
    const rect = card.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100;
    const progress = card.querySelector(".progress");
    const target = card.getAttribute("data-percent");
    if (inView && progress.style.width === "0%") {
      progress.style.width = target + "%";
    }
  });
});

// Modal aç/kapat 
const modal = document.getElementById("skillModal");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = card.getAttribute("data-title");
    document.getElementById("modalDesc").textContent = card.getAttribute("data-desc");
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if(e.target===modal) modal.style.display="none"; });

// Partikül Efekti
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ["#6a11cb","#2575fc","#fff"];

class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;
  }
  draw(){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  for(let i=0;i<150;i++){
    particlesArray.push(new Particle());
  }
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});