//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
   
})();
//Сахүүтэй ажиллах контроллер
var financeController = (function() {
 
})();
//Програмын холбогч контроллер
var appController = (function(uiController, financeController) {

    var ctrlAddItem = function(){
        //дэлгэцнээс оруулсан өгөгдлийг олж авна
    console.log("дэлгэцнээс өгөгдөл авах хэсэг");
    // олж авсан өгөгдлөө санхүүгийн контроллерт дамжуулан тэнд хадгална
    //олж авсан өгөгдлөө тохирох хэсэгт дэлгэцэнд гаргана
    //төсвийг тооцно
    // эцийн үдэгдэл тооцоог дэлгэцэнд гаргана
    }

    document.querySelector('.add__btn').addEventListener("click", function(){
        ctrlAddItem();
    });

    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13 || event.which === 13) {ctrlAddItem()};
    });
    
    
})(uiController, financeController);