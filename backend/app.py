from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, PortfolioItem
from services.coingecko import get_price

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)
CORS(app)

@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    items = PortfolioItem.query.all()
    portfolio = []
    for item in items:
        current_price = get_price(item.symbol)
        current_value = round(current_price * item.quantity, 2)
        profit_loss = round((current_price - item.buy_price) * item.quantity, 2)
        portfolio.append({
            "id": item.id,
            "symbol": item.symbol,
            "quantity": item.quantity,
            "buy_price": item.buy_price,
            "current_price": current_price,
            "current_value": current_value,
            "profit_loss": profit_loss
        })
    return jsonify(portfolio)

@app.route('/portfolio', methods=['POST'])
def add_portfolio_item():
    data = request.json
    new_item = PortfolioItem(
        symbol=data['symbol'],
        quantity=data['quantity'],
        buy_price=data['buy_price']
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Asset added successfully"}), 201

@app.route('/portfolio/<int:item_id>', methods=['DELETE'])
def delete_portfolio_item(item_id):
    item = PortfolioItem.query.get(item_id)
    if item is None:
        return jsonify({"error": "Asset not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Asset removed"})

@app.route('/portfolio/<int:item_id>', methods=['PUT'])
def update_portfolio_item(item_id):
    data = request.json
    item = PortfolioItem.query.get(item_id)
    if item is None:
        return jsonify({"error": "Asset not found"}), 404
    if 'quantity' in data:
        item.quantity = data['quantity']
    if 'buy_price' in data:
        item.buy_price = data['buy_price']
    db.session.commit()
    return jsonify({"message": "Asset updated"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
