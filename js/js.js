$(document).ready(function(){
    // opent register table
    $(".btn-user").on("click", function(){
        $(".register-form").show();
    })

    $(".btn-exit").on("click", function(){
        $(".register-form").hide();
    })

    // slider banner
    let sliderList = $(".slider .list-item");
    let item = $(".slider .list-item .slider-item");
    let next = $(".gr__btn-slider .next__left");
    let prev = $(".gr__btn-slider .next__right");
    let length = item.length - 1; // lấy re tổng phần tử
    let count = 0;
    
    // dịch slider list sang 1 khoảng bằng chiều rộng 1 item
    function reloadSlider (){
        let checkLeft = item[count].offsetLeft;
        // offsetLeft đo vị trí của cạnh bên trái với lề
        sliderList.css("left",  -checkLeft + "px");
        clearTimeout(refeshSlider);
    } 

    // next left
    prev.on("click", function(){
        count++
        if(count > length){
            count = 0;
        }
        reloadSlider();
    })

    // next right
    next.on("click", function(){
        count--;
        if(count < 0){
            count = length;
        }
        reloadSlider();
    })

    // tự động chạy slider sau 5 giây
    let refeshSlider = setTimeout(function(){next.click()}, 3000);
})