
export function generateCatalog() {
    let base = JSON.parse(sessionStorage.getItem("productList")) || [];
    let catalog = `
<h1>Product Catalog.</h1>
<div class = "jumbotron">
<h1>Basic pizza</h1>
<div id = "first_category" class = "pizzas_category"">
`
catalog += build_category(base.filter(element => element.categoryId == 1) || [], catalog);

    catalog += `</div>
<h1>Classic pizza</h1>
<div id = "second_category" class = "pizzas_category">
`
    catalog += build_category(base.filter(element => element.categoryId == 2) || [], catalog);
    catalog += `</div>
<h1>Delux pizza</h1>
<div id = "third_category" class = "pizzas_category">
`
catalog += build_category(base.filter(element => element.categoryId == 3) || [], catalog);
    catalog += `</div>
<h1>Snacks</h1>
<div id = "fourth_category" class = "pizzas_category">
`
catalog += build_category(base.filter(element => element.categoryId == 4) || [], catalog);
    catalog += `</div>
<h1>Drinks</h1>
<div id = "fifth_category" class = "pizzas_category">
`
catalog += build_category(base.filter(element => element.categoryId == 5) || [], catalog);

    return catalog;
}
function build_category(uwu) {
    let catalog = " ";
    uwu.forEach(element => {
        catalog += `<div class = "card border-secondary mb-3" style = "max-width: 350px;">`

        catalog += "<div class = 'card-body'><h5 class = 'card-title'>" + element.productName + "</h5></div>";
        catalog += `<img src = '` + element.images + `' onclick="return location.href = '#catalog/` + element.id + `'" class='d-block user-select-none' width='100%' height='200' aria-label='Placeholder: Image cap' focusable='false' role='img' preserveAspectRatio='xMidYMid slice' viewBox='0 0 318 180' style='font-size:1.125rem;text-anchor:middle'>`;
        catalog += "<div class = 'card-body'><p class='card-text'>" + element.productDescription + "</p></div>";
        catalog += "<div class = 'card-body'><h2>" + element.price + " грн.</h2><p>" + element.weight + " г.</p><h6></div>"
        catalog += "<button type='button' class='btn btn-danger btn-add-to-cart' tovarNum='" + element.id + "'>В Корзину</button></div>"

    });
    
    return catalog;
}