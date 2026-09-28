// ==========================================
// 1. DANH SÁCH LỜI CHÚC (Bạn có thể sửa chữ ở đây)
// ==========================================
const wishes = [
    "Hôm nay là một ngày vô cùng đặc biệt...",
    "Một ngày có lẽ sẽ thật vui đối với bé.",
    "Mong tuổi mới của bé sẽ có thật nhiều niềm vui.",
    "Mong những điều dịu dàng nhất sẽ luôn tìm đến bé.",
    "Chúc bé luôn giữ được nụ cười thật xinh và một trái tim thật ấm áp.",
    "Hy vọng mỗi ngày sắp tới đều có một điều gì đó khiến bé mỉm cười.",
    "Tuổi mới rồi, nhớ yêu thương bản thân nhiều hơn một chút nha.",
    "Happy Birthday to You! 🎉" // Câu cuối sẽ có kích thước to & màu sắc đặc biệt
];

// Thời gian chờ giữa các câu
const DELAY_BETWEEN_LINES = 4000;

// ==========================================
// 2. LẤY CÁC PHẦN TỬ HTML
// ==========================================
const wishContainer = document.getElementById('wish-text');
const actionBtn = document.getElementById('action-btn');

// Lấy phần tử nhạc
const music = document.getElementById('birthday-music');
music.volume = 0.3; // Âm lượng 30%

// Hàm hỗ trợ tạo độ trễ
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// 3. HÀM XỬ LÝ LẦN LƯỢT XUẤT HIỆN CÁC CÂU CHÚC
// ==========================================
async function startBirthdaySequence() {

    // Bắt đầu phát nhạc khi người dùng bấm nút
    music.play();

    // Ẩn nút bấm
    actionBtn.classList.add('fade-out');

    // Đợi nút mờ đi
    await sleep(500);
    actionBtn.style.display = 'none';

    // Hiện từng câu chúc
    for (let i = 0; i < wishes.length; i++) {

        // Xóa câu cũ
        wishContainer.innerHTML = '';

        // Tạo câu chúc mới
        const line = document.createElement('p');
        line.classList.add('wish-line');
        line.textContent = wishes[i];

        // Nếu là câu cuối
        if (i === wishes.length - 1) {
            line.classList.add('highlight');
        }

        // Đưa câu vào màn hình
        wishContainer.appendChild(line);

        // Đợi trình duyệt nhận diện phần tử
        await sleep(50);

        // Hiện câu
        line.classList.add('show');

        // Giữ câu trên màn hình
        await sleep(DELAY_BETWEEN_LINES);

        // Nếu đây là câu Happy Birthday
        if (i === wishes.length - 1) {

            // Cho chữ biến mất
            line.classList.remove('show');

            // Đợi hiệu ứng biến mất hoàn thành
            await sleep(1200);

            // Xóa chữ
            wishContainer.innerHTML = '';

            // Bắt đầu hiệu ứng bóng bay
            createBalloons();
        }
    }
}

function createBalloons() {

    // Màu bóng bay
    const balloonColors = [
        '#e74c3c',
        '#3498db',
        '#f1c40f',
        '#9b59b6',
        '#2ecc71',
        '#ff69b4'
    ];

    // Số lượng bóng bay
    const balloonCount = 100;
    let finishedBalloons = 0;

    for (let i = 0; i < balloonCount; i++) {

        // Tạo một quả bóng
        const balloon = document.createElement('div');

        balloon.classList.add('balloon');

        // Vị trí ngang ngẫu nhiên
        balloon.style.left = Math.random() * 100 + '%';

        // Màu ngẫu nhiên
        balloon.style.background =
            balloonColors[
                Math.floor(Math.random() * balloonColors.length)
            ];

        // Thời gian bay ngẫu nhiên
        balloon.style.animationDuration =
            (2.5 + Math.random() * 1.4) + 's';

        // Độ trễ ngẫu nhiên
        balloon.style.animationDelay =
            (Math.random() * 2) + 's';

        // Kích thước ngẫu nhiên
        const size = 40 + Math.random() * 25;

        balloon.style.width = size + 'px';
        balloon.style.height = size * 1.25 + 'px';

        // Tạo bóng bay
        document.body.appendChild(balloon);

        // Sau khi bay khỏi màn hình xong
        balloon.addEventListener('animationend', () => {

            balloon.remove();

            finishedBalloons++;

            // Khi tất cả bóng bay đã bay xong
            if (finishedBalloons === balloonCount) {

                // Hiện phần cuối
                showBirthdayEnding();

            }
        });
    }
}

// ==========================================
// 4. BẮT SỰ KIỆN CLICK VÀO NÚT
// ==========================================
actionBtn.addEventListener('click', startBirthdaySequence);

// ==========================================
// 5. PHẦN CUỐI: GIF + BÁNH + HAPPY BIRTHDAY
// ==========================================
function showBirthdayEnding() {

    // Tạo khung cuối
    const ending = document.createElement('div');

    ending.classList.add('birthday-ending');

    // GIF
    const gif = document.createElement('img');

    gif.src = 'images/Cat Love GIF by NGcorpvtc.gif';

    gif.classList.add('birthday-gif');

    // Bánh kem
    const cake = document.createElement('img');

    cake.src = 'images/banh.jpg';

    cake.classList.add('birthday-cake');

    // Chữ TEXT
    const title = document.createElement('div');

    title.textContent = 'Luôn happy nha bé Bella iu dấu <3';

    title.classList.add('birthday-title');

    // Đưa tất cả vào khung
    ending.appendChild(gif);
    ending.appendChild(cake);
    ending.appendChild(title);

    document.body.appendChild(ending);

    // Cho hiệu ứng xuất hiện
    setTimeout(() => {
        ending.classList.add('show');
    }, 50);
}