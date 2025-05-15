import requests

def get_price(symbol):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={symbol}&vs_currencies=usd"
    res = requests.get(url)
    data = res.json()
    return data.get(symbol, {}).get('usd', 0.0)
