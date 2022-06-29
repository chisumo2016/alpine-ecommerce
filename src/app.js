
document.addEventListener("alpine:init", () => {
  // Header Data
  Alpine.store("header",  {
    //cartItems : 0,
    //cartItems : Alpine.$persist(0),
    cartItemsObject : Alpine.$persist({}),
    watchingItems: Alpine.$persist([]),
    //watchingItems: [],
    get watchlistItems(){
      return this.watchingItems.length
    },

    get cartItems(){
      return Object.values(this.cartItemsObject)
        .reduce((accum, next) => accum + parseInt(next.quantity), 0)
      /*let sum = 0;
      //array
      for (let key in this.cartItemsObject){
        sum += parseInt(this.cartItemsObject[key].quantity)
      }
      return sum;*/
    },
  }),

    // Toast Data Component
  Alpine.data("toast", () => ({

      visible: false,
        delay: 5000,
      percent: 0,
      interval: null,
      timeout: null,
      message:null,
      close() {
      this.visible = false;
      clearInterval(this.interval)
    },

      show(message) {
      this.visible = true
      this.message = message;

      if (this.interval){
        clearInterval(this.interval);
        this.interval = null;
      }

      if (this.timeout){
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.timeout = setTimeout(() => {
        this.visible = false;
        this.timeout = null;
      }, this.delay)
      const startDate = Date.now();
      const futureDate = Date.now() + this.delay;
      this.interval = setInterval(() => {
        const date = Date.now();
      this.percent = (date - startDate) * 100 / (futureDate - startDate);
      if (this.percent >= 100) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }, 30)
  }


 })),

   //Prooduct Item Component
  Alpine.data("productItem",(product) => {
    return {
      id: product.id,
      product,
      quantity: 1 ,

      get watchlistItems(){
        return this.$store.watchlistItems
      },

      /**Add to  WatchList**/
      addToWatchlist(id){
        if (this.$store.header.watchingItems.includes(id)) { //return
          //remove
          this.$store.header.watchingItems.splice(
            this.$store.header.watchingItems.indexOf(id),
            1
          );
          this.$dispatch('notify',{
            message: "The item was remove from your  watchlist"
          })
          //this.$store.toast.show('The item was remove from your  watchlist');
        }else {
          //add
          this.$store.header.watchingItems.push(id);

          this.$dispatch('notify',{
            message: "The item was added into the watchlist"
          })
          //this.$store.toast.show('The item was added into the watchlist');
        }
      },
      isInWatchlist(id){
        return this.$store.header.watchingItems.includes(id) //true or false
      },

      /**Add to Cart**/
      addToCart(id, quantity = 1){
        //this.$store.header.cartItemsObject[id] =  this.$store.header.cartItemsObject[id] || 0;
        this.$store.header.cartItemsObject[id] =  this.$store.header.cartItemsObject[id] || {...product,quantity: 0};
        this.$store.header.cartItemsObject[id] . quantity += parseInt(quantity);
        //this.cartItems++;
        this.$dispatch('notify',{
          message: "The item was added into the cart"
        })
        //this.$store.toast.show('The item was added into the cart');
      },

      /** Remove Item From the Cart**/
      removeItemFromCart(id){
        delete this.$store.header.cartItemsObject[id] ;
        //this.cartItems++;
        this.$dispatch('notify',{
          message: "The item was removed from the cart"
        })
        //this.$store.toast.show('The item was added into the cart');
      },
    }
  });
});