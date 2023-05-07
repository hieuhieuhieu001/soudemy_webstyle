document.addEventListener("DOMContentLoaded", () => {
  // opent register table
  $(".btn-user").on("click", function () {
    $(".register-form").show();
  });

  $(".btn-bag").on("click", function () {
    $(".register-form").show();
  });

  $(".btn-add-cart").on("click", function () {
    $(".register-form").show();
  });

  $(".btn-exit").on("click", function () {
    $(".register-form").hide();
  });

  // register.html
  // change singup form
  $(".form .btn-signup").on("click", () => {
    $(".form .select-register").css("transform", "translatex(-50%)");
  });
  // change singin form
  $(".form .btn-signin").on("click", () => {
    $(".form .select-register").css("transform", "translatex(0)");
  });
  //opent and exit navbar mobie
  $(".btn-menu .btn-menu-open").on("click", function () {
    $(".btn-menu .menu").css("transform", "unset");
  });
  $(".btn-menu .btn-menu-exit").on("click", function () {
    $(".btn-menu .menu").css("transform", "translatex(-100%)");
  });
  //======================= slider banner =====================================
  let sliderList = $(".slider .list-item");
  let item = $(".slider .list-item .slider-item");
  let next = $(".gr__btn-slider .next__left");
  let prev = $(".gr__btn-slider .next__right");
  let length = item.length - 1; // lấy re tổng phần tử
  let count = 0;

  // dịch slider list sang 1 khoảng bằng chiều rộng 1 item
  function reloadSlider() {
    let checkLeft = item[count].offsetLeft;
    // offsetLeft đo vị trí của cạnh bên trái với lề
    sliderList.css("left", -checkLeft + "px");
    // clearInterval(refeshSlider);
    // refeshSlider = setInterval(function () {
    //   next.click();
    // }, 5000);
  }

  // next left
  prev.on("click", function () {
    count++;
    if (count > length) {
      count = 0;
    }
    reloadSlider();
  });

  // next right
  next.on("click", function () {
    count--;
    if (count < 0) {
      count = length;
    }
    reloadSlider();
  });

  // tự động chạy slider sau 5 giây
  // let refeshSlider = setInterval(function () {
  //   next.click();
  // }, 5000);

  //=======================================================================
  // chức năng phân trang trong page shop
  let thisPage = 1; // Đại diên cho trang đầu tiên
  let limit = 9; // Đại diện cho số sản phẩm tối đa trong 1 trang
  let list = $(".category_body .category_item"); // Lấy ra toàn bộ sản phẩm

  function loadItem() {
    // công thức tính số sản phẩm trên 1 trang
    // bắt đầu bằng số sản phẩm muốn hiên thị nhân số trang tính bằng index
    // kết thúc bằng số sản phẩm muốn hiển thị nhân số trang tính bằng index
    // vì index bắt đầu bằng 0 lên số trang trừ đi 1
    // kết quả của beginPage và endPage bằng index của sản phẩm đầu tiên và sp cuối cùng
    let beginGet = limit * (thisPage - 1); // sản phẩm đầu tiên bắt đầu bằng index 0
    let endGet = limit * thisPage - 1; // sản phẩm cuối cùng tính bằng index

    // console.log(beginGet, endGet, list);
    for (let i = 0; i < list.length; i++) {
      // các item thỏa mãn sẽ được hiển thị trong trang
      if (i >= beginGet && i <= endGet) {
        // list[i].css("display", "block");
        list[i].style.display = "block";
      }
      // các item không thỏa mãn trong trang sẽ được ẩn đi
      else {
        // list[i].css("display", "none");
        list[i].style.display = "none";
      }
    }
    // reset tất cả phẩn tử item cũ mà listPaga tạo ra
    let oddPage = $(".pagination").html("");
    // load số trang hiện tại
    listPage();
  }
  loadItem();

  function listPage() {
    let count = Math.ceil(list.length / limit); // tổng số trang bằng tổng item chia sô item trong 1 trang
    // Math.ceil() làm trồn số
    let newPage = $(".pagination");

    if (thisPage != 1) {
      // nếu thisPage != 1 thì tạo ra nút prev
      let prev = `<li class="pagination_item">
                            <a href="#">PREV</a>
                        </li>`;
      newPage.append(prev);
    }

    for (let i = 1; i <= count; i++) {
      if (i == thisPage) {
        // nếu i == thisPage thì thêm class active
        let setHtml = `<li class="pagination_item pagination-active">
                                    <a href="#">${i}</a>
                                </li>`;
        newPage.append(setHtml);
      } else {
        // nếu i != thisPage thì không thêm class acctive
        let setHtml = `<li class="pagination_item">
                                    <a href="#">${i}</a>
                               </li>`;
        newPage.append(setHtml);
      }
    }

    if (thisPage != count) {
      // nếu thisPage != count tức khác số trang cuối cùng thì tạo ra nút next
      let next = `<li class="pagination_item">
                            <a href="#">NEXT</a>
                        </li>`;
      newPage.append(next);
    }

    // sự kiện click chuyển trang
    let listItem = $(".pagination_item a");
    listItem.on("click", function () {
      let i = this.innerHTML; // lấy ra nội dung của list item là số trang
      if (i == "PREV") {
        // nếu click vào nút prev thì gán giá trị bằng số trang hiện tại trừ 1
        i = thisPage - 1;
        changePage(i);
      } else if (i == "NEXT") {
        // nếu click vào nút next thì gán giá trị bằng số trang hiện tại cộng 1
        i = +thisPage + 1;
        changePage(i);
      } else {
        // nếu là số trang bình thường thì gán trực tiếp vào function changePage
        changePage(i);
      }
    });
  }
  // reset trang mới
  function changePage(i) {
    thisPage = i;
    loadItem();
  }

  //================================= search function======================================
  function fillItem(val) {
    list.each(function () {
      // hàm each() thực hiện khối lệnh sau mỗi lần chạy
      let content = $(this).text();
      if (content.includes(val)) {
        // hàm includes() dùng để tìm kiếm phần tử thỏa mãn
        $(this).show(); // nếu thỏa mãn trả về true => Hiện phẩn tử lên màn hình
      } else {
        $(this).hide(); // ngược lại trả về false => Ẩn phần tử
      }
      if (val == "") {
        // nếu biến val nhận ký tự rỗng thì load lại trang
        loadItem();
      }
    });
  }

  // function search
  function searchItem() {
    // on("keyup") => nhận giá trị từ bàn phím
    $(".category_bar_search input").on("keyup", function () {
      let val = $(this).val(); // gán giá trị nhập từ bần phím vào biến
      fillItem(val);
    });
  }
  searchItem();

  // filPrice function
  function filPrice() {
    let btnFill = $(".category_bar_btn_filter");
    let fill = $(".category_bar_criteria-price");
    btnFill.on("click", function () {
      let val = fill.val();
      fillItem(val);
    });
  }
  filPrice();

  //================================Add to cart====================================
  function countItemAdd() {
    let count = 1; // khởi tạo biến count = 1
    let btnAdd = $(".add_amount .add_item"); // gọi nút thêm item
    let btnMinus = $(".add_amount .minus_item"); // gọi nút giảm item
    let oddContent = $(".add_amount .amount_item"); // lấy thẻ chứa nội dung số lượng item
    btnAdd.on("click", function () {
      // tạo sự kiện click nút thêm
      count++; // count tăng 1 đơn vị
      let newContent = `<span>${count}</span>`; // gán lại biên count vào cấu trúc html mới
      oddContent.html(newContent); // gán lại vào cấu trức html cũ
    });
    btnMinus.on("click", function () {
      // tạo sự kiện click nút giảm
      count--;
      if (count < 1) {
        // nếu count < 1 thì gán lại count = 1 để giá trị không bị trừ âm
        count = 1;
      }
      let newContent = `<span>${count}</span>`;
      oddContent.html(newContent);
    });
  }
  countItemAdd();

  $(".add_to_wishlist .btn_add_wishlist").on("click", function () {
    $(this).toggleClass("btn_add_wishlist-active");
  });

  // function addCart() {};
});
