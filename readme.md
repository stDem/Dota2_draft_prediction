# 🎮 Dota 2 Draft Prediction

Created by:
- Anastasiia Demidova (anastasiia.demidova@study.thws.de);
- Mark Erokhin (mark.erokhin@study.thws.de)

Gihub link: https://github.com/stDem/Dota2_draft_prediction.git.

A web application that helps players **predict the best hero picks** in Dota 2 drafts using **machine learning and NLP**. The app recommends heroes based on **ally and enemy picks** and provides **detailed explanations** using AI.

## 📙 Datasets:
1. Games dataset:

  Each row of the dataset is a single game with the following features (in the order in the vector):
  - Team won the game (1 or -1)
  - Cluster ID (related to location)
  - Game mode (eg All Pick)
  - Game type (eg. Ranked)
  - till end: Each element is an indicator for a hero.
  Value of 1 indicates that a player from team '1' played as that hero and '-1' for the other team.

  Hero can be selected by only one player each game. This means that each row has five '1' and five '-1' values.

  We so we removed the following columns:
  - Cluster ID – represents the region of the game.
  - Game mode – indicates the mode (e.g., All Pick, Captains Mode).
  - Game type – ranked or unranked.

2. heroes.json:

  Consists of heroes' names and IDs.

3. heroes_skills.json:

  Consists of different heroes' info like name, id, description, abiliyies, talents, etc.


## 🌟 Features  
✅ **Hero Draft Prediction** – Get recommended heroes based on the current draft.  
✅ **AI-Generated Explanations** – Understand why a hero is a good pick based on current picks.  
✅ **Interactive UI** – Select heroes by clicking and switch between teams easily.  
✅ **Machine Learning Model** – Uses an **XGBoost model** trained on Dota 2 drafts.  
✅ **NLP Analysis** – Uses a **GPT-based model** to explain hero recommendations.  

---

## 🏗️ Tech Stack  
### **Frontend:**  
- **HTML, CSS, JavaScript** – Vanilla frontend for easy interactions.  

### **Backend:**  
- **Flask** – Python backend to serve predictions.  
- **XGBoost** – Trained ML model for hero recommendations.  
- **Transformers (GPT-2)** – NLP model for explanations.   

---

## 🎮 How It Works  
1️⃣ **Select Heroes** – Click on heroes to assign them to a team.  
2️⃣ **Switch Teams** – Easily toggle between selecting for Radiant or Dire.  
3️⃣ **Get Predictions** – Click **"Get Prediction"** to receive recommended heroes.  
4️⃣ **Read Explanations** – See why the AI recommends each hero.  

---

## 🛠️ Installation & Setup  
1️⃣ **Clone repository**  
```bash  
git clone https://github.com/stDem/Dota2_draft_prediction.git  
```
2️⃣ **Install dependencies**  
```bash  
pip install -r requirements.txt  
```
3️⃣ **Run locally**  
```bash  
python app.py
```
4️⃣ **Open index.html**  
```  
open index.html with live server
```

## Project composition:
- **dota_draft_prediction.ipynb** - Jupyter Notebook includes both models and testing;
- **xgboost_dota_draft_model.pkl, label_encoder.pkl** - saved trained model;
- **dota2Train.csv, heroes.json, heroes_skills.json** - datsets for model training and getting prediction and explnation;
- **main.py, app.py** - for training model and loading it;
- **index.html, script.js, style.css, Space_Grotesk - using for web-application.

---

## 📜 License  
This project is **open-source** under the MIT License.  


