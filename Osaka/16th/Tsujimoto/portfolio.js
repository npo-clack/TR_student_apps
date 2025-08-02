 const stickman=document.getElementById("TwoTypeStickman");

  stickman.addEventListener("click",()=>{
    stickman.src="燃える.png";
    setTimeout(()=>{
      document.body.classList.add("burning");

      const particleContainer = document.getElementById("tsparticles");
      particleContainer.style.display = "block"; // 表示

  tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex:-1 },
    particles: {
      number: { value: 200 },
      color: {  value: ["#ff5500", "#ffaa00", "#ff2200", "#ff9900"]},
      shape: { type: "circle" },
      size: {value: { min: 2, max: 10 }},
      opacity: { value: 0.7 },
      move: {
        speed: 1,
        direction: "none",
        random:true,
        straight: false
      }
    }
  });
      setTimeout(() => {
      document.body.classList.remove("burning");
      document.body.classList.add("ash");

      particleContainer.style.display = "none";

      const main = document.querySelector("main");
      main.style.display = "none";

      const profile = document.getElementById("profile");
      profile.classList.remove("hidden");
    }, 2000);
},600);
});

window.addEventListener("scroll", () => {
  const photo = document.getElementById("photo");
  const banner = document.getElementById("Banner");

  const rect = photo.getBoundingClientRect();
  const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

  if (!isVisible) {
    banner.classList.add("show");
  } else {
    banner.classList.remove("show");
  }
});