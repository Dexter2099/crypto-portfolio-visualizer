import logging
import requests

logger = logging.getLogger(__name__)

def get_price(symbol):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={symbol}&vs_currencies=usd"
    try:
        res = requests.get(url, timeout=10)
        if res.status_code != 200:
            logger.error(
                "CoinGecko request failed with status %s: %s",
                res.status_code,
                res.text,
            )
            return 0.0
        data = res.json()
    except requests.RequestException as exc:
        logger.exception("Error fetching price from CoinGecko: %s", exc)
        return 0.0
    return data.get(symbol, {}).get("usd", 0.0)


def get_coin_list():
    """Return list of all supported coins from CoinGecko."""
    url = "https://api.coingecko.com/api/v3/coins/list"
    try:
        res = requests.get(url, timeout=10)
        if res.status_code != 200:
            logger.error(
                "CoinGecko request failed with status %s: %s",
                res.status_code,
                res.text,
            )
            return []
        return res.json()
    except requests.RequestException as exc:
        logger.exception("Error fetching coin list from CoinGecko: %s", exc)
        return []
