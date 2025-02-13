let allyPicks = [];
let enemyPicks = [];
let selectingForAlly = true; // True = selecting for ally, False = selecting for enemy
let heroes = [];

document.addEventListener("DOMContentLoaded", async function () {
    await loadHeroes();
});

async function loadHeroes() {
  try {
      const response = await fetch("http://127.0.0.1:5000/heroes"); 
      const data = await response.json();

      console.log("Received heroes:", data);

      if (!Array.isArray(data)) {
          throw new Error("Heroes data is not in the expected format!");
      }

      heroes = data;
      renderHeroList();
  } catch (error) {
      console.error("Error loading heroes:", error);
  }
}


function renderHeroList() {
  const heroList = document.getElementById("hero-list");
  heroList.innerHTML = "";

  heroes.forEach(heroName => {
      if (!heroName) return;

      let heroElement = document.createElement("div");
      heroElement.classList.add("hero");
      heroElement.innerText = heroName;
      heroElement.onclick = () => selectHero(heroName);
      heroList.appendChild(heroElement);
  });
}


function toggleTeam() {
    selectingForAlly = !selectingForAlly;
    document.querySelector("button").innerText = selectingForAlly ? "🔄 Switch to Enemy Team" : "🔄 Switch to Your Team";
}

function selectHero(heroName) {
    if (selectingForAlly) {
        if (!allyPicks.includes(heroName) && allyPicks.length < 5) {
            allyPicks.push(heroName);
        } else {
            allyPicks = allyPicks.filter(h => h !== heroName);
        }
    } else {
        if (!enemyPicks.includes(heroName) && enemyPicks.length < 5) {
            enemyPicks.push(heroName);
        } else {
            enemyPicks = enemyPicks.filter(h => h !== heroName);
        }
    }
    updateTeams();
}

function updateTeams() {
    document.getElementById("ally-picks").innerText = allyPicks.join(", ");
    document.getElementById("enemy-picks").innerText = enemyPicks.join(", ");
}

async function getRecommendation() {
    const allyPicks = [...document.querySelectorAll("#ally-picks")].map(el => el.innerText);
    const enemyPicks = [...document.querySelectorAll("#enemy-picks")].map(el => el.innerText);

    console.log("📤 Sending Request - Ally Picks:", allyPicks, "Enemy Picks:", enemyPicks);

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ally_picks: allyPicks, enemy_picks: enemyPicks })
        });

        if (!response.ok) {
            throw new Error(`❌ Server Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📥 Received Response:", data); 

        if (!data || !data.recommended_heroes || !Array.isArray(data.recommended_heroes)) {
            throw new Error("Invalid response format from server.");
        }

        displayRecommendations(data.recommended_heroes, data.explanations);
    } catch (error) {
        console.error("❌ Error in getRecommendation:", error.message);
        alert("⚠️ Error fetching prediction. Check console for details.");
    }
}


function displayRecommendations(recommendedHeroes, explanations) {
  console.log("📜 API Response:", recommendedHeroes, explanations);

  const recommendationsDiv = document.getElementById("recommendations");
  const explanationsDiv = document.getElementById("explanation");


  if (!recommendationsDiv || !explanationsDiv) {
      console.error("❌ Missing HTML elements! Ensure 'recommendations' and 'explanation' exist.");
      return;
  }


  recommendationsDiv.innerHTML = "";
  explanationsDiv.innerHTML = "";

  if (!recommendedHeroes || recommendedHeroes.length === 0) {
      recommendationsDiv.innerHTML = "<p>No heroes recommended.</p>";
      explanationsDiv.innerHTML = "<p>No recommendations available.</p>";
      return;
  }


  // recommendationsDiv.innerHTML = "<h3>🛡 Recommended Heroes</h3>";
  recommendedHeroes.forEach(hero => {
      const heroBtn = document.createElement("button");
      heroBtn.textContent = hero;
      heroBtn.classList.add("hero-button");
      heroBtn.onclick = () => addToTeam(hero); 
      recommendationsDiv.appendChild(heroBtn);
  });

  // explanationsDiv.innerHTML = "<h3>📖 Explanation</h3>";
  explanations.forEach(explanation => {
      const explanationPara = document.createElement("p");
      explanationPara.innerHTML = explanation; 
      explanationsDiv.appendChild(explanationPara);
  });
}


