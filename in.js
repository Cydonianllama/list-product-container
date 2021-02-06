const containerProducts = document.getElementById('container-products');
const dropdown1_ = document.getElementById('dropdown1-control');


function dropdown1(element){
    
    const toggleDropdown = (contentDropdown) => {
        if (contentDropdown.style.visibility === "visible") {
            contentDropdown.style.height = "0";
            contentDropdown.style.visibility = "hidden";
        }else {
            contentDropdown.style.height = "150px";
            contentDropdown.style.visibility = "visible";
        }
    }

    let container = element.parentNode;
    
    element.addEventListener('click',(event) => {
        let hideContent = container.querySelector('.dropdown-content');
        toggleDropdown(hideContent)
        event.preventDefault();
    })


}

var products = [] // product array 

function createProduct (product_) {

    return new product(
        product_.titleProduct,
        product_.mainDescription,
        product_.price,
        product_.offert,
        product_.typeProduct,
        product_.statusShipping
    )

}

function getProductsFetch(){

    var productJson = [
        {
            titleProduct: 'papayata', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papay', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papaya', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papaya', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papaya', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papaya', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papayasa', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        },
        {
            titleProduct: 'papayasa', // string 
            mainDescription: 'fruta grande', // string 
            price: 15.5, // number 
            offert: 30, // number 
            statusShipping: 'free to shipping', // string
            typeProduct: 'fruit', /// string 
        }   
    ];

    return productJson;
}

class ProductContainer{
    
    limitProductInOneView = 6; // number 
    QuantityProducts; //number 
    idPagination; //string
    containerProduct; // string
    products; //array object product
    
    constructor(idPagination,containerProduct,products){
        this.idPagination = idPagination;
        this.containerProduct = containerProduct;
        this.products = products;
    }

    createProduct(product_) {

        return new product(
            product_.titleProduct,
            product_.mainDescription,
            product_.price,
            product_.offert,
            product_.typeProduct,
            product_.statusShipping
        )

    }

    renderProducts(index){

        let stringElements = '';

        this.QuantityProducts = this.products.length;

        if (this.QuantityProducts > this.limitProductInOneView) {
            this.generatePagination(this.QuantityProducts);
        }

        let start = (this.limitProductInOneView * (index-1));
        let counter = 0;
        this.products.forEach( (card,i ) => {
            if (i >= start && counter < this.limitProductInOneView){
                stringElements = stringElements + card.render();
                counter++;
            }
        })

        this.containerProduct.innerHTML = stringElements;

    }

    onClickPaginationButton(index){
        this.renderProducts(index)
    }

    listenersPagination(Container,self) {

        let buttons = Container.childNodes;
        buttons.forEach(item => {

            if(item.tagName === 'BUTTON'){

                var index_ = item.dataset.value;

                item.addEventListener('click', (event) => {

                    self.onClickPaginationButton(parseInt(index_))
                    event.preventDefault();

                });

            }
        })

    }

    generatePagination(quantity){

        console.log('generating pagination');

        let containerPagination = document.getElementById(this.idPagination);

        let stringButtons = "";

        for(let i = 0 ; i <= quantity/this.limitProductInOneView ; i++){
            stringButtons = stringButtons + `<button data-value = "${i+1}"class="pagination-item">${i+1}</button>`;
        }

        containerPagination.innerHTML = stringButtons;

        this.listenersPagination(containerPagination,this)
    
    }

}

class product{

    titleProduct; // string 
    mainDescription; // string 
    price; // number 
    offert; // number 
    statusShipping; // string
    typeProduct; /// string 

    constructor(titleProduct, mainDescription, price, offert, typeProduct, statusShipping){
        this.titleProduct = titleProduct;
        this.mainDescription = mainDescription;
        this.price = price;
        this.offert = offert;
        this.typeProduct = typeProduct;
        this.statusShipping = statusShipping;
    }

    GetOffertValue(){
        let offValue = this.price * (this.offert/100) 
        return (this.price - offValue).toFixed(2).toString();
    }

    orderNow(){

    }

    addToCart(){

    }

    render(){
        return`
            <div class="product-card">
                <div class="product-img d-flex flex-center">
                    product image
                </div>
                <div class="column-container mb-1 p-3">
                    <a href="#" class="product-name">${this.titleProduct}</a>
                    <span class="product-main-description mb-3">${this.mainDescription}</span>
                    <p class="product-price"> $ ${this.price} <span class="product-offert ml-1"> $ ${this.GetOffertValue()}</span></p>
                </div>
                <div class="column-container">
                    <span class="product-shiping-status mb-1 ml-1">${this.statusShipping}</span>
                    <button class="btn btn-primary mb-1 ">add to cart</button>
                    <button class="btn btn-primary">buy</button>
                </div>
            </div>         
        `;
    }

}

function app(){

    //active the dropdown
    dropdown1(dropdown1_);

    // for testing
    getProductsFetch().forEach((product_) => {
        products.push(createProduct(product_))
    })

    const productContainer_ = new ProductContainer('pagination',containerProducts,products);
    productContainer_.renderProducts(1);
    //renderProducts()
}

app();