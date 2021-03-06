export function build_cart() {
    let cart = `
    <div class="cart">
    <div class="card border-primary mb-3">
      <div class="card-header">Header</div>
      <div class="order-display__order">
    `;
    let base = JSON.parse(sessionStorage.getItem('productList')) || [];
    let arrayNum = JSON.parse(localStorage.getItem('cart')) || [];
    base.forEach(element => {
        if (arrayNum[element.id - 1] !== 0) {
            cart += '<div class="order__main-info"><div class="order__logo"><img src="' + element.images + `" width="150px" alt=""></div>
            <div class="order__description">
            <div class="order__information">
            
            <h3>`+ element.productName + `</h3>
            
            <p>` + element.productDescription + `</p>
            <div class="order__size">
                Стандарт
            </div>
            </div>
            <div class="order__buy" id="pizzas.5">
                <div class="order__price">`+ element.price + `</div>
                <div class="order__amount-plus-minus">
                <button class="order__amount-minus kek" tovarCount = "`+ element.id + `">-</button>
                <div class="order__amount">`+ arrayNum[element.id - 1] + `
                </div>
                <button class="order__amount-plus kuk"tovarCount = "`+ element.id + `">+</button>
                </div>
            </div>
        </div></div>`;
        }
       
    });
    cart += `</div></div><div><form class="order__registration-blank">
        <h2>Оформление заказа</h2>
        <div class="form_cart">
          
            <input type="text" class="form-control" id="name" placeholder="Имя" required pattern="([A-Za-z]|[А-Яа-я]|[ ]){2,20}">
            <input type="text" class="form-control" id="number" placeholder="Телефон (пр. 0964772430)" required pattern="[0]{1}[0-9]{9}">
            <input type="text" class="form-control" id="email" placeholder="E-mail (example@gmail.com)" required pattern="([A-Za-z]|[0-9]){4,20}[@]{1}[a-z]{3,10}[.]{1}[a-z]{2,5}">
  
      
  
            <input type="text" class="form-control" id="city" placeholder="Город" required pattern="([A-Za-z]|[А-Яа-я]|[А-Яа-а]|[ ]){4,20}">
            <input type="text" class="form-control" id="street" placeholder="Улица" required pattern="([A-Za-z]|[А-Яа-я]|[1-9]|[ ]){4,20}">
            <input type="text" class="form-control" id="house" placeholder="Дом" required pattern="[1-9]{1,3}">
            <input type="text" class="form-control" id="flat" placeholder="Квартира (необяз.)" pattern="[1-9]{1,4}">
                <input type="text" class="form-control" id="entrance" placeholder="Подъезд (необяз.)" pattern="[1-9]{1,2}">
  
        
                <input type="text" class="form-control" id="date" placeholder="Дата (дд.мм)" required pattern="[0-9]{2}[.]{1}[0-9]{2}">
                <input type="text" class="form-control" id="time" placeholder="Время (чч:мм)" required pattern="[0-9]{2}[:]{1}[0-9]{2}">
  
        </div>
        <div class="_payment">
            <h2 class="pay-title">Оплата</h2>
            <select class="custom-select" id = "payment_select">
            <option>Наличные</option>
            <option>Карта</option>
            </select>
        </div>
        <div ><button type="submit" class="btn btn-danger">Заказать</button></div>
  
    </form></div></div>`;
    document.querySelectorAll('.kek').forEach(item => {
        
        item.addEventListener('click', () => {
            console.log('1');
            decrease(item.getAttribute('tovarCount')); 
        });
        
    });
    document.querySelectorAll('.kuk').forEach(item => {
        item.addEventListener('click', () => {
            increase(item.getAttribute('tovarCount')); 
            console.log(item.getAttribute('tovarCount'));
        });
        
    });

    return cart;

}

