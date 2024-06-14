const menu = document.getElementById("menu")
const cartbtn = document.getElementById("cart-btn")
const cartmoral = document.getElementById("cart-modal")
const cartitems = document.getElementById("cart-items")
const carttotal = document.getElementById("cart-total")
const checount = document.getElementById("checkout-btn")
const closemodal = document.getElementById("close-modal-btn")
const cartcount = document.getElementById("cart-count")
const address = document.getElementById("address")
const andresswarn = document.getElementById("andress-warn")

let cart = [];


//ABRIR O MADAL DO CARRINHO //
cartbtn.addEventListener("click", function () {
    updateCartModal();
    cartmoral.style.display = "flex"
})

//FECHAR MODAL//
cartmoral.addEventListener("click", function (event) {
    if (event.target === cartmoral) {
        cartmoral.style.display = "none"
    }
})
closemodal.addEventListener("click", function () {
    cartmoral.style.display = "none"
})


menu.addEventListener("click", function (event) {
    //console.log(event.target)

    let parentButton = event.target.closest(".add-carrinho")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)

    }

})

//funçao para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1;

    } else {
        cart.push({

            name,
            price,
            quantity: 1,

        })




    }

    updateCartModal()
}

//Atualizar carrinho
function updateCartModal() {
    cartitems.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("dispaly-flex", "justify-content-space-between", "marginbottom-20px", "flex-direction-column",)
        cartItemElement.innerHTML = `
<div style= "display:flex;place-items:center; justify-content:space-between">
<div>
<p style="font-weight:600; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"> ${item.name}</p>
<p style="margin-top:-10px">Qtd ${item.quantity} </p>
<p style="font-weight:600; margin-top:-10px">R$ ${item.price.toFixed(2)}  </p>
</div>

<button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>


</div>
`
        total += item.price * item.quantity

        cartitems.appendChild(cartItemElement)

    })

    carttotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    })

    cartcount.innerHTML = cart.length
}

cartitems.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)

    }

})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];
        console.log(item)

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return

        }
        cart.splice(index, 1);
        updateCartModal()

    }
}

address.addEventListener("input", function (event) {
    let inputValue = event.target.value;
})

checount.addEventListener("click", function () {
    const isOpen = checkRestaurantOpen()
    if (!isOpen) {

        alert("Ops,o restaurante esta fechado")



        return;
    }


    // Adicione um ouvinte de evento de entrada ao campo de endereço
    address.addEventListener("input", function () {
        // Remova a classe error-border ao começar a digitar
        address.classList.remove("error-border"); andresswarn.style.display = "none"; //
    });

    //Adionar pedido no whatsap//

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade:(${item.quantity}) Preço: R$${item.price}|`
        )



    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "5583988213793"

    window.open(`https://wa.me/${phone}?text=${message} Endereço;${address.value}`, "_blank")

    cart = [];


    if (cart.length === 0) return;
    updateCartModal();




    if (address.value === "") {
        andresswarn.style.display = "block";
        address.classList.add("error-border");
    } else {
        // Continuar com o processamento do pedido
        // Certifique-se de ocultar a mensagem se o endereço estiver preenchido
        // Aqui você pode adicionar o código para processar o pedido
    }
})





function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 9 && hora < 12;
}
const spanItem = document.getElementById("horarios-funcionamento")
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("isopen")

} else {

    spanItem.classList.add("isopen")

}

checkout.addEventListener("click", function () {
    // Verifique se o carrinho está vazio
    if (cart.length === 0) {
        console.log("Carrinho vazio. Adicione itens ao carrinho antes de fazer o pedido.");
        return; // Interrompe o processo de fazer o pedido
    }

    // Verifique se o campo de endereço está vazio
    if (address.value === "") {
        console.log("Por favor, preencha o campo de endereço antes de fazer o pedido.");
        return; // Interrompe o processo de fazer o pedido
    }

    // Se o carrinho não estiver vazio e o endereço estiver preenchido, continue com o processo de fazer o pedido

})
