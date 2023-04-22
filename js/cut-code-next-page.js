$(document).ready(function(){
    // chức năng phân trang trong page shop
    let thisPage = 1; // Đại diên cho trang đầu tiên
    let limit = 6; // Đại diện cho số sản phẩm tối đa trong 1 trang
    let list = $(".category_body .category_item"); // Lấy ra toàn bộ sản phẩm

    function loadItem(){
        // công thức tính số sản phẩm trên 1 trang
        // bắt đầu bằng số sản phẩm muốn hiên thị nhân số trang tính bằng index
        // kết thúc bằng số sản phẩm muốn hiển thị nhân số trang tính bằng index
        // vì index bắt đầu bằng 0 lên số trang trừ đi 1
        // kết quả của beginPage và endPage bằng index của sản phẩm đầu tiên và sp cuối cùng
        let beginGet = limit * (thisPage -1); // sản phẩm đầu tiên bắt đầu bằng index 0
        let endGet = limit * thisPage - 1; // sản phẩm cuối cùng tính bằng index

        // console.log(beginGet, endGet, list);
        for(let i= 0; i< list.length; i++){
            // các item thỏa mãn sẽ được hiển thị trong trang
            if(i >= beginGet && i <= endGet){
                // list[i].css("display", "block");
                list[i].style.display = "block";
            }
            // các item không thỏa mãn trong trang sẽ được ẩn đi
            else{
                // list[i].css("display", "none");
                list[i].style.display = "none";
            }    
        }
        // reset tất cả phẩn tử item cũ mà listPaga tạo ra
        let oddPage = $(".pagination").html('');
        // load số trang hiện tại
        listPage();
    }
    loadItem();

    function listPage(){
        let count = Math.ceil(list.length / limit); // tổng số trang bằng tổng item chia sô item trong 1 trang
        // Math.ceil() làm trồn số
        let newPage = $(".pagination");
        
        if(thisPage != 1){ // nếu thisPage != 1 thì tạo ra nút prev
            let prev = `<li class="pagination_item">PREV</li>`;
            newPage.append(prev);
        }

        for(let i = 1; i <= count; i++){  
            if(i == thisPage){ // nếu i == thisPage thì thêm class active
                let setHtml = `<li class="pagination_item pagination-active">${i}</li>`;
                newPage.append(setHtml);
            }else{ // nếu i != thisPage thì không thêm class acctive
                let setHtml = `<li class="pagination_item">${i}</li>`;
                newPage.append(setHtml);
            }
        }

        if(thisPage != count){ // nếu thisPage != count tức khác số trang cuối cùng thì tạo ra nút next
            let next = `<li class="pagination_item">NEXT</li>`;
            newPage.append(next);
        }

        // sự kiện click chuyển trang
        let listItem = $(".pagination_item");
        listItem.on("click", function(){
            let i = this.innerHTML; // lấy ra nội dung của list item là số trang
            if(i == "PREV"){ // nếu click vào nút prev thì gán giá trị bằng số trang hiện tại trừ 1
                i = thisPage - 1;
                changePage(i);
            }else if(i == "NEXT"){ // nếu click vào nút next thì gán giá trị bằng số trang hiện tại cộng 1
                i = thisPage + 1;
                changePage(i);
            }else{ // nếu là số trang bình thường thì gán trực tiếp vào function changePage
                changePage(i);
            }
        })
        
    }
    // reset trang mới
    function changePage(i){
        thisPage = i;
        loadItem();
    }
})