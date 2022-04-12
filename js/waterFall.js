/*define a global object positionMessage, below are its properties
length: number of columns
hei: array, used to store current height of each column
wid: width of each column
addHeight: When the height of scroll bar and page is larger than this value, new pictures are needed to add*/


window.addEventListener('load', function() {
    var positionMessage = {};
    var num = 0;
    var maxNum = 97;
    waterfall('img_page', 'box', 230);

    //Change another way of writing
    //Given 97 pictures are stored, and 20 of them have already been added

    var main = document.getElementById("img_page");
    window.addEventListener('scroll', function() {
        if (checkHeight()) {
            putNum(main, 1);
        }
    }, false);
    //load 10 pictures
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
                var box = document.createElement("div");
                box.className = "box viewin";
                pd.appendChild(box);
                var pic = document.createElement("div");
                pic.className = "pic";
                box.appendChild(pic);

                var heart_btn=document.createElement("div");
                heart_btn.className="heart_btn heart_btn_show";
                //data-selected needs backend to give values. Here test use is set to false, which represents users do not have preference
                //If prefer, then it will become red button
                heart_btn.dataset.selected="false";
                var heart=document.createElement("i");
                heart.className="heart";
                heart_btn.appendChild(heart);
                pic.appendChild(heart_btn);

                var a = document.createElement("a");
                //a.href="";
                pic.appendChild(a);

                var img = document.createElement("img");
                img.src = "images/" + num + ".jpg";
                a.appendChild(img);

                var img_shadow = document.createElement("div");
                img_shadow.className="img_shadow cover";
                a.appendChild(img_shadow);

                var img_infor_p = document.createElement("p");
                img_infor_p.className = "img_infor";
                img_infor_p.innerHTML = "This is introduction of the picture."
                pic.appendChild(img_infor_p);

                var author_infor_div = document.createElement("div");
                author_infor_div.className = "author_infor";
                pic.appendChild(author_infor_div);

                var author_head_a = document.createElement("a");
                author_head_a.className = "author_head";
                author_infor_div.appendChild(author_head_a);

                var author_name_p = document.createElement("p");
                author_name_p.className = "author_name";
                author_name_p.innerHTML = "Name of author";
                author_infor_div.appendChild(author_name_p)

                var img2 = document.createElement("img");
                img2.src = "img_test/author_test.jpg";
                author_head_a.appendChild(img2);

                /*used for testing*/
                num++;
                if (num == maxNum + 1) { num = 0; }


                img.onload = function() {
                    putInMain(box, main);
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
        //console.log(minHei);
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
