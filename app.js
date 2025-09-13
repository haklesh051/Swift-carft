const itemsGrid = document.getElementById("itemsGrid");

// Load items from Firestore
function loadItems(){
  db.collection("items").where("status", "==", "active")
    .get()
    .then(snapshot => {
      itemsGrid.innerHTML = "";
      snapshot.forEach(doc => {
        const item = doc.data();
        const card = document.createElement("div");
        card.classList.add("item-card");
        card.innerHTML = `
          <img src="${item.imageURL}" alt="${item.title}" />
          <h3>${item.title}</h3>
          <p>₹${item.price}</p>
          <p>${item.category} | ${item.condition}</p>
          <button onclick="orderItem('${doc.id}')">Buy / Swap</button>
        `;
        itemsGrid.appendChild(card);
      });
    });
}

function orderItem(itemId){
  const user = auth.currentUser;
  if(!user){ alert("Please login first"); return; }

  const orderRef = db.collection("orders").doc();
  orderRef.set({
    userId: user.uid,
    itemId: itemId,
    status: "Pending",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => alert("Order Placed! Check your dashboard"));
}

loadItems();
