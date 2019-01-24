module.exports = function Cart(oldcart){
    this.items = oldcart.items || {};
    this.totalQty = oldcart.totalQty || 0;
    this.totalPrice = oldcart.totalPrice || 0;
    this.add = function(item,id){
        var storeditems=this.items[id];
        if(!storeditems){
            storeditems = this.items[id]={item : item ,qty : 0,price: 0};
            
        }
        storeditems.qty++;
        storeditems.price = storeditems.item.price * storeditems.qty;
        this.totalQty++;
        this.totalPrice += storeditems.price;
    };
    
    this.reduceByOne = function(id){
      this.items[id].qty--;
      this.items[id].price -= this.items[id].item.price;
      this.totalQty--;
      this.totalPrice -= this.items[id].item.price;
      
      if(this.items[id].qty <= 0){
          delete this.items[id];
      }
    };
    
    this.removeitem = function(id){
      this.totalQty -= this.items[id].qty;
      this.totalPrice -= this.items[id].price;
      delete this.items[id];
    };
    
    this.generatearray = function () {
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};