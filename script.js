const quizBtn = document.getElementById("quiz-btn");
const mainCard = document.querySelector(".main-card");

// 시작하기 버튼을 눌렀을 때 실행되는 함수
quizBtn.addEventListener("click", function() {
    // 카드 안쪽 내용을 캐릭터 선택 화면으로 변경합니다
    mainCard.innerHTML = `
        <h1>캐릭터를 선택하세요!</h1>
        <div class="char-container">
            <!-- 적혈구 선택 상자 -->
            <div class="char-box" onclick="selectCharacter('적혈구')">
                <svg viewBox="0 0 100 100" class="char-icon">
                    <circle cx="50" cy="50" r="45" fill="#ff4d6d"/>
                    <circle cx="50" cy="50" r="22" fill="#c9184a"/>
                </svg>
                <h3>적혈구</h3>
                <p></p>
            </div>

            <!-- 백혈구 선택 상자 -->
            <div class="char-box" onclick="selectCharacter('백혈구')">
                <svg viewBox="0 0 100 100" class="char-icon">
                    <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#b8c0ff" stroke-width="4"/>
                    <circle cx="38" cy="45" r="12" fill="#7209b7"/>
                    <circle cx="58" cy="55" r="10" fill="#7209b7"/>
                </svg>
                <h3>백혈구</h3>
                <p></p>
            </div>
        </div>
    `;
});

// 캐릭터를 클릭했을 때 실행되는 함수
function selectCharacter(name) {
    alert(name + " 캐릭터를 선택하셨습니다! 퀴즈를 시작합니다.");
}
