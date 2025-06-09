# 💰 Crypto Portfolio Visualizer

A full-stack app to track, visualize, and analyze your cryptocurrency holdings in real-time.

##  Tech Stack

- **Frontend:** React + Vite + Axios + Chart.js
- **Backend:** Python Flask + Flask-CORS + SQLAlchemy
- **API:** CoinGecko (live crypto prices)

---

##  Features

- Add, edit, delete crypto assets
- Realtime market price fetch via CoinGecko
- P/L calculations and total portfolio value
- Pie chart visualization of current holdings
- SQLite database for local persistence

---

##  Installation & Setup

###  Backend (Python/Flask)

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate    # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python app.py
```

### Frontend (React/Vite)

```bash
cd frontend
npm install
npm run dev
```
