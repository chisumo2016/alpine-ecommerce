
document.addEventListener("alpine:init", () => {
  Alpine.data("index", () => ({
      cartItems : 0,
      watchingItems: [],

      get watchlistItems(){
          return this.watchingItems.length
      },


    /**Add to Cart**/
    addToCart(){
       this.cartItems++;
       this.toast.show('The item was added into the cart');
    },

    /**Add to  WatchList**/
    addToWatchlist(id){
      if (this.watchingItems.includes(id)) { //return
        //remove
        this.watchingItems.splice(this.watchingItems.indexOf(id));
        this.toast.show('The item was remove from your  watchlist');
      }else {
        //add
        this.watchingItems.push(id);
        this.toast.show('The item was added into the watchlist');
      }
    },
    isInWatchlist(id){
      return this.watchingItems.includes(id) //true or false
    },

    //Notification
    toast:{
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

    }
  }));
});