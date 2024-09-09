export const cart = [];

export function addToCart(productId){
    let matchingItem;
      cart.forEach((item)=>{
        if(productId==item.productId){
          matchingItem = item;
        }
      })
  
      if(matchingItem){
        matchingItem.Quantity+=1
      }else{
        cart.push(
          {
            productId : productId,
            Quantity : 1
          }
         )
      }
  }