export function add_to_cart(id) {
    let base = JSON.parse(sessionStorage.getItem('productList')) || [];
    let arrayNum = [];
    if (localStorage.getItem('cart') === null) {
        base.forEach(() => {
            arrayNum.push(0);
        });
    }
    else {


        arrayNum = JSON.parse(localStorage.getItem('cart')) || [];
    }

    arrayNum[id - 1] += 1;
    localStorage.setItem('cart', JSON.stringify(arrayNum));
    updateCartCount();
}
export function updateCartCount() {
    let base = [];
    base = JSON.parse(localStorage.getItem('cart')) || [];
    let count = base.reduce((a, b) => a + b, 0);
    document.getElementById('cart-count').innerHTML = count;
}

export function increase(id) {
    let arrayNum = JSON.parse(localStorage.getItem('cart')) || [];
    let idint = parseInt(id);
    
    arrayNum[idint - 1] += 1;
    localStorage.setItem('cart', JSON.stringify(arrayNum));
    updateCartCount();
    const rootDiv = document.getElementById('root');
    rootDiv.innerHTML = build_cart();

}
export function decrease(id) {
    let arrayNum = JSON.parse(localStorage.getItem('cart')) || [];
    let idint = parseInt(id);
    arrayNum[idint - 1] -= 1;
    localStorage.setItem('cart', JSON.stringify(arrayNum));
    updateCartCount();
    const rootDiv = document.getElementById('root');
    rootDiv.innerHTML = build_cart();
}

export function SendOrder() {
    let order = {
        cart: localStorage.getItem('cart'),
        name: document.getElementById('name').value,
        number: document.getElementById('number').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value,
        street: document.getElementById('street').value,
        house: document.getElementById('house').value,
        flat: document.getElementById('flat').value,
        entrance: document.getElementById('entrance').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        payment_select: document.getElementById('payment_select').value
    };
    setData(order);
    window.location.hash = '#order';
    const rootDiv = document.getElementById('root');
    rootDiv.innerHTML = orderCreated(order);
    localStorage.clear();

}

export function orderCreated(order) {
    let cart = `
    <div class="cart">
    <div class="card border-primary mb-3">
      <div class="card-header">Header</div>
      <div class="order-display__order">
    `;
    let base = JSON.parse(sessionStorage.getItem('productList')) || [];
    let arrayNum = JSON.parse(localStorage.getItem('cart')) || [];
    base.forEach(element => {
        if (arrayNum[element.id - 1] !== 0) {
            cart += '<div class="order__main-info"><div class="order__logo"><img src="' + element.images + `" width="150px" alt=""></div>
            <div class="order__description">
            <div class="order__information">
            
            <h3>`+ element.productName + `</h3>
            
            <p>` + element.productDescription + `</p>
            <div class="order__size">
                Стандарт
            </div>
            </div>
            <div class="order__buy" id="pizzas.5">
                <div class="order__price">`+ element.price + `</div>
                <div class="order__amount-plus-minus">
                <div class="order__amount">`+ arrayNum[element.id - 1] + `
                </div>
                </div>
            </div>
        </div></div>`;
        }


    });
    cart += `</div></div><div>
    <p>Name:`+ order.name + `</p>
    <p>Number:`+ order.number + `</p>
    <p>Email:`+ order.email + `</p>
    <p>City:`+ order.city + `</p>
    <p>Street:`+ order.street + `</p>
    <p>House:`+ order.house + `</p>
    <p>Flat:`+ order.flat + `</p>
    <p>Entrance:`+ order.entrance + `</p>
    <p>Date:`+ order.date + `</p>
    <p>Time:`+ order.time + `</p>
    <p>Payment:`+ order.payment_select + `</p>
    </div></div>`;
    return cart;
}
async function setData(order) {

    return await fetch('https://my-json-server.typicode.com/VisualX2/OKRLABA4/offers', {
        method: 'POST',
        body: JSON.stringify(order)
    }).then(response => {
        if (response.ok) {
            console.log('yay');
            return response.json();
        }
        else {
            window.location.hash = 'error';
        }
    });
}