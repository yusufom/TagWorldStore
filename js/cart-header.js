document.addEventListener('DOMContentLoaded', (event) => {
    updateCartDisplay();
});

function addToCart(productName, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, imageUrl: imageUrl });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function incrementProduct(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function decrementProduct(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cart');
    const totalDiv = document.getElementById('total');
    const itemCountDiv = document.getElementById('item-count');

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p class="text-white">Cart is empty</p>';
        totalDiv.textContent = 'Total: £0';
        itemCountDiv.textContent = '0';
        return;
    }

    cartDiv.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center px-md-2 text-white">
                <p>${item.name} - £${item.price} x ${item.quantity}</p>
                <div>
                    <button onclick="incrementProduct('${item.name}')" class="btn btn-sm btn-secondary">+</button>
                    <button onclick="decrementProduct('${item.name}')" class="btn btn-sm btn-secondary">-</button>
                </div>
            </div>
        `;
        cartDiv.appendChild(itemDiv);
    });

    const total = calculateTotal(cart);
    const itemCount = cart.length;
    totalDiv.textContent = `Total: £${total}`;
    itemCountDiv.textContent = `${itemCount}`;
}


// document.addEventListener('DOMContentLoaded', (event) => {
//     updateCartDisplay();
// });

// function addToCart(productName, price, imageUrl) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const productIndex = cart.findIndex(item => item.name === productName);
//     if (productIndex !== -1) {
//         cart[productIndex].quantity += 1;
//     } else {
//         cart.push({ name: productName, price: price, quantity: 1, imageUrl: imageUrl });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartDisplay();
// }


// function incrementProduct(productName) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const productIndex = cart.findIndex(item => item.name === productName);
//     if (productIndex !== -1) {
//         cart[productIndex].quantity += 1;
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartDisplay();
// }

// function decrementProduct(productName) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const productIndex = cart.findIndex(item => item.name === productName);
//     if (productIndex !== -1) {
//         if (cart[productIndex].quantity > 1) {
//             cart[productIndex].quantity -= 1;
//         } else {
//             cart.splice(productIndex, 1);
//         }
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartDisplay();
// }

// function removeProduct(productName) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const productIndex = cart.findIndex(item => item.name === productName);
//     if (productIndex !== -1) {
//         cart.splice(productIndex, 1);
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartDisplay();
// }

// function clearCart() {
//     localStorage.removeItem('cart');
//     updateCartDisplay();
// }

// function calculateTotal(cart) {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
// }

// function updateCartDisplay() {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartItems = document.getElementById('cart-items');
//     const subTotalDiv = document.getElementById('sub-total');
//     const grandTotalDiv = document.getElementById('grand-total');
//     const cartDiv = document.getElementById('cart');
//     const totalDiv = document.getElementById('total');
//     const itemCountDiv = document.getElementById('item-count');

//     if (cart.length === 0) {
//         cartItems.innerHTML = '<tr><td colspan="6">Cart is empty</td></tr>';
//         subTotalDiv.textContent = '£0';
//         grandTotalDiv.textContent = '£0';
//         cartDiv.innerHTML = '<p class="text-white">Cart is empty</p>';
//         totalDiv.textContent = 'Total: £0';
//         itemCountDiv.textContent = '0';
//         return;
//     }

//     cartItems.innerHTML = '';
//     cartDiv.innerHTML = '';
//     cart.forEach(item => {
//         const itemRow = document.createElement('tr');
//         const itemDiv = document.createElement('div');
//         itemDiv.className = 'cart-item';
//         itemDiv.innerHTML = `
//             <div class="d-flex justify-content-between align-items-center px-md-2 text-white">
//                 <p>${item.name} - £${item.price} x ${item.quantity}</p>
//                 <div>
//                     <button onclick="incrementProduct('${item.name}')" class="btn btn-sm btn-secondary">+</button>
//                     <button onclick="decrementProduct('${item.name}')" class="btn btn-sm btn-secondary">-</button>
//                 </div>
//             </div>
//         `;

//         itemRow.innerHTML = `
//             <td class="thumbnail-img">
//                 <a href="#">
//                     <img class="img-fluid" src="images/img-pro-01.jpg" alt="" style="width: 40px; height: 40px" />
                    
//                 </a>
//             </td>
//             <td class="name-pr">
//                 <a href="#">${item.name}</a>
//             </td>
//             <td class="price-pr">
//                 <p>$${item.price}</p>
//             </td>
//             <td class="quantity-box">
//                 <input type="number" size="4" value="${item.quantity}" min="1" step="1" class="c-input-text qty text" onchange="changeQuantity('${item.name}', this.value)">
//             </td>
//             <td class="total-pr">
//                 <p>$${item.price * item.quantity}</p>
//             </td>
//             <td class="remove-pr">
//                 <a href="javascript:void(0)" onclick="removeProduct('${item.name}')" style="font-size: 20px;">
//                 &times;
//                 </a>
//             </td>
//         `;

//         cartItems.appendChild(itemRow);
//         cartDiv.appendChild(itemDiv);
//     });

//     const subTotal = calculateTotal(cart);
//     const grandTotal = subTotal;  // Adjust for any discounts, taxes, etc.
//     const total = calculateTotal(cart);
//     const itemCount = cart.length;
//     totalDiv.textContent = `Total: £${total}`;
//     itemCountDiv.textContent = `${itemCount}`;

//     subTotalDiv.textContent = `£${subTotal}`;
//     grandTotalDiv.textContent = `£${grandTotal}`;
// }

// function changeQuantity(productName, quantity) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const productIndex = cart.findIndex(item => item.name === productName);
//     if (productIndex !== -1) {
//         cart[productIndex].quantity = parseInt(quantity);
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartDisplay();
// }


{/* <img class="img-fluid" src="${item.imageUrl}" alt="" /> */ }