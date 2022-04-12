/*define a global object positionMessage, below are its properties
length: number of columns
hei: array, used to store current height of each column
wid: width of each column
addHeight: When the height of scroll bar and page is larger than this value, new pictures are needed to add*/


window.addEventListener('load', function() {
    var positionMessage = {};
        


    waterfall('img_page', 'img_box', 240);

    var main = document.getElementById("img_page");
    window.addEventListener('scroll', function() {
        if (checkHeight()) {
            putNum(main, 1);
        }
    }, false);


    //load pictures
    function putNum(main, onceNum) {
        //We can add a group of pictures in one time, or add one picture sequentially. You can choose any of them.
        var pd = document.createDocumentFragment();
        for (var i = 0; i < onceNum; i++) {
            (function() {
                /*$.ajax({
                    url:"",
                    type:"GET",
                    datatype:"JSON",
                    success:function(data){   },
                    error:function(e,data){console.log(data)}
                })*/
                var img_box=document.createElement("div");
                img_box.className="img_box";
                var img_area=document.createElement("div");
                img_area.className="img_area";
                var img_a=document.createElement("a");
                var img_img=document.createElement("img");
                img_img.src="images/"+i+".jpg";
                var img_shadow=document.createElement("div");
                img_shadow.className="shadow";
                var img_infor=document.createElement("p");
                img_infor.innerHTML="description";
                img_box.appendChild(img_area);
                img_area.appendChild(img_a);
                img_area.appendChild(img_infor);
                img_a.appendChild(img_img);
                img_a.appendChild(img_shadow);

                pd.appendChild(img_box)

                /*used for testing*/
                
                img_img.onload = function() {
                    putInMain(img_box, main);
                }
            })();
        }
        main.appendChild(pd)
    }

    function waterfall(parent, classname, wid) {
        var main = document.getElementById(parent);
        var mWidth = main.offsetWidth;
        //num represents the number of columns
        var num = Math.floor(mWidth / wid);
        //console.log(num);

        //Set the number of columns, and store it into the global object. Then, initialize it.
        positionMessage.length = num;
        positionMessage.hei = new Array(positionMessage.length);
        
        positionMessage.wid = wid;
        positionMessage.top = main.offsetTop;

        if (window.getComputedStyle) {
            for (var node = main; node.parentNode != document.body; node = node.parentNode) {
                //console.log(node.parentNode.nodeName);
                if (getComputedStyle(node.parentNode).position != "static") {
                    positionMessage.top += node.parentNode.offsetTop;
                }
            }
        } else {
            for (var node = main; node.parentNode != document.body; node = node.parentNode) {
                if (node.parentNode.currentStyle.position === "static") {
                    positionMessage.top += node.parentNode.offsetTop;
                }
            }
        }

        for (var i = 0; i < positionMessage.length; i++) {
            positionMessage.hei[i] = 0;
        }
        //leave space for upload component
        positionMessage.hei[0]=146;
        //console.log(positionMessage);//testing

        //revise the style of main box to make it place in the center
        main.style.width = wid * num + 'px';
        main.style.margin = "0 auto";
        //main.style.cssText="width:"+wid*num+"px;margin:0 auto;";

        putNum(main, 20);
    }
    //Put the generated box into the appropriate position(obtained via positionMessage), and update positionMessage.
    function putInMain(element, parent) {
        var minHei = Math.min.apply(null, positionMessage.hei);
        var index = findIndex(minHei);

        element.style.position = "absolute";
        element.style.left = index * positionMessage.wid + 'px';
        element.style.top = minHei + 'px';


        //revise positionMessage
        positionMessage.addHeight = minHei;
        //console.log(i+'The height of the added position:'+positionMessage.addHeight);
        positionMessage.hei[index] += element.offsetHeight;

        parent.style.height = (Math.max.apply(null, positionMessage.hei) + 250) + 'px'
            //console.log("The height of added element:"+element.offsetHeight);
            //console.log(i+'The height of the current column after adding:'+positionMessage.hei[index]	);
            //console.log(positionMessage.hei);
    }
    //Find the index value of the column which has the smallest height
    function findIndex(min) {
        for (var i = 0; i < positionMessage.length; i++) {
            if (positionMessage.hei[i] == min) return i;
        }
    }
    //Determine whether to add pictures
    function checkHeight() {
        //The height of scroll bar
        var scrollHei = document.body.scrollTop || document.documentElement.scrollTop;
        var clientHei = document.documentElement.clientHeight || document.body.clientHeight;
        return (positionMessage.addHeight + positionMessage.top + 250 < scrollHei + clientHei) ? true : false;
    }
}, false);